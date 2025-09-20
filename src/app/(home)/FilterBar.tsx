import Location from "@/assets/icon/Location.svg";
import ArrowDown from "@/assets/icon/ArrowDown.svg";

interface FilterProps {
  location: string;
  jobs: string[];
  onChangeJobs?: () => void;
}

export default function Filter({ location, jobs, onChangeJobs }: FilterProps) {
  return (
    <div className="w-full rounded-t-[20px] bg-white p-[16px]">
      <div className="flex">
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
    // </div>
  );
}
