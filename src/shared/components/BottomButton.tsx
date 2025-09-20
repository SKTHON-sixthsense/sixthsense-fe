"use client";

import { useState } from "react";

interface BottomButton {
  children: React.ReactNode;
  onClick: () => Promise<void>;
  disabled?: boolean;
  stickToBottom?: boolean;
}

const BottomButton = ({ children, onClick, disabled, stickToBottom }: BottomButton) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div
      className={
        stickToBottom
          ? "fixed right-0 bottom-0 left-0 z-50 rounded-t-[10px] bg-white px-[16px] py-[10px] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"
          : ""
      }
    >
      <button
        className="relative w-full rounded-[10px] bg-primary px-[20px] py-[13px] text-[20px] font-[600] text-white"
        disabled={disabled}
        onClick={() => {
          setIsLoading(true);
          onClick().finally(() => {
            setIsLoading(false);
          });
        }}
      >
        <span className={isLoading ? "invisible" : ""}>{children}</span>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[20px] w-[20px] animate-spin rounded-full border-2 border-white border-t-transparent" />
          </div>
        )}
      </button>
    </div>
  );
};

export default BottomButton;
