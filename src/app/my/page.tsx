"use client";

import General from "@/app/my/(tab)/General";
import Introduction from "@/app/my/(tab)/Introduction";
import useHeader from "@/shared/hooks/useHeader";
import { useState } from "react";

export default function My() {
  useHeader({
    title: "나의 정보",
    alignTitle: "center",
  });

  const [tab, setTab] = useState<"general" | "introduction">("general");

  return (
    <main>
      <div className="flex flex-col gap-[15px] bg-[#F4F4FB]">
        {/* 탭 */}
        <div className="relative flex items-center bg-white">
          <div
            className="flex flex-1 items-center justify-center px-[40px] py-[20px]"
            onClick={() => setTab("general")}
          >
            <span className="text-[24px] font-[600] text-primary">기본 정보</span>
          </div>
          <div
            className="flex flex-1 items-center justify-center px-[40px] py-[20px]"
            onClick={() => setTab("introduction")}
          >
            <span className="text-[24px] font-[500]">자기소개서</span>
          </div>
          {/* 라인 */}
          <div
            className="absolute bottom-0 h-[4px] w-[50%] bg-primary transition-all duration-300"
            style={{ left: `${tab === "general" ? "0%" : "50%"}` }}
          ></div>
        </div>

        {/* 내용 */}
        {tab === "general" && <General />}
        {tab === "introduction" && <Introduction />}
      </div>
    </main>
  );
}
