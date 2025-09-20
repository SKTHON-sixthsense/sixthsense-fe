import { useEffect } from "react";
import useHeaderStore, { HeaderStore } from "../stores/HeaderStore";

/**
 * @description 헤더 상태 관리 훅
 * @param title 헤더 제목
 * @param alignTitle 헤더 제목 정렬 (left, center)
 * @param showBackButton 뒤로가기 버튼 표시 여부
 * @param secondaryButton 오른쪽 버튼 (ReactNode, 32 x 32 사이즈)
 * @param progress 프로그레스 바 진행 상태 (null이면 숨김, 0 ~ 100)
 */
const useHeader = ({
  title,
  alignTitle,
  showBackButton,
  secondaryButton,
  progress,
}: Partial<Omit<HeaderStore, "update">>) => {
  const update = useHeaderStore((state) => state.update);

  useEffect(() => {
    update({ title, alignTitle, showBackButton, secondaryButton, progress });
  }, [title, alignTitle, showBackButton, secondaryButton, progress, update]);
};

export default useHeader;
