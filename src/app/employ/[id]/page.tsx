"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useHeader from "@/shared/hooks/useHeader";
import BottomButton from "@/shared/components/BottomButton";
import Modal from "@/shared/components/Modal";
import { privateAPI } from "@/shared/api/apiInstance";

import Image from "next/image";
import Home from "@/assets/icon/Home.svg";
import Call from "@/assets/icon/Call.svg";
import HomeLarge from "@/assets/icon/HomeLarge.svg";
import CallLarge from "@/assets/icon/CallLarge.svg";
import KakaoMap from "./KakaoMap";
import Header from "@/shared/components/Header";

interface Employ {
  id: number;
  postName: string;
  companyName: string;
  s3Url: string;
  status: string;
  workLocation: string;
  salary: number;
  salaryType: string;
  workDays: string;
  workHours: string;
  jobCategory: string;
  detailJobCategory: string[];
  employmentType: string;
  benefits: string;
  educationRequirement: string;
  preferredQualifications: string;
  homepageUrl: string;
  callNum: string;
  createDate: string;
}

export default function EmployDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useHeader({
    showBackButton: true,
    onBackButtonClick: () => router.back(),
  });

  const [employ, setEmploy] = useState<Employ | null>(null);
  const [activeTab, setActiveTab] = useState<"work" | "recruit">("work");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmploy = async () => {
      try {
        setLoading(true);
        const response = await privateAPI.get(`/jobposting/${id}`);
        if (response.data.success && response.data.data) {
          setEmploy(response.data.data);
        } else {
          setEmploy(null);
        }
      } catch (error) {
        console.error("공고 데이터를 가져오는데 실패했습니다:", error);
        setEmploy(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEmploy();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
          <p className="text-gray-600">공고를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!employ) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">해당 공고를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const handleApply = async () => {
    setIsModalOpen(true);
  };

  return (
    <div className="mx-auto min-h-screen max-w-3xl bg-[#F4F4FB] pb-4">
      <Header />
      {employ.s3Url && (
        <div className="w-full">
          <Image
            src={employ.s3Url}
            alt={employ.postName}
            width={390}
            height={232}
            className="h-[232px] w-full object-cover"
            unoptimized
          />
        </div>
      )}
      {/* 공고 정보 */}
      <div className="bg-[#fff] p-[16px]">
        <div className="text-[16px] text-[#919191]">
          <p>{employ.createDate}</p>
        </div>
        <h1 className="mb-1 text-[28px] font-[600]">{employ.postName}</h1>
        <p className="text-[20px] font-[400] text-[#686868]">{employ.companyName}</p>
      </div>

      {/* 탭 버튼 */}
      <div className="mt-[12px] flex bg-[#fff] text-[20px]">
        <button
          className={`flex-1 py-3 text-center font-[500] ${
            activeTab === "work"
              ? "border-b-4 border-[#B45EC9] font-[600]"
              : "border-b-2 border-[#DFDFDF] text-[#686868]"
          }`}
          onClick={() => setActiveTab("work")}
        >
          근무조건
        </button>
        <button
          className={`flex-1 py-3 text-center font-[500] ${
            activeTab === "recruit"
              ? "border-b-4 border-[#B45EC9] font-[600]"
              : "border-b-2 border-[#DFDFDF] text-[#686868]"
          }`}
          onClick={() => setActiveTab("recruit")}
        >
          모집조건
        </button>
      </div>

      {/* 탭 내용 */}
      <div className="flex flex-col gap-2 rounded-[10px] bg-white p-4 text-[16px]">
        {activeTab === "work" ? (
          <>
            <div className="flex text-[20px] font-[500]">
              <p>
                <span className="mr-[28px] text-[#919191]">급</span>{" "}
                <span className="mr-[30px] text-[#919191]">여</span>
              </p>
              <div className="mr-[7px] rounded-[20px] bg-[#FFC35D] px-[10px] pt-[3px] text-[18px] text-white">
                {employ.salaryType}
              </div>
              {employ.salary.toLocaleString()}원
            </div>
            <p className="text-[20px] font-[500]">
              <span className="mr-[25px] text-[#919191]">근무요일</span> {employ.workDays}요일
            </p>{" "}
            <p className="text-[20px] font-[500]">
              <span className="mr-[25px] text-[#919191]">근무시간</span> {employ.workHours}
            </p>
            <p className="text-[20px] font-[500]">
              <span className="mr-[25px] text-[#919191]">모집직종</span> {employ.jobCategory}
            </p>
            <p className="text-[20px] font-[500]">
              <span className="mr-[25px] text-[#919191]">고용형태</span> {employ.employmentType}
            </p>
            <p className="text-[20px] font-[500]">
              <span className="mr-[25px] text-[#919191]">복리후생</span> {employ.benefits}
            </p>
          </>
        ) : (
          <>
            <p className="text-[20px] font-[500]">
              <span className="mr-[28px] text-[#919191]">학</span>{" "}
              <span className="mr-[30px] text-[#919191]">력</span>
              {employ.educationRequirement}
            </p>
            <p className="text-[20px] font-[500]">
              <span className="mr-[25px] text-[#919191]">우대사항</span>{" "}
              {employ.preferredQualifications}
            </p>{" "}
          </>
        )}
      </div>

      {/* 근무지 */}
      <div className="mt-[12px] bg-[#fff] p-[16px]">
        <p className="text-[24px] font-[600]">근무지</p>
        <p className="text-[20px] font-[500] text-[#686868]">{employ.workLocation}</p>
        {/* 카카오맵 호출 */}
        <div className="mt-2">
          <KakaoMap address={employ.workLocation} />
        </div>
      </div>

      {/* 지원 방법 */}
      <div className="mt-[12px] bg-[#fff] p-[16px] pb-[90px]">
        <p className="mb-[12px] text-[24px] font-[600]">지원방법</p>
        <div className="flex justify-center gap-4">
          {employ.homepageUrl && (
            <button
              className="flex flex-1 gap-2"
              onClick={() => window.open(employ.homepageUrl, "_blank")}
            >
              <Home className="h-6 w-6" />
              <span className="text-[18px] font-[500] text-[#333]">홈페이지 지원</span>
            </button>
          )}
          {employ.callNum && (
            <button
              className="flex flex-1 gap-2"
              onClick={() => window.open(`tel:${employ.callNum}`, "_self")}
            >
              <Call className="h-6 w-6" />
              <span className="text-[18px] font-[500] text-[#333]">전화 지원</span>
            </button>
          )}
        </div>
      </div>
      <BottomButton stickToBottom onClick={handleApply}>
        지원하기
      </BottomButton>
      {/* 모달 */}
      <Modal
        isOpen={isModalOpen}
        title="지원하기"
        description="지원 방식을 선택해주세요"
        onClose={() => setIsModalOpen(false)}
      >
        <div className="mb-[20px] flex w-full items-center justify-center gap-4">
          {employ.callNum && (
            <button
              className="mt-[20px] flex w-full flex-col items-center justify-center gap-2 rounded-[10px] bg-[#F4F4FB] p-6"
              onClick={() => window.open(`tel:${employ.callNum}`, "_self")}
            >
              <CallLarge />
              <span className="mt-[10px] text-center text-[24px] font-[500]">
                전화해서
                <br />
                지원하기
              </span>
            </button>
          )}
          {employ.homepageUrl && (
            <button
              className="mt-[20px] flex w-full flex-col items-center justify-center gap-2 rounded-[10px] bg-[#F4F4FB] p-6"
              onClick={() => window.open(employ.homepageUrl, "_blank")}
            >
              <HomeLarge />
              <span className="mt-[10px] text-center text-[24px] font-[500]">
                홈페이지로 지원하기
              </span>
            </button>
          )}
        </div>
      </Modal>
    </div>
  );
}
