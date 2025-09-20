import LocationGray from "../../assets/icon/LocationGray.svg";
import TimeGray from "../../assets/icon/TimeGray.svg";

interface CardProps {
  title: string;
  store: string;
  location: string;
  date: string;
  time: string;
  pay: number;
}

export default function EmployCard({ title, store, location, date, time, pay }: CardProps) {
  return (
    <div className="rounded-[20px] bg-[#FFF] p-[18px] text-[18px] font-[500]">
      <p className="text-[28px] font-[600]">{title}</p>
      <p className="text-[20px] font-[500] text-[#686868]">{store}</p>
      <div className="mt-[10px] flex items-center gap-[9px] font-[400] text-[#686868]">
        <LocationGray />
        <span>{location}</span>
      </div>
      <div className="mt-[2px] flex items-center gap-[9px] font-[400] text-[#686868]">
        <TimeGray />
        <span>{date}</span>
        <span>{time}</span>
      </div>
      <div className="mt-[15px] flex items-center justify-between rounded-[10px] bg-[#F4F4FB] pt-[10px] pr-[14px] pb-[10px] pl-[14px]">
        <span>시급</span>
        <div>
          <span className="text-[30px] font-[600]">{pay}</span>
          <span className="ml-[3px] text-[24px] font-[500]">원</span>
        </div>
      </div>
    </div>
  );
}
