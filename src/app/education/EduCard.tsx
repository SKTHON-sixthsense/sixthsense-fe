"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import HeartOn from "@/assets/icon/HeartOn.svg";
import HeartOff from "@/assets/icon/HeartOff.svg";

interface CardProps {
  id: number;
  title: string;
  desc: string;
  onToggleHeart?: (id: number, isLiked: boolean) => void;
}

export default function EduCard({ id, title, desc, onToggleHeart }: CardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/education/${id}`);
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
      className="mb-[15px] cursor-pointer rounded-[10px] bg-[#FFF] p-[18px] text-[18px] font-[400]"
      onClick={handleCardClick}
    >
      <div className="flex items-center justify-between">
        <span className="text-[28px] font-[600]">{title}</span>
        <button onClick={handleHeartClick} className="p-1">
          {isLiked ? <HeartOn /> : <HeartOff />}
        </button>
      </div>
      <p className="text-[20px] font-[400] text-[#686868]">{desc}</p>
    </div>
  );
}
