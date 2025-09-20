"use client";

import BottomButton from "@/shared/components/BottomButton";
import useHeader from "@/shared/hooks/useHeader";
import { useState } from "react";

export default function SelectPersonality() {
  useHeader({
    title: "성격 선택",
    alignTitle: "center",
    showBackButton: true,
  });

  const personalities = ["성실해요", "손이 빨라요"];

  const [selectedPersonality, setSelectedPersonality] = useState<string[]>([]);

  return (
    <main>
      <div className="flex flex-col px-[18px] pt-[30px] pb-[25px]">
        {/* 단계별 설명 */}
        <h2 className="mt-[10px] text-[28px] font-[600]">자신의 장점을 선택해주세요</h2>

        <p className="mt-[8px] text-[20px] font-[500] text-primary">* 중복 가능</p>
      </div>

      {/* 단계별 컴포넌트 */}
      <div className="flex flex-wrap gap-[10px] px-[16px]">
        {personalities.map((personality) => (
          <button
            key={personality}
            className={`rounded-[10px] px-[24px] py-[12px] text-[24px] font-[500] transition-colors duration-200 ${selectedPersonality.includes(personality) ? "bg-primary text-white" : "bg-white outline-2 outline-[#e4e4e4]"}`}
            onClick={() => {
              if (selectedPersonality.includes(personality)) {
                setSelectedPersonality(selectedPersonality.filter((p) => p !== personality));
              } else {
                setSelectedPersonality([...selectedPersonality, personality]);
              }
            }}
          >
            {personality}
          </button>
        ))}
      </div>

      {/* 하단 버튼 고정 */}
      <BottomButton stickToBottom onClick={async () => {}}>
        설정 완료
      </BottomButton>
    </main>
  );
}
