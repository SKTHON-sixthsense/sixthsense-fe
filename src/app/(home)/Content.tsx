import EmployCard from "./EmployCard";

const employs = [
  {
    title: "서빙 알바 구합니다",
    store: "한식당 맛나",
    location: "서울 강남구",
    date: "2025-09-20",
    time: "18:00~22:00",
    pay: 10000,
  },
  {
    title: "주방 보조 구합니다",
    store: "중식당 화룡",
    location: "서울 종로구",
    date: "2025-09-22",
    time: "10:00~15:00",
    pay: 10000,
  },
  {
    title: "카페 알바 모집",
    store: "카페 모카",
    location: "서울 마포구",
    date: "2025-09-25",
    time: "12:00~17:00",
    pay: 10000,
  },
];

export default function Content() {
  return (
    <div className="p-[16px]">
      <p className="text-[18px] font-[500] text-[#919191]">맞춤 공고</p>

      <div className="mt-4 flex flex-col gap-[20px]">
        {employs.map((employ, idx) => (
          <EmployCard
            key={idx}
            title={employ.title}
            store={employ.store}
            location={employ.location}
            date={employ.date}
            time={employ.time}
            pay={employ.pay}
          />
        ))}
      </div>
    </div>
  );
}
