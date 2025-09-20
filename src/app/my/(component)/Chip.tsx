interface ChipProps {
  title: string;
  onDelete?: () => void;
}

const Chip = ({ title, onDelete }: ChipProps) => {
  return (
    <div className="inline-flex items-center justify-center gap-[24px] rounded-[10px] border border-[#A2A2E1] bg-[#F4F4FB] px-[20px] py-[10px]">
      <span className="text-[18px] font-[500] text-[#7373B5]">{title}</span>
      {onDelete && (
        <button onClick={onDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6.75 6.65381L18 17.9038"
              stroke="#919191"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M18 6.65381L6.75003 17.9038"
              stroke="#919191"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Chip;
