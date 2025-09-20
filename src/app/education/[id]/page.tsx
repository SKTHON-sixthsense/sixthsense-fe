"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useHeader from "@/shared/hooks/useHeader";
import BottomButton from "@/shared/components/BottomButton";

import Image from "next/image";
import Header from "@/shared/components/Header";

interface Edu {
  id: number;
  title: string;
  desc: string;
  imageUrl?: string;
  requirement: string;
  authority: string;
  issuer: string;
  url: string;
}

const eduData: Edu[] = [
  {
    id: 1,
    title: "간병사 자격증",
    desc: "간병 관련 전문 지식과 실무 능력을 인증하는 자격증입니다.",
    imageUrl: "https://placehold.co/390x232.png",
    requirement: "고등학교 졸업 이상, 관련 교육 이수",
    authority: "보건복지부",
    issuer: "한국보건의료인국가시험원",
    url: "https://www.kangbyeong.or.kr",
  },
  {
    id: 2,
    title: "응급처치 자격증",
    desc: "응급 상황에서 기본적인 처치 능력을 평가하는 자격증입니다.",
    imageUrl: "https://placehold.co/390x232.png",
    requirement: "18세 이상, 교육 과정 수료",
    authority: "소방청",
    issuer: "한국응급처치교육협회",
    url: "https://www.firstaid.or.kr",
  },
  {
    id: 3,
    title: "보육교사 자격증",
    desc: "보육 시설에서 아동을 지도할 수 있는 전문 자격증입니다.",
    imageUrl: "https://placehold.co/390x232.png",
    requirement: "대학 관련 전공 졸업, 실습 이수",
    authority: "교육부",
    issuer: "한국보육진흥원",
    url: "https://www.childcare.or.kr",
  },
];

export default function EduDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useHeader({
    showBackButton: true,
    onBackButtonClick: () => router.back(),
  });

  const [edu, setEdu] = useState<Edu | null>(null);

  useEffect(() => {
    const found = eduData.find((e) => e.id === Number(id));
    setEdu(found ?? null);
  }, [id]);

  if (!edu) return <div className="p-4">해당 자격증을 찾을 수 없습니다.</div>;

  const handleAbout = async () => {
    if (edu?.url) {
      window.open(edu.url, "_blank");
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-3xl bg-[#F4F4FB] pb-4">
      <Header />
      {edu.imageUrl && (
        <div className="w-full">
          <Image
            src={edu.imageUrl}
            alt={edu.title}
            width={390}
            height={232}
            className="h-[232px] w-full object-cover"
            unoptimized
          />
        </div>
      )}

      {/* 자격증 정보 */}
      <div className="bg-[#fff] p-[16px]">
        <h1 className="mt-[6px] mb-2 text-[28px] font-[600]">{edu.title}</h1>
        <p className="text-[20px] text-[#686868]">{edu.desc}</p>
      </div>

      {/* 자격요건 */}
      <div className="mt-[12px] bg-[#fff] p-[16px]">
        <p className="mb-2 text-[24px] font-[600]">자격요건</p>
        <p className="text-[20px] font-[500] text-[#686868]">{edu.requirement}</p>
      </div>

      {/* 관할기관 */}
      <div className="mt-[12px] bg-[#fff] p-[16px]">
        <p className="mb-2 text-[24px] font-[600]">관할기관</p>
        <p className="text-[20px] font-[500]">
          <span className="mr-[20px] text-[#686868]">주무부처</span>
          {edu.authority}
        </p>
        <p className="text-[20px] font-[500]">
          <span className="mr-[20px] text-[#686868]">발급기관</span>
          {edu.issuer}
        </p>
      </div>

      <BottomButton stickToBottom onClick={handleAbout}>
        더 알아보기
      </BottomButton>
    </div>
  );
}
