"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useHeader from "@/shared/hooks/useHeader";
import BottomButton from "@/shared/components/BottomButton";
import Modal from "@/shared/components/Modal";

import Image from "next/image";
import Home from "@/assets/icon/Home.svg";
import Call from "@/assets/icon/Call.svg";
import HomeLarge from "@/assets/icon/HomeLarge.svg";
import CallLarge from "@/assets/icon/CallLarge.svg";
import KakaoMap from "./KakaoMap";
import Header from "@/shared/components/Header";

interface Employ {
  id: number;
  title: string;
  store: string;
  location: string;
  date: string;
  uploadDate: string;
  time: string;
  pay: number;
  jobType: string;
  employmentType: string;
  benefits: string;
  education?: string;
  preferred?: string;
  imageUrl?: string;
}

const employData: Employ[] = [
  {
    id: 1,
    title: "서빙 알바 구합니다",
    store: "한식당 맛나",
    location: "서울시 성북구 동선동 동소문로 20가길 2",
    date: "2025-09-20",
    uploadDate: "09.18",
    time: "18:00~22:00",
    pay: 10000,
    jobType: "서빙",
    employmentType: "아르바이트",
    benefits: "식사 제공, 교통비 지원",
    education: "고등학교 졸업 이상",
    preferred: "서빙 경험자 우대, 20~30세",
    imageUrl: "https://placehold.co/390x232",
  },
  {
    id: 2,
    title: "주방 보조 구합니다",
    store: "중식당 화룡",
    location: "서울시 종로구 종로1가 23-5",
    date: "2025-09-22",
    uploadDate: "09.18",
    time: "10:00~15:00",
    pay: 10000,
    jobType: "서빙",
    employmentType: "아르바이트",
    benefits: "식사 제공, 교통비 지원",
    education: "고등학교 졸업 이상",
    preferred: "서빙 경험자 우대, 20~30세",
    imageUrl: "https://placehold.co/390x232",
  },
  {
    id: 3,
    title: "카페 알바 모집",
    store: "카페 모카",
    location: "서울시 마포구 상수동 와우산로 15길 20",
    date: "2025-09-25",
    uploadDate: "09.18",
    time: "12:00~17:00",
    pay: 10000,
    jobType: "서빙",
    employmentType: "아르바이트",
    benefits: "식사 제공, 교통비 지원",
    education: "고등학교 졸업 이상",
    preferred: "서빙 경험자 우대, 20~30세",
    imageUrl: "https://placehold.co/390x232",
  },
];

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

  useEffect(() => {
    const found = employData.find((e) => e.id === Number(id));
    setEmploy(found ?? null);
  }, [id]);

  if (!employ) return <div className="p-4">해당 공고를 찾을 수 없습니다.</div>;

  const handleApply = async () => {
    setIsModalOpen(true);
  };

  return (
    <div className="mx-auto min-h-screen max-w-3xl bg-[#F4F4FB] pb-4">
      <Header />
      {employ.imageUrl && (
        <div className="w-full">
          <Image
            src={employ.imageUrl}
            alt={employ.title}
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
          <p>{employ.uploadDate}</p>
        </div>
        <h1 className="mb-1 text-[28px] font-[600]">{employ.title}</h1>
        <p className="text-[20px] font-[400] text-[#686868]">{employ.store}</p>
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
                시급
              </div>
              {employ.pay.toLocaleString()}원
            </div>
            <p className="text-[20px] font-[500]">
              <span className="mr-[25px] text-[#919191]">근무요일</span> {employ.date}
            </p>{" "}
            <p className="text-[20px] font-[500]">
              <span className="mr-[25px] text-[#919191]">근무시간</span> {employ.time}
            </p>
            <p className="text-[20px] font-[500]">
              <span className="mr-[25px] text-[#919191]">모집직종</span> {employ.jobType}
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
              {employ.education}
            </p>
            <p className="text-[20px] font-[500]">
              <span className="mr-[25px] text-[#919191]">근무요일</span> {employ.preferred}
            </p>{" "}
          </>
        )}
      </div>

      {/* 근무지 */}
      <div className="mt-[12px] bg-[#fff] p-[16px]">
        <p className="text-[24px] font-[600]">근무지</p>
        <p className="text-[20px] font-[500] text-[#686868]">{employ.location}</p>
        {/* 카카오맵 호출 */}
        <div className="mt-2">
          <KakaoMap address={employ.location} />
        </div>
      </div>

      {/* 지원 방법 */}
      <div className="mt-[12px] bg-[#fff] p-[16px] pb-[90px]">
        <p className="mb-[12px] text-[24px] font-[600]">지원방법</p>
        <div className="flex justify-center gap-4">
          <button className="flex flex-1 gap-2">
            <Home className="h-6 w-6" />
            <span className="text-[18px] font-[500] text-[#333]">홈페이지 지원</span>
          </button>
          <button className="flex flex-1 gap-2">
            <Call className="h-6 w-6" />
            <span className="text-[18px] font-[500] text-[#333]">전화 지원</span>
          </button>
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
          <button className="mt-[20px] flex w-full flex-col items-center justify-center gap-2 rounded-[10px] bg-[#F4F4FB] p-6">
            <CallLarge />
            <span className="mt-[10px] text-center text-[24px] font-[500]">
              전화해서
              <br />
              지원하기
            </span>
          </button>
          <button className="mt-[20px] flex w-full flex-col items-center justify-center gap-2 rounded-[10px] bg-[#F4F4FB] p-6">
            <HomeLarge />
            <span className="mt-[10px] text-center text-[24px] font-[500]">
              홈페이지로 지원하기
            </span>
          </button>
        </div>
      </Modal>
    </div>
  );
}
