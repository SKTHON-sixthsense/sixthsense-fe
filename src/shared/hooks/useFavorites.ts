"use client";

import { useState, useEffect } from "react";
import { privateAPI } from "../api/apiInstance";

interface FavoriteItem {
  id: number;
  type: "employ" | "education";
  title: string;
  store?: string;
  location?: string;
  date?: string;
  time?: string;
  pay?: string;
  desc?: string;
  uploadDate?: string;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // 로컬스토리지에서 찜한 항목들 불러오기
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // 찜한 항목들을 로컬스토리지에 저장
  const saveFavorites = (newFavorites: FavoriteItem[]) => {
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  // 찜하기 추가
  const addFavorite = (item: FavoriteItem) => {
    const newFavorites = [...favorites, item];
    saveFavorites(newFavorites);
  };

  // 찜하기 제거
  const removeFavorite = (id: number, type: "employ" | "education") => {
    const newFavorites = favorites.filter((item) => !(item.id === id && item.type === type));
    saveFavorites(newFavorites);
  };

  // 찜하기 상태 확인
  const isFavorite = (id: number, type: "employ" | "education") => {
    return favorites.some((item) => item.id === id && item.type === type);
  };

  // 찜하기 토글
  const toggleFavorite = async (item: FavoriteItem) => {
    try {
      const res = await privateAPI.post("/favorites", { id: item.id });

      if (res.data.data === "true") {
        setFavorites((prev) => [...prev, item]);
      } else if (res.data.data === "true") {
        setFavorites((prev) => prev.filter((f) => f.id !== item.id));
      }
    } catch (err) {
      console.error("Failed to toggle favorite", err);
    }
  };

  // 특정 타입의 찜한 항목들만 가져오기
  const getFavoritesByType = (type: "employ" | "education") => {
    return favorites.filter((item) => item.type === type);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    getFavoritesByType,
  };
};
