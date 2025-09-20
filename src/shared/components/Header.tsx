"use client";

import ChevronRight from "@/assets/icon/ChevronRight.svg";
import { useRouter } from "next/navigation";
import useHeaderStore from "@/shared/stores/HeaderStore";

const Header = () => {
  const router = useRouter();
  const { title, alignTitle, showBackButton, secondaryButton, progress } = useHeaderStore();

  return (
    <header className="sticky inset-0 top-0 z-[999] flex items-center bg-white p-[16px]">
      {showBackButton && (
        <button onClick={() => router.back()}>
          <ChevronRight width={32} height={32} />
        </button>
      )}

      <h1 className="text-[24px] font-[600]" style={{ textAlign: alignTitle }}>
        {title}
      </h1>

      <div className="ml-auto h-[32px] w-[32px]">{secondaryButton}</div>

      {typeof progress === "number" && (
        <div className="absolute bottom-0 left-0 h-[4px] w-full bg-[#E4E4E4]">
          <div
            className="h-full rounded-r-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
