"use client";

import { useState } from "react";
import useHeader from "@/shared/hooks/useHeader";
import Chip from "../../(component)/Chip";
import BottomButton from "@/shared/components/BottomButton";
import ExperienceCard from "../../(component)/ExperienceCard";
import { useRouter } from "next/navigation";

export default function EditGeneral() {
  const router = useRouter();

  const [selectedGender, setSelectedGender] = useState<string>("");

  useHeader({
    title: "나의 정보 수정",
    alignTitle: "center",
  });

  const experiences = [
    {
      location: "MIP 잠실점",
      role: "주방 보조 업무",
      onGoing: true,
    },
    {
      location: "경복궁 잠실역점",
      role: "설거지 및 주방 보조 업무",
      period: "2022.05 - 2024.05",
    },
  ];

  return (
    <main>
      <div className="flex flex-col gap-[15px] bg-[#F4F4FB]">
        <div className="flex flex-col gap-[40px] bg-white px-[16px] py-[30px]">
          <div className="flex gap-[12px]">
            {/* 사진 */}
            <div className="w-[150px] bg-neutral-200"></div>

            {/* 인적사항 */}
            <div className="flex flex-col gap-[20px]">
              {/* 이름 */}
              <div className="flex flex-col gap-[18px]">
                <span className="text-[20px] font-[500] text-[#707070]">
                  이름 <span className="text-[18px] font-[400] text-primary">*</span>
                </span>
                <input
                  type="text"
                  placeholder="김다시"
                  className="w-full border-b border-b-[#686868] text-[24px] font-[500] outline-none placeholder:text-[#686868]"
                />
              </div>

              {/* 성별 */}
              <div className="flex flex-col gap-[12px]">
                <span className="text-[20px] font-[500] text-[#707070]">
                  성별 <span className="text-[18px] font-[400] text-primary">*</span>
                </span>

                <div className="flex w-full">
                  {/* 남 */}
                  <label
                    className={`flex flex-1 cursor-pointer items-center justify-center rounded-l-[5px] border bg-white px-[40px] py-[16px] transition-colors ${
                      selectedGender === "male" ? "border-primary" : "border-[#D9D9D9]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      className="sr-only"
                      onChange={(e) => setSelectedGender(e.target.value)}
                    />
                    <span
                      className={`text-[24px] font-[500] ${
                        selectedGender === "male" ? "text-primary" : "text-[#919191]"
                      }`}
                    >
                      남
                    </span>
                  </label>

                  {/* 여 */}
                  <label
                    className={`flex flex-1 cursor-pointer items-center justify-center rounded-r-[5px] border bg-white px-[40px] py-[16px] transition-colors ${
                      selectedGender === "female" ? "border-primary" : "border-[#D9D9D9]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      className="sr-only"
                      onChange={(e) => setSelectedGender(e.target.value)}
                    />
                    <span
                      className={`text-[24px] font-[500] ${
                        selectedGender === "female" ? "text-primary" : "text-[#919191]"
                      }`}
                    >
                      여
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* 생년월일 */}
          <div className="flex flex-col gap-[20px]">
            <span className="text-[20px] font-[500] text-[#707070]">
              생년월일 <span className="text-[18px] font-[400] text-primary">*</span>
            </span>

            <input
              type="text"
              placeholder="1990.01.01"
              className="w-full border-b border-b-[#686868] text-[24px] font-[500] outline-none placeholder:text-[#686868]"
            />
          </div>

          {/* 전화번호 */}
          <div className="flex flex-col gap-[20px]">
            <span className="text-[20px] font-[500] text-[#707070]">
              전화번호 <span className="text-[18px] font-[400] text-primary">*</span>
            </span>

            <input
              type="text"
              placeholder="010-1234-5678"
              className="w-full border-b border-b-[#686868] text-[24px] font-[500] outline-none placeholder:text-[#686868]"
            />
          </div>
        </div>

        {/* 우려되는 건강 부위*/}
        <div className="flex flex-col bg-white px-[16px] py-[20px]">
          <span className="text-[20px] font-[500] text-[#707070]">우려되는 건강 부위</span>
          <div className="mt-[15px] mb-[20px] flex flex-wrap gap-[10px]">
            <Chip title="다리" onDelete={() => {}} />
            <Chip title="손목" onDelete={() => {}} />
          </div>

          <BottomButton
            variant="secondary"
            onClick={async () => {
              router.push("/my/edit/general/health");
            }}
          >
            건강 상태 추가하기
          </BottomButton>

          <span className="mt-[10px] text-[18px] font-[400] text-primary">
            * 나의 건강상태는 사장님에게 보이지 않아요
          </span>
        </div>

        {/* 성격 */}
        <div className="flex flex-col bg-white px-[16px] py-[20px]">
          <span className="text-[20px] font-[500] text-[#707070]">성격</span>
          <div className="mt-[15px] mb-[20px] flex flex-wrap gap-[10px]">
            <Chip title="성실해요" onDelete={() => {}} />
            <Chip title="손이 빨라요" onDelete={() => {}} />
          </div>

          <BottomButton
            variant="secondary"
            onClick={async () => {
              router.push("/my/edit/general/personality");
            }}
          >
            성격 추가하기
          </BottomButton>
        </div>

        {/* 경력 사항 */}
        <div className="mb-[15px] flex flex-col gap-[10px] bg-white px-[16px] py-[20px]">
          <span className="text-[20px] font-[500] text-[#707070]">경력 사항</span>

          <div className="mb-[20px] flex flex-col gap-[15px]">
            {experiences.map((experience) => (
              <ExperienceCard key={experience.location} {...experience} />
            ))}
          </div>

          <BottomButton variant="secondary" onClick={async () => {}}>
            경력 추가하기
          </BottomButton>
        </div>
      </div>
    </main>
  );
}
