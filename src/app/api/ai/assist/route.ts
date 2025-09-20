import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import OpenAI from "openai";

// Available routes and their descriptions for the AI assistant
const AVAILABLE_ROUTES = {
  "/": "홈페이지 - 메인 페이지, 구인 정보를 검색하고 볼 수 있습니다",
  "/home": "홈 - 기본 홈 페이지",
  "/my": "나의 정보 - 사용자의 기본 정보와 자기소개서를 관리할 수 있습니다",
  "/my/edit/general": "기본 정보 수정 - 개인 정보를 수정할 수 있습니다",
  "/my/edit/general/health": "건강 상태 선택 - 건강 상태를 설정할 수 있습니다",
  "/my/edit/general/personality": "성격 선택 - 성격 유형을 선택할 수 있습니다",
  "/onboarding": "온보딩 - 새 사용자를 위한 초기 설정 과정입니다",
};

// Schema for structured output with routing queue support
const NavigationResponseSchema = z.object({
  transcription: z.string().describe("전사된 텍스트"),
  intent: z.string().describe("사용자의 의도 분석"),
  routingQueue: z
    .array(
      z.object({
        route: z
          .string()
          .describe("이동할 경로 (정확한 경로만, 예: /my) 또는 특수 명령 (BACK, FORWARD)"),
        delay: z.number().describe("이전 페이지에서 머무를 시간 (밀리초, 기본값 1500)"),
      })
    )
    .describe("순서대로 이동할 경로들의 배열"),
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get("audio") as File;

    console.log("🎤 AI Assist Request:", {
      audioFileSize: audioFile?.size,
      audioFileType: audioFile?.type,
      timestamp: new Date().toISOString(),
    });

    if (!audioFile) {
      console.log("❌ No audio file provided");
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    // Initialize OpenAI client for STT
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // First, transcribe the audio using OpenAI Whisper
    console.log("🔊 Starting transcription with OpenAI Whisper...");
    const transcriptionResult = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "gpt-4o-mini-transcribe",
      language: "ko", // Korean language
      response_format: "text",
    });

    const transcribedText = transcriptionResult.trim();

    console.log("📝 Transcription:", transcribedText);

    if (!transcribedText) {
      console.log("❌ Could not transcribe audio");
      return NextResponse.json({ error: "Could not transcribe audio" }, { status: 400 });
    }

    // Now analyze the transcribed text to determine navigation intent
    const routesList = Object.entries(AVAILABLE_ROUTES)
      .map(([route, description]) => `- ${route}: ${description}`)
      .join("\n");

    const navigationResult = await generateObject({
      model: google("gemini-2.5-flash"),
      schema: NavigationResponseSchema,
      prompt: `
다음은 사용자가 말한 내용입니다: "${transcribedText}"

이 웹사이트는 5060 세대를 위한 커리어 플랫폼 "다시잡"입니다.
사용자의 요청을 분석하여 적절한 페이지로 안내해주세요.

사용 가능한 페이지들:
${routesList}

## 페이지 매핑 규칙:
- "나의 정보", "내 정보", "마이페이지", "프로필" -> /my
- "홈", "메인", "처음", "홈페이지" -> /
- "온보딩", "시작", "설정" -> /onboarding  
- "구인", "일자리", "채용" -> /
- "기본 정보 수정", "개인정보 수정" -> /my/edit/general
- "건강 상태", "건강 설정" -> /my/edit/general/health
- "성격 선택", "성격 설정" -> /my/edit/general/personality

## 특수 네비게이션 명령:
- "뒤로", "뒤로 가기", "이전", "이전 페이지" -> BACK
- "앞으로", "앞으로 가기", "다음", "다시 앞으로" -> FORWARD

## 다중 경로 처리:
사용자가 여러 페이지를 순서대로 방문하고 싶어하는 경우 (예: "홈으로 갔다가 마이페이지로 가줘", "먼저 온보딩 보고 나서 내 정보 수정해줘"), routingQueue 배열에 순서대로 추가하세요.

각 경로 객체는:
- route: 정확한 경로 (예: "/", "/my") 또는 특수 명령 ("BACK", "FORWARD"),
- delay: 이전 페이지에서 머무를 시간 (밀리초)
  - 첫 번째 경로: 0 (즉시 이동)
  - 이후 경로들: 1500-3000ms (페이지 확인 시간)

## 응답 형식:
transcription: "${transcribedText}" (그대로 입력)
intent: 사용자 의도 분석
routingQueue: [{ route: "경로", delay: 시간 }, ...]

## 예시:
"홈으로 갔다가 마이페이지로 가줘" → 
routingQueue: [
  { route: "/", delay: 0 },
  { route: "/my", delay: 2000 }
]

"뒤로 가기" →
routingQueue: [
  { route: "BACK", delay: 0 }
]

"뒤로 갔다가 다시 앞으로 가줘" →
routingQueue: [
  { route: "BACK", delay: 0 },
  { route: "FORWARD", delay: 1500 }
]
      `,
    });

    console.log("🎯 Navigation Result:", {
      transcription: navigationResult.object.transcription,
      intent: navigationResult.object.intent,
      routingQueue: navigationResult.object.routingQueue,
    });

    return NextResponse.json(navigationResult.object);
  } catch (error) {
    console.error("❌ AI assist error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
