import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import OpenAI from "openai";

// Available routes and their descriptions for the AI assistant
const AVAILABLE_ROUTES = {
  // 메인페이지
  "/": "홈페이지 첫화면, 메인 페이지 - 채용 공고와 구인 정보를 검색하고 볼 수 있습니다. 사용자 맞춤형 공고가 올라오고, 필터를 통해 원하는 지역, 원하는 직종을 선택하여 공고를 확인할 수 있습니다.",
  // 마이페이지
  "/my": "나의 정보, 내 계정, 설정 - 사용자의 기본 정보와 자기소개서를 관리할 수 있습니다.",
  "/my?tab=general":
    "나의 정보 -> 기본 정보, 내 인적사항 - 사용자의 기본 정보를 관리할 수 있습니다. 이름, 나이, 성별, 연락처, 성격, 아픈 건강 부위, 경력 사항을 볼 수 있습니다.",
  "/my?tab=introduction":
    "나의 정보 -> 자기소개서 - 사용자의 자기소개서를 관리할 수 있습니다. 직접 수정하거나 사진을 찍어 자기소개서를 작성할 수 있습니다.",
  "/my/edit/general": "기본 정보 수정 - 사용자의 기본 정보를 수정할 수 있습니다.",
  "/my/edit/general/health":
    "기본 정보 수정 -> 건강 상태 선택 - 사용자의 건강 상태를 설정할 수 있습니다.",
  "/my/edit/general/personality":
    "기본 정보 수정 -> 성격 선택 - 사용자의 성격 유형을 선택할 수 있습니다.",
  // 온보딩
  "/onboarding":
    "온보딩, 로그인 후 첫화면 - 새 사용자를 위한 초기 설정 과정입니다. 지역, 직종, 직무를 선택하여 시작할 수 있습니다.",
  // 교육
  "/education": "교육 - 사용자의 구직 활동을 위한 관련 교육 정보 및 자격증 등을 볼 수 있습니다. ",
  // 관심
  "/interest":
    "관심 - 사용자가 관심 공고로 직접 선택한 공고들과 관심 교육을 모두 확인할 수 있습니다.",
  // 특수 명령
  BACK: "뒤로 가기",
  FORWARD: "앞으로 가기",
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
      temperature: 0,
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
  - 이후 경로들: 3000-7000ms (페이지 확인 시간)

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
