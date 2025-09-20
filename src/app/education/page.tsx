import EduCard from "./EduCard";
import StarAd from "@/assets/icon/StarAd.svg";

export default function EduPage() {
  const edus = [
    {
      id: 1,
      title: "간병사 자격증",
      desc: "관련 정보 1",
    },
    {
      id: 2,
      title: "간병사 자격증",
      desc: "관련 정보 2",
    },
    {
      id: 3,
      title: "간병사 자격증",
      desc: "관련 정보 3",
    },
  ];

  return (
    <div className="bg-[#F4F4FB]">
      <header className="w-full bg-white pt-[20px]">
        <p className="pb-[16px] pl-[16px] text-[24px] font-[600]">관련 교육</p>
      </header>
      {/* 광고 배너 */}
      <div className="mt-[15px] bg-[#8AD7CA] p-[24px] text-[20px] font-[600] text-white">
        <div className="flex gap-[30px]">
          <span>중장년이 열어가는 앞으로의 50년</span>
          <StarAd />
        </div>
        <p className="">
          <span className="text-[24px] font-[800]">서울시 50플러스 재단</span>이 함께합니다
        </p>
      </div>
      <div className="m-[16px]">
        {edus.map((edus) => {
          return <EduCard key={edus.id} id={edus.id} title={edus.title} desc={edus.desc} />;
        })}
      </div>
    </div>
  );
}
