"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useHeader from "@/shared/hooks/useHeader";
import BottomButton from "@/shared/components/BottomButton";
import Image from "next/image";
import Header from "@/shared/components/Header";
import { privateAPI } from "@/shared/api/apiInstance";

interface Edu {
  id: number;
  title: string;
  description: string;
  s3url?: string;
  requirement: string;
  competentAuthority: string;
  issuingAuthority: string;
  isLiked: boolean;
}

export default function EduDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useHeader({
    showBackButton: true,
    onBackButtonClick: () => router.back(),
  });

  const [edu, setEdu] = useState<Edu | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEdu = async () => {
      try {
        const res = await privateAPI.get(`/v1/educations/${id}`);

        if (res.data.success) {
          setEdu(res.data.data);
        } else {
          console.warn(res.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEdu();
  }, [id]);

  if (loading) {
    return <div className="p-4 text-center text-gray-500">로딩 중...</div>;
  }

  if (!edu) {
    return <div className="p-4">해당 자격증을 찾을 수 없습니다.</div>;
  }

  const handleAbout = async () => {
    // if (edu?.s3url) {
    //   window.open(edu.s3url, "_blank");
    // }
    alert("hi");
  };

  return (
    <div className="mx-auto min-h-screen max-w-3xl bg-[#F4F4FB] pb-[90px]">
      <Header />

      {edu.s3url && (
        <div className="w-full">
          <Image
            src={edu.s3url}
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
        <p className="text-[20px] text-[#686868]">{edu.description}</p>
      </div>

      {/* 자격요건 */}
      <div className="mt-[12px] bg-[#fff] p-[16px]">
        <p className="mb-2 text-[24px] font-[600]">자격요건</p>
        <p className="text-[20px] font-[500] text-[#686868]">{edu.requirement}</p>
      </div>

      {/* 관할기관 */}
      <div className="bg-[#fff] p-[16px]">
        <p className="mb-2 text-[24px] font-[600]">관할기관</p>
        <p className="text-[20px] font-[500]">
          <span className="mr-[20px] text-[#686868]">주무부처</span>
          {edu.competentAuthority}
        </p>
        <p className="text-[20px] font-[500]">
          <span className="mr-[20px] text-[#686868]">발급기관</span>
          {edu.issuingAuthority}
        </p>
      </div>

      <BottomButton stickToBottom onClick={handleAbout}>
        더 알아보기
      </BottomButton>
    </div>
  );
}
