import CheckPurple from "@/assets/icon/CheckPurple.svg";

interface ItemBlockProps {
  name: string;
  selected: boolean;
  onClick?: () => void;
}

const ItemBlock = ({ name, selected, onClick }: ItemBlockProps) => {
  return (
    <div
      className={`flex items-center justify-between rounded-[10px] border-2 p-[20px] transition-colors duration-200 ${
        selected ? "border-[#D6BFF5] bg-[#F7F4FB]" : "border-[#E4E4E4]"
      }`}
      onClick={onClick}
    >
      <span
        className={`text-[24px] font-[500] transition-colors duration-200 ${selected ? "text-primary" : ""}`}
      >
        {name}
      </span>
      {selected && <CheckPurple />}
    </div>
  );
};

export default ItemBlock;
