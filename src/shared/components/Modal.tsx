"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import X from "@/assets/icon/X.svg";
import { AnimatePresence, motion } from "motion/react";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
  backdropClose?: boolean;
}

const Modal = ({
  children,
  isOpen = false,
  title,
  description,
  onClose,
  backdropClose = true,
}: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          onClick={(e) => {
            e.preventDefault();

            if (backdropClose) {
              onClose();
            }
          }}
          className="fixed inset-0 z-[9999] flex h-full w-full items-center justify-center overflow-hidden bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="mx-[16px] w-full rounded-[10px] bg-white px-[20px] pt-[25px] pb-[15px]">
            <div className="flex items-center justify-between">
              <div className="text-[24px] font-[600]">{title}</div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
              >
                <X width={28} height={28} />
              </button>
            </div>
            {description && <div className="mt-[12px] text-[18px] font-[20]">{description}</div>}
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
