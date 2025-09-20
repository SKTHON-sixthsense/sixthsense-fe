"use client";

import { useRouter } from "next/navigation";
import { useFavorites } from "@/shared/hooks/useFavorites";

import HeartOn from "@/assets/icon/HeartOn.svg";
import HeartOff from "@/assets/icon/HeartOff.svg";

interface CardProps {
  id: number;
  title: string;
  desc: string;
}

export default function EduCard({ id, title, desc }: CardProps) {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleCardClick = () => {
    router.push(`/education/${id}`);
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite({
      id,
      type: "education",
      title,
      desc,
    });
  };

  return (
    <div
      className="mb-[15px] cursor-pointer rounded-[10px] bg-[#FFF] p-[18px] text-[18px] font-[400]"
      onClick={handleCardClick}
    >
      <div className="flex items-center justify-between">
        <span className="text-[28px] font-[600]">{title}</span>
        <button onClick={handleHeartClick} className="p-1">
          {isFavorite(id, "education") ? <HeartOn /> : <HeartOff />}
        </button>
      </div>
      <p className="text-[20px] font-[400] text-[#686868]">{desc}</p>
    </div>
  );
}
