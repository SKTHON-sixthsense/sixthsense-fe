import EmployCard from "./EmployCard";

interface ContentProps {
  employs: {
    id: number;
    postName: string;
    companyName: string;
    workLocation: string;
    salary: number;
    salaryType: string;
    workDays: string;
    workHours: string;
    createDate: string;
  }[];
  loading: boolean;
}

export default function Content({ employs, loading }: ContentProps) {
  if (loading) {
    return <div className="p-4 text-center text-white">로딩 중...</div>;
  }

  if (employs.length === 0) {
    return <div className="p-4 text-center text-white">조건에 맞는 공고가 없습니다.</div>;
  }

  return (
    <div className="bg-[#F4F4FB] p-[16px] pt-[25px]">
      <p className="text-[18px] font-[500] text-[#919191]">맞춤 공고</p>
      <div className="mt-4 flex flex-col gap-[20px]">
        {employs.map((employ) => {
          const shortLocation = employ.workLocation.split(" ").slice(0, 3).join(" ");
          return (
            <EmployCard
              key={employ.id}
              id={employ.id}
              title={employ.postName}
              store={employ.companyName}
              location={shortLocation}
              date={employ.workDays}
              uploadDate={employ.createDate}
              time={employ.workHours}
              pay={employ.salary}
              salaryType={employ.salaryType}
            />
          );
        })}
      </div>
    </div>
  );
}
