"use client";

import useHeader, { useHeaderHeight } from "@/shared/hooks/useHeader";
import { useQuery } from "@tanstack/react-query";
import { BaseResponse } from "@/shared/api/BaseResponse";
import getRegions from "@/app/onboarding/(api)/getRegions";
import useOnboardingStore from "@/app/onboarding/(store)/OnboardingStore";
import CheckPurple from "@/assets/icon/CheckPurple.svg";
import Search from "@/assets/icon/Search.svg";
import { useMemo, useState } from "react";
import BottomButton from "@/shared/components/BottomButton";
import { useRouter } from "next/navigation";

export default function Location() {
  const router = useRouter();

  useHeader({
    title: "지역 선택",
    alignTitle: "center",
    showBackButton: true,
  });

  const headerHeight = useHeaderHeight();

  const { data: regions } = useQuery<BaseResponse<string[]>>({
    queryKey: ["filter", "regions"],
    queryFn: getRegions,
  });

  const { data, setData } = useOnboardingStore();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredRegions = useMemo(
    () =>
      regions?.data?.filter((region) => region.toLowerCase().includes(searchTerm.toLowerCase())) ??
      [],
    [regions?.data, searchTerm]
  );

  const handleConfirm = () => {
    localStorage.setItem("district", data.region);
    router.replace("/");
  };

  return (
    <main>
      {/* 검색바 */}
      <div className="bg-[#F4F4FB] px-[16px] py-[25px]">
        <div className="flex rounded-[10px] border border-[#919191] bg-white p-[12px]">
          <div className="flex w-full items-center gap-[10px]">
            <Search />
            <input
              type="search"
              className="flex-1 text-[20px] font-[400] outline-none placeholder:text-[#919191]"
              placeholder="지역 동네명 검색 예) 강남구, 역삼동"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value.trim())}
            />
          </div>
        </div>
      </div>

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
            {filteredRegions.map((region) => {
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

      <BottomButton
        onClick={async () => {
          handleConfirm();
        }}
        stickToBottom
      >
        설정 완료
      </BottomButton>
    </main>
  );
}
