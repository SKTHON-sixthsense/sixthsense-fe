import EmployCard from "./EmployCard";

const employs = [
  {
    id: 1,
    title: "서빙 알바 구합니다",
    store: "한식당 맛나",
    location: "서울시 성북구 동선동 동소문로 20가길 2",
    date: "2025-09-20",
    uploadDate: "09.18",
    time: "18:00~22:00",
    pay: 10000,
  },
  {
    id: 2,
    title: "주방 보조 구합니다",
    store: "중식당 화룡",
    location: "서울시 종로구 종로1가 23-5",
    date: "2025-09-22",
    uploadDate: "09.18",
    time: "10:00~15:00",
    pay: 10000,
  },
  {
    id: 3,
    title: "카페 알바 모집",
    store: "카페 모카",
    location: "서울시 마포구 상수동 와우산로 15길 20",
    date: "2025-09-25",
    uploadDate: "09.18",
    time: "12:00~17:00",
    pay: 10000,
  },
];

export default function Content() {
  return (
    <div className="mt-[18px] p-[16px]">
      <p className="text-[18px] font-[500] text-[#919191]">맞춤 공고</p>
      <div className="mt-4 flex flex-col gap-[20px]">
        {employs.map((employ) => {
          const shortLocation = employ.location.split(" ").slice(0, 3).join(" ");
          return (
            <EmployCard
              key={employ.id}
              id={employ.id}
              title={employ.title}
              store={employ.store}
              location={shortLocation}
              date={employ.date}
              uploadDate={employ.uploadDate}
              time={employ.time}
              pay={employ.pay}
            />
          );
        })}
      </div>
    </div>
  );
}
