import Search from "@/assets/icon/Search.svg";
import Location from "@/assets/icon/Location.svg";
import ArrowDown from "@/assets/icon/ArrowDown.svg";

interface HeaderProps {
  location: string;
  jobs: string[];
  onChangeJobs?: () => void;
}

export default function Header({ location, jobs, onChangeJobs }: HeaderProps) {
  return (
    <header className="w-full rounded-b-[20px] bg-white shadow-[0_5px_7px_0_rgba(0,0,0,0.15)]">
      <div className="mx-auto max-w-5xl px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="cursor-pointer text-xl font-bold text-gray-800">홈</div>
          <div className="flex w-full max-w-md items-center rounded-[10px] bg-[#F4F4FB] p-[9px]">
            <Search />
            <input
              type="text"
              placeholder="가게나 음식을 검색해보세요"
              className="mt-[2px] ml-[10px] w-full bg-transparent text-[18px] outline-none"
            />
          </div>
        </div>

        <div className="mt-[25px] flex text-gray-600">
          <Location />
          <span className="mr-[4px] ml-[4px] text-[24px] font-[600]">{location}</span>
          <ArrowDown />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {jobs.length > 0 ? (
              jobs.map((job, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-[#F4F4FB] px-[18px] py-[7px] text-[18px] font-[500] text-[#87659C]"
                >
                  {job}
                </span>
              ))
            ) : (
              <span className="text-[18px] text-gray-500">선택된 직종이 없습니다</span>
            )}
          </div>
          <button
            onClick={onChangeJobs}
            className="ml-4 rounded-[10px] border-1 border-[#9292CB] px-[12px] py-[5px] text-[18px] font-[500]"
          >
            변경
          </button>
        </div>
      </div>
    </header>
  );
}
