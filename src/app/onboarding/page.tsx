"use client";

import useHeader from "@/shared/hooks/useHeader";
import useOnboardingStore from "./(store)/OnboardingStore";
import Steps from "./(step)";
import BottomButton from "@/shared/components/BottomButton";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const router = useRouter();

  const { step, goNext, goPrevious } = useOnboardingStore();

  const stepsCount = Object.keys(Steps).length;
  const currentStep = Steps?.[step];

  useHeader({
    title: currentStep?.title,
    alignTitle: "center",
    showBackButton: true,
    onBackButtonClick: () => {
      if (step === 1) {
        router.back();
      } else {
        goPrevious();
      }
    },
    progress: step * (100 / stepsCount),
  });

  return (
    <main>
      <div className="flex flex-col px-[18px] pt-[30px] pb-[25px]">
        {/* 1/(총 단계 수) */}
        <span className="text-[18px] font-[500] text-[#919191]">
          {step}/{stepsCount}
        </span>
        {/* 단계별 설명 */}
        <h2 className="mt-[10px] text-[28px] font-[600]">{currentStep?.description}</h2>
        {currentStep?.additionalDescription && (
          <p className="mt-[8px] text-[20px] font-[500] text-[#919191]">
            {currentStep?.additionalDescription}
          </p>
        )}
      </div>

      {/* 단계별 컴포넌트 */}
      {currentStep?.element}

      {/* 하단 버튼 고정 */}
      <BottomButton
        stickToBottom
        onClick={async () => {
          if (step === stepsCount) {
            // 끝
            console.log("시작하기");
          } else {
            goNext();
          }
        }}
      >
        {step === stepsCount ? "시작하기" : "다음으로"}
      </BottomButton>
    </main>
  );
}
