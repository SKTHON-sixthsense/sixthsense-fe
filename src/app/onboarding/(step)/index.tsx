import SelectJobField from "./element/SelectJobField";
import SelectJob from "./element/SelectJob";
import SelectRegion from "./element/SelectRegion";
import SelectHealth from "./element/SelectHealth";

interface Step {
  title: string;
  description: React.ReactNode; // <br/> 지원해야 하므로
  additionalDescription?: React.ReactNode; // 추가 설명
  element: React.ReactNode;
}

const Steps: Record<number, Step> = {
  1: {
    title: "지역 선택",
    description: (
      <>
        일을 구하고자 하는
        <br />
        지역을 선택해주세요
      </>
    ),
    element: <SelectRegion />,
  },
  2: {
    title: "직종 선택",
    description: (
      <>
        어떤 업종의
        <br />
        일을 찾고 계신가요?
      </>
    ),
    element: <SelectJobField />,
  },
  3: {
    title: "직종 선택",
    description: (
      <>
        <span className="text-primary">&apos;시설관리 및 운영&apos;</span> 분야에서
        <br />
        어떤 일을 하고 싶으신가요?
      </>
    ),
    element: <SelectJob />,
  },
  4: {
    title: "건강 상태 선택",
    description: (
      <>
        일하는데 우려되는
        <br />
        건강 상태 부위를 선택해주세요
      </>
    ),
    additionalDescription: <>나의 건강상태는 사장님에게 보이지 않아요</>,
    element: <SelectHealth />,
  },
};

export default Steps;
