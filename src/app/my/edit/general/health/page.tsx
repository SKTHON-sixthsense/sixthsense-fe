"use client";

import BottomButton from "@/shared/components/BottomButton";
import useHeader from "@/shared/hooks/useHeader";
import { useState } from "react";

export default function SelectHealth() {
  useHeader({
    title: "건강 상태 선택",
    alignTitle: "center",
    showBackButton: true,
  });

  const healths = ["다리", "무릎", "허리", "어깨", "손목", "눈", "귀", "호흡기"];

  const [selectedHealth, setSelectedHealth] = useState<string[]>([]);

  return (
    <main>
      <div className="flex flex-col px-[18px] pt-[30px] pb-[25px]">
        {/* 단계별 설명 */}
        <h2 className="mt-[10px] text-[28px] font-[600]">
          일하는데 우려되는
          <br />
          건강 상태 부위를 선택해주세요
        </h2>

        <p className="mt-[8px] text-[20px] font-[500] text-primary">* 중복 가능</p>
      </div>

      {/* 단계별 컴포넌트 */}
      <div className="flex flex-wrap gap-[10px] px-[16px]">
        {healths.map((health) => (
          <button
            key={health}
            className={`rounded-[10px] px-[24px] py-[12px] text-[24px] font-[500] transition-colors duration-200 ${selectedHealth.includes(health) ? "bg-primary text-white" : "bg-white outline-2 outline-[#e4e4e4]"}`}
            onClick={() => {
              if (selectedHealth.includes(health)) {
                setSelectedHealth(selectedHealth.filter((h) => h !== health));
              } else {
                setSelectedHealth([...selectedHealth, health]);
              }
            }}
          >
            {health}
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
