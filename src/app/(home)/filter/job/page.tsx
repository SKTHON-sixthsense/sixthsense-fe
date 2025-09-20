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
import getJob from "@/app/onboarding/(api)/getJob";
import getJobField from "@/app/onboarding/(api)/getJobField";

export default function Job() {
  const router = useRouter();

  useHeader({
    title: "직종 선택",
    alignTitle: "center",
    showBackButton: true,
  });

  const headerHeight = useHeaderHeight();

  const { data: jobs } = useQuery<BaseResponse<string[]>>({
    queryKey: ["filter", "jobs"],
    queryFn: getJobField,
  });

  const [selectedJobField, setSelectedJobField] = useState<string>("");
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);

  const { data: job } = useQuery<BaseResponse<string[]>>({
    queryKey: ["filter", "job", selectedJobField],
    queryFn: () => getJob(selectedJobField),
  });

  const handleConfirm = () => {
    localStorage.setItem("detailedJobCategories", JSON.stringify(selectedJobs));
    router.replace("/");
  };

  return (
    <main>
      <div className="flex flex-col">
        <hr className="h-[1px] w-full bg-[#919191]"></hr>
        <div className="flex flex-1">
          {/* 대분류 */}
          <div className="flex-1">
            <div
              className="sticky top-0 z-10 flex flex-1 items-center justify-center self-start bg-[#F4F4FB] py-[15px] text-[20px] font-[500] text-[#686868]"
              style={{ top: `${headerHeight}px` }}
            >
              대분류
            </div>

            <hr className="h-[1px] w-full bg-[#919191]"></hr>

            {jobs?.data?.map((region) => (
              <button
                key={region}
                className={`sticky top-0 z-20 w-full px-[16px] py-[20px] text-left text-[24px] font-[500] ${
                  selectedJobField === region ? "bg-primary text-white" : "bg-white text-[#686868]"
                }`}
                style={{ top: `${headerHeight}px` }}
                onClick={() => setSelectedJobField(region)}
              >
                {region}
              </button>
            ))}
          </div>

          <div
            className="w-[1.5px] bg-[#DFDFDF]"
            style={{ height: `calc(100vh - ${headerHeight}px)` }}
          />

          {/* 업직종 */}
          <div className="flex-1">
            <div
              className="sticky top-0 z-10 flex flex-1 items-center justify-center self-start bg-[#F4F4FB] py-[15px] text-[20px] font-[500] text-[#686868]"
              style={{ top: `${headerHeight}px` }}
            >
              업직종
            </div>

            <hr className="h-[1px] w-full bg-[#919191]"></hr>

            {job?.data?.map((region) => {
              const isSelected = selectedJobs.includes(region);

              return (
                <button
                  key={region}
                  className={`flex items-center justify-center px-[16px] py-[20px] text-left text-[24px] font-[500] ${
                    isSelected ? "text-primary" : "text-[#686868]"
                  }`}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedJobs(selectedJobs.filter((job) => job !== region));
                    } else {
                      setSelectedJobs([...selectedJobs, region]);
                    }
                  }}
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
