"use client";

import { useState, useEffect } from "react";
import EduCard from "../education/EduCard";
import EmployCard from "../(home)/EmployCard";

type Edu = {
  id: number;
  title: string;
  summary: string;
  isLiked?: boolean;
};

type Job = {
  id: number;
  title: string;
  location: string;
  time: string;
  pay: number;
};

export default function InterestPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [edus, setEdus] = useState<Edu[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 더미 데이터 생성
    const dummyJobs: Job[] = [
      {
        id: 1,
        title: "서빙 알바 모집",
        location: "서울 성북구 한식당 맛나",
        time: "18:00~22:00",
        pay: 10000,
      },
      {
        id: 2,
        title: "주방 보조 구함",
        location: "서울 종로구 중식당 화룡",
        time: "10:00~15:00",
        pay: 12000,
      },
    ];

    const dummyEdus: Edu[] = [
      { id: 101, title: "React 기본 강좌", summary: "프론트엔드 개발 입문", isLiked: true },
      { id: 102, title: "Python 데이터 분석", summary: "Pandas/Numpy 실습", isLiked: false },
    ];

    setTimeout(() => {
      setJobs(dummyJobs);
      setEdus(dummyEdus);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="bg-[#F4F4FB]">
      <header className="w-full bg-white pt-[20px] pb-[16px]">
        <p className="pl-[16px] text-[24px] font-[600]">관심 정보</p>
      </header>

      {/* 관심 공고 섹션 */}
      <div className="m-[16px]">
        <p className="pb-[16px] pl-[16px] text-[24px] font-[600]">관심 공고</p>
        {loading ? (
          <p className="text-center text-gray-500">로딩 중...</p>
        ) : jobs.length > 0 ? (
          jobs.map((job) => (
            <EmployCard
              key={job.id}
              id={job.id}
              title={job.title}
              location={job.location}
              time={job.time}
              pay={job.pay}
              uploadDate={""}
              store={""}
              date={""}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">관심 공고가 없습니다.</p>
        )}
      </div>

      {/* 관심 교육 섹션 */}
      <div className="m-[16px]">
        <p className="pb-[16px] pl-[16px] text-[24px] font-[600]">관심 교육</p>
        {loading ? (
          <p className="text-center text-gray-500">로딩 중...</p>
        ) : edus.length > 0 ? (
          edus.map((edu) => (
            <EduCard key={edu.id} id={edu.id} title={edu.title} desc={edu.summary} />
          ))
        ) : (
          <p className="text-center text-gray-500">관심 교육이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
