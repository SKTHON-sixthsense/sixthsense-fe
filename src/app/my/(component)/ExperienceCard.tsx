interface ExperienceCardProps {
  location: string;
  role: string;
}

interface OnGoing {
  onGoing: boolean;
}

interface Period {
  period: string;
}

const ExperienceCard = (props: ExperienceCardProps & (OnGoing | Period)) => {
  const { location, role } = props;

  return (
    <div className="flex items-stretch justify-between rounded-[10px] bg-[#F4F4FB]">
      <div className="flex flex-col gap-[10px] p-[20px]">
        <span className="text-[20px] font-[500]">{location}</span>
        <span className="text-[18px] font-[500] text-[#87659C]">
          {"period" in props ? props.period : "onGoing" in props ? "재직중" : "퇴사"}
        </span>
        <span className="text-[18px] font-[500] text-[#686868]">{role}</span>
      </div>

      {/* 삭제 */}
      <button className="border-l border-l-[#DEDAE1] px-[20px] text-[20px] font-[400] text-[#919191]">
        삭제
      </button>
    </div>
  );
};

export default ExperienceCard;
