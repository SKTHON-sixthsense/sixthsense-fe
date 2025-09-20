interface ChipProps {
  title: string;
}

const Chip = ({ title }: ChipProps) => {
  return (
    <div className="inline-flex items-center justify-center rounded-[10px] border border-[#A2A2E1] bg-[#F4F4FB] px-[20px] py-[10px]">
      <span className="text-[18px] font-[500] text-[#7373B5]">{title}</span>
    </div>
  );
};

export default Chip;
