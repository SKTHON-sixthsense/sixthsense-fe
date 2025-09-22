import { useEffect, useState } from "react";
import useHeaderStore, { HeaderStore } from "../stores/HeaderStore";

/**
 * @description 헤더 상태 관리 훅
 * @param title 헤더 제목
 * @param alignTitle 헤더 제목 정렬 (left, center)
 * @param showBackButton 뒤로가기 버튼 표시 여부
 * @param onBackButtonClick 뒤로가기 버튼 클릭 시 실행할 함수 (optional, 기본값은 router.back())
 * @param secondaryButton 오른쪽 버튼 (ReactNode, 32 x 32 사이즈)
 * @param progress 프로그레스 바 진행 상태 (null이면 숨김, 0 ~ 100)
 */
const useHeader = ({
  title,
  alignTitle,
  showBackButton,
  onBackButtonClick,
  secondaryButton,
  progress,
}: Partial<Omit<HeaderStore, "update">>) => {
  const update = useHeaderStore((state) => state.update);

  useEffect(() => {
    update({ title, alignTitle, showBackButton, onBackButtonClick, secondaryButton, progress });
  }, [title, alignTitle, showBackButton, onBackButtonClick, secondaryButton, progress, update]);
};

export const useHeaderHeight = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const { progress } = useHeaderStore();

  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector("header");
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
    };

    // Initial measurement
    updateHeaderHeight();

    // Use ResizeObserver to detect header size changes
    const header = document.querySelector("header");
    if (header) {
      const resizeObserver = new ResizeObserver(updateHeaderHeight);
      resizeObserver.observe(header);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [progress]); // Re-run when progress changes (which affects header height)

  return headerHeight;
};

export default useHeader;
