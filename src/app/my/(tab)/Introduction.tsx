"use client";

import { BaseResponse } from "@/shared/api/BaseResponse";
import BottomButton from "@/shared/components/BottomButton";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import getIntroduction, { IntroductionResponse } from "../(api)/getIntroduction";
import usePostIntroduction from "../(hook)/usePostIntroduction";

export default function Introduction() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const postIntroductionMutation = usePostIntroduction();

  const { data: introductionResponse } = useQuery<BaseResponse<IntroductionResponse[]>>({
    queryKey: ["my", "introduction"],
    queryFn: getIntroduction,
  });

  const [text, setText] = useState("");

  useEffect(() => {
    if (introductionResponse?.data?.[0]?.description) {
      setText(introductionResponse.data[0].description);
    }
  }, [introductionResponse?.data]);

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        await postIntroductionMutation.mutateAsync({ image: file });
        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <section id="introduction" className="flex flex-col gap-[20px] bg-white px-[16px] py-[20px]">
      <span className="text-[24px] font-[600]">자기소개서</span>
      {/* 자기소개서 */}
      <textarea
        className={`h-[300px] w-full resize-none bg-neutral-100 p-1 text-[18px] font-[400] ${
          postIntroductionMutation.isPending ? "opacity-50" : ""
        }`}
        readOnly={postIntroductionMutation.isPending}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <BottomButton
        onClick={async () => {
          handleImageUpload();
        }}
        disabled={postIntroductionMutation.isPending}
      >
        {postIntroductionMutation.isPending ? "업로드 중..." : "자기소개서 수정하기"}
      </BottomButton>
    </section>
  );
}
