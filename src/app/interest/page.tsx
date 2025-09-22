/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { useFavorites } from "@/shared/hooks/useFavorites";
import BottomNavigation from "@/shared/components/BottomNavigation";

import LocationGray from "@/assets/icon/LocationGray.svg";
import TimeGray from "@/assets/icon/TimeGray.svg";
import HeartOn from "@/assets/icon/HeartOn.svg";
import useHeader from "@/shared/hooks/useHeader";

export default function InterestPage() {
  useHeader({
    title: "관심 정보",
    alignTitle: "left",
  });

  const router = useRouter();
  const { favorites, toggleFavorite } = useFavorites();

  const employFavorites = favorites.filter((item) => item.type === "employ");
  const educationFavorites = favorites.filter((item) => item.type === "education");

  const handleEmployCardClick = (id: number) => {
    router.push(`/employ/${id}`);
  };

  const handleEducationCardClick = (id: number) => {
    router.push(`/education/${id}`);
  };

  const handleHeartClick = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    toggleFavorite(item);
  };

  return (
    <div className="mb-[90px] min-h-screen bg-[#F4F4FB]">
      <div className="space-y-8 p-4">
        {/* 관심 공고 섹션 */}
        <div>
          <p className="pb-[16px] text-[24px] font-[600]">관심 공고</p>
          {employFavorites.length > 0 ? (
            employFavorites.map((item) => (
              <div
                key={`employ-${item.id}`}
                className="mb-3 cursor-pointer rounded-[20px] bg-white p-[18px] text-[18px] font-[400]"
                onClick={() => handleEmployCardClick(item.id)}
              >
                <div className="flex items-center justify-between font-[400] text-[#919191]">
                  <span>{item.uploadDate}</span>
                  <button onClick={(e) => handleHeartClick(e, item)} className="p-1">
                    <HeartOn />
                  </button>
                </div>
                <p className="text-[28px] font-[600]">{item.title}</p>
                <p className="text-[20px] font-[500] text-[#686868]">{item.store}</p>
                <div className="mt-[10px] flex items-center gap-[9px] text-[#686868]">
                  <LocationGray />
                  <span>{item.location}</span>
                </div>
                <div className="mt-[2px] flex items-center gap-[9px] text-[#686868]">
                  <TimeGray />
                  <span>{item.date}</span>
                  <span>{item.time}</span>
                </div>
                <div className="mt-[15px] flex items-center justify-between rounded-[10px] bg-[#F4F4FB] pt-[10px] pr-[14px] pb-[10px] pl-[14px]">
                  <span className="text-[24px] font-[500]">시급</span>
                  <div>
                    <span className="text-[30px] font-[600]">{item.pay?.toLocaleString()} </span>
                    <span className="ml-[3px] text-[24px] font-[500]">원</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="py-8 text-center text-[18px] text-gray-500">
              관심 공고 데이터가 없습니다.
            </p>
          )}
        </div>

        {/* 관심 교육 섹션 */}
        <div>
          <p className="pb-[16px] text-[24px] font-[600]">관심 교육</p>
          {educationFavorites.length > 0 ? (
            educationFavorites.map((item) => (
              <div
                key={`education-${item.id}`}
                className="mb-[15px] cursor-pointer rounded-[10px] bg-white p-[18px] text-[18px] font-[400]"
                onClick={() => handleEducationCardClick(item.id)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[28px] font-[600]">{item.title}</span>
                  <button onClick={(e) => handleHeartClick(e, item)} className="p-1">
                    <HeartOn />
                  </button>
                </div>
                <p className="text-[20px] font-[400] text-[#686868]">{item.desc}</p>
              </div>
            ))
          ) : (
            <p className="py-8 text-center text-[18px] text-gray-500">
              관심 교육 데이터가 없습니다.
            </p>
          )}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
