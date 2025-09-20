import BottomButton from "@/shared/components/BottomButton";

export default function Introduction() {
  const introduction = `저는 만 56세 여성으로, 성실함과 책임감을 바탕으로 꾸준히 일할 준비가 되어 있습니다. 요양보호사 자격증과 한식조리기능사 자격증을 보유하고 있으며, 기본적인 위생 관리와 안전 수칙을 잘 준수할 수 있습니다.
 그동안 주방에서 설거지와 보조 아르바이트 경험을 통해 빠르게 움직이며 깨끗함을 유지하는 습관을 길렀습니다. 특히 주방에서 필요한 청결 관리와 정리정돈에 자신이 있으며, 팀원들과 원활하게 소통하며 협력하는 것을 중요하게 생각합니다. 연령대가 있는 만큼 책임감 있게 맡은 일을 끝까지 수행하며, 젊은 분들 못지않게 성실하게 일하겠습니다. 또한 자격증 취득 과정에서 배운 조리 기본 지식은 주방에서 도움이 될 수 있다고 생각합니다.
 작은 일도 소홀히 하지 않고 꾸준히 최선을 다하는 태도로 근무하겠습니다.항상 밝고 긍정적인 마음으로 동료들과 함께 즐겁게 일하고 싶습니다.저의 경험과 성실함이 귀하의 매장 운영에 도움이 되길 바랍니다. 기회를 주신다면 맡은 바 책임을 다하며 성실하게 근무하겠습니다.`;

  return (
    <section id="introduction" className="flex flex-col gap-[20px] bg-white px-[16px] py-[20px]">
      <span className="text-[24px] font-[600]">자기소개서</span>
      {/* 자기소개서 */}
      <textarea
        className="h-[500px] w-full resize-none text-[18px] font-[400]"
        value={introduction}
      />

      <BottomButton onClick={async () => {}}>자기소개서 수정하기</BottomButton>
    </section>
  );
}
