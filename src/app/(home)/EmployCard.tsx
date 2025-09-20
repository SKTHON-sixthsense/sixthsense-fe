"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import LocationGray from "@/assets/icon/LocationGray.svg";
import TimeGray from "@/assets/icon/TimeGray.svg";
import HeartOn from "@/assets/icon/HeartOn.svg";
import HeartOff from "@/assets/icon/HeartOff.svg";

interface CardProps {
  id: number;
  uploadDate: string;
  title: string;
  store: string;
  location: string;
  date: string;
  time: string;
  pay: number;
  onToggleHeart?: (id: number, isLiked: boolean) => void;
}

export default function EmployCard({
  id,
  uploadDate,
  title,
  store,
  location,
  date,
  time,
  pay,
  onToggleHeart,
}: CardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/employ/${id}`);
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = !isLiked;
    setIsLiked(newState);
    if (onToggleHeart) {
      onToggleHeart(id, newState);
    }
  };

  return (
    <div
      className="cursor-pointer rounded-[20px] bg-[#FFF] p-[18px] text-[18px] font-[400]"
      onClick={handleCardClick}
    >
      <div className="flex items-center justify-between font-[400] text-[#919191]">
        <span>{uploadDate}</span>
        <button onClick={handleHeartClick} className="p-1">
          {isLiked ? <HeartOn /> : <HeartOff />}
        </button>
      </div>
      <p className="text-[28px] font-[600]">{title}</p>
      <p className="text-[20px] font-[500] text-[#686868]">{store}</p>
      <div className="mt-[10px] flex items-center gap-[9px] text-[#686868]">
        <LocationGray />
        <span>{location}</span>
      </div>
      <div className="mt-[2px] flex items-center gap-[9px] text-[#686868]">
        <TimeGray />
        <span>{date}</span>
        <span>{time}</span>
      </div>
      <div className="mt-[15px] flex items-center justify-between rounded-[10px] bg-[#F4F4FB] pt-[10px] pr-[14px] pb-[10px] pl-[14px]">
        <span className="text-[24px] font-[500]">시급</span>
        <div>
          <span className="text-[30px] font-[600]">{pay}</span>
          <span className="ml-[3px] text-[24px] font-[500]">원</span>
        </div>
      </div>
    </div>
  );
}
