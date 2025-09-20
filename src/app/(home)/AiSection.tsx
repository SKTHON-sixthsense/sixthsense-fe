"use client";

import { useRouter } from "next/navigation";

export default function AiSection() {
  const recommended = {
    id: 1,
    title: "주방 보조 구합니다",
    store: "다시잡",
    location: "서울시 성북구 동선동 동소문로 20가길 2",
    date: "2025-09-20",
    uploadDate: "09.18",
    time: "18:00~22:00",
    pay: 10000,
  };
  const router = useRouter();
  const handleCardClick = () => {
    router.push(`/employ/${recommended.id}`);
  };

  return (
    <div className="relative p-[18px]">
      <div className="relative rounded-[10px] bg-white p-[20px]" onClick={handleCardClick}>
        <div className="absolute top-0 right-0 rounded-tr-[10px] rounded-bl-[10px] bg-[#FFC874] px-3 py-1 text-[18px] font-[600] text-white">
          AI 추천 공고
        </div>
        <p className="text-[18px] font-[500] text-[#919191]">{recommended.store}</p>
        <p className="text-[24px] font-[600]">{recommended.title}</p>
        <p className="mt-[5px] text-[20px] font-[400] text-[#686868]">
          {recommended.location.split(" ").slice(0, 3).join(" ")}
        </p>
        <p className="mt-[2px] text-[20px] font-[600]">
          <span className="mr-1 mr-[10px] text-[#B45EC9]">시급</span>
          {recommended.pay.toLocaleString()}원
        </p>
      </div>
    </div>
  );
}
