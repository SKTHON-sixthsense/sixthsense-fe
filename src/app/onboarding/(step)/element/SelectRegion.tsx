"use client";

import { useState } from "react";
import CheckPurple from "@/assets/icon/CheckPurple.svg";
import { useHeaderHeight } from "@/shared/hooks/useHeader";
import { useQuery } from "@tanstack/react-query";
import getRegions from "../../(api)/getRegions";
import { BaseResponse } from "@/shared/api/BaseResponse";
import useOnboardingStore from "../../(store)/OnboardingStore";

export default function SelectRegion() {
  const { data: regions } = useQuery<BaseResponse<string[]>>({
    queryKey: ["onboarding", "regions"],
    queryFn: getRegions,
  });

  const { data, setData } = useOnboardingStore();

  const headerHeight = useHeaderHeight();

  return (
    <div className="flex flex-col">
      <hr className="h-[1px] w-full bg-[#919191]"></hr>
      <div className="flex flex-1">
        {/* 시/도 */}
        <div className="flex-1">
          <div
            className="sticky top-0 z-10 flex flex-1 items-center justify-center self-start bg-white py-[15px] text-[20px] font-[500] text-[#686868]"
            style={{ top: `${headerHeight}px` }}
          >
            시/도
          </div>
          <button
            className="sticky top-0 z-20 w-full bg-primary py-[20px] text-[24px] font-[500] text-white"
            style={{ top: `${headerHeight}px` }}
          >
            서울
          </button>
        </div>

        <div className="w-[1.5px] bg-[#DFDFDF]" />

        {/* 시/군/구 */}
        <div className="flex-1">
          <div
            className="sticky top-0 z-10 flex flex-1 items-center justify-center self-start bg-white py-[15px] text-[20px] font-[500] text-[#686868]"
            style={{ top: `${headerHeight}px` }}
          >
            시/군/구
          </div>
          {regions?.data?.map((region) => {
            const isSelected = data.region === region;

            return (
              <button
                key={region}
                className={`flex w-full items-center justify-center py-[20px] text-[24px] font-[500] ${
                  isSelected ? "text-primary" : "text-[#686868]"
                }`}
                onClick={() => setData({ region })}
              >
                <span className="relative flex items-center">
                  {region}
                  {isSelected && (
                    <CheckPurple width={24} height={24} className="absolute -right-[34px]" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
