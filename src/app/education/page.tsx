"use client";

import { useEffect, useState } from "react";
import EduCard from "./EduCard";
import StarAd from "@/assets/icon/StarAd.svg";
import { privateAPI } from "@/shared/api/apiInstance";
import BottomNavigation from "@/shared/components/BottomNavigation";

type Edu = {
  id: number;
  title: string;
  summary: string;
  isLiked: boolean;
};

export default function EduPage() {
  const [edus, setEdus] = useState<Edu[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEdus = async () => {
      try {
        const res = await privateAPI.get("/v1/educations");
        if (res.data.success) {
          setEdus(res.data.data);
        } else {
          console.warn("[API 응답 실패]", res.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEdus();
  }, []);

  return (
    <div className="bg-[#F4F4FB]">
      <header className="w-full bg-white pt-[20px]">
        <p className="pb-[16px] pl-[16px] text-[24px] font-[600]">관련 교육</p>
      </header>

      {/* 광고 배너 */}
      <div
        className="mt-[15px] cursor-pointer bg-[#8AD7CA] p-[24px] text-[20px] font-[600] text-white"
        onClick={() => window.open("https://news.seoul.go.kr/welfare/50plus", "_blank")}
      >
        <div className="flex gap-[30px]">
          <span>중장년이 열어가는 앞으로의 50년</span>
          <StarAd />
        </div>
        <p>
          <span className="text-[24px] font-[800]">서울시 50플러스 재단</span>이 함께합니다
        </p>
      </div>

      <div className="m-[16px]">
        {loading ? (
          <p className="text-center text-gray-500">로딩 중...</p>
        ) : edus.length > 0 ? (
          edus.map((edu) => (
            <EduCard key={edu.id} id={edu.id} title={edu.title} desc={edu.summary} />
          ))
        ) : (
          <p className="text-center text-gray-500">교육 정보가 없습니다.</p>
        )}
      </div>
      <BottomNavigation />
    </div>
  );
}
