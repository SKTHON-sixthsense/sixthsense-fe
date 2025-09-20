import Chip from "../(component)/Chip";
import ExperienceCard from "../(component)/ExperienceCard";
import EmployCard from "@/app/(home)/EmployCard";

export default function General() {
  const info = {
    name: "김다시",
    age: 56,
    gender: "여성",
    phone: "010 - 1234 - 5678",
    personality: ["성실함", "손이 빨라요"],
    health: ["다리", "손목"],
    experiences: [
      {
        location: "MIP 잠실점",
        role: "주방 보조 업무",
        onGoing: true,
      },
      {
        location: "경복궁 잠실역점",
        role: "설거지 및 주방 보조 업무",
        period: "2022.05 - 2024.05",
      },
    ],
  };

  return (
    <>
      <section
        id="general"
        className="flex flex-col gap-[30px] bg-white px-[16px] pt-[50px] pb-[20px]"
      >
        {/* 인적사항 */}
        <div className="flex gap-[16px]">
          {/* 사진 */}
          <div className="w-[120px] bg-neutral-200"></div>

          {/* 인적사항 */}
          <div className="flex flex-1 flex-col gap-[20px]">
            {/* 이름 */}
            <div className="flex w-full items-center">
              <span className="flex-1 text-[18px] font-[500] text-[#686868]">이름</span>
              <span className="flex-2 text-[20px] font-[500]">{info.name}</span>
            </div>

            {/* 나이 */}
            <div className="flex w-full items-center">
              <span className="flex-1 text-[18px] font-[500] text-[#686868]">나이</span>
              <span className="flex-2 text-[20px] font-[500]">만 {info.age}세</span>
            </div>

            {/* 성별 */}
            <div className="flex w-full items-center">
              <span className="flex-1 text-[18px] font-[500] text-[#686868]">성별</span>
              <span className="flex-2 text-[20px] font-[500]">{info.gender}</span>
            </div>

            {/* 전화번호 */}
            <div className="flex w-full items-center">
              <span className="flex-1 text-[18px] font-[500] text-[#686868]">연락처</span>
              <span className="flex-2 text-[20px] font-[500]">{info.phone}</span>
            </div>

            {/* 이메일 */}
          </div>
        </div>

        {/* 성격 */}
        <div className="flex flex-col gap-[10px]">
          <span className="text-[18px] font-[500] text-[#686868]">성격</span>
          <div className="flex flex-wrap gap-[5px]">
            {info.personality.map((personality) => (
              <Chip key={personality} title={personality} />
            ))}
          </div>
        </div>

        {/* 아픈 건강 부위 */}
        <div className="flex flex-col gap-[10px]">
          <span className="text-[18px] font-[500] text-[#686868]">아픈 건강 부위</span>
          <div className="flex flex-wrap gap-[5px]">
            {info.health.map((health) => (
              <Chip key={health} title={health} />
            ))}
          </div>
        </div>

        {/* 경력 사항 */}
        <div className="flex flex-col gap-[10px]">
          <span className="text-[18px] font-[500] text-[#686868]">경력 사항</span>

          <div className="flex flex-col gap-[15px]">
            {info.experiences.map((experience) => (
              <ExperienceCard key={experience.location} {...experience} />
            ))}
          </div>
        </div>
      </section>

      {/* 지원 완료 공고 */}
      <section id="applied" className="mt-[40px] flex flex-col gap-[20px] px-[16px] pb-[20px]">
        <span className="text-[24px] font-[600]">지원 완료 공고</span>

        <EmployCard
          id={1}
          uploadDate="09.18"
          title="주3회 주방보조 및 설거지 아르바이트 구합니다"
          store="짬뽕선수"
          location="서울시 성북구 동선동3가"
          date="요일협의"
          time="10:00~16:00"
          pay={12000}
        />
      </section>
    </>
  );
}
