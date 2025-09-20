import { useState } from "react";

export default function SelectHealth() {
  const healths = ["다리", "무릎", "허리", "어깨", "손목", "눈", "귀", "호흡기"];

  const [selectedHealth, setSelectedHealth] = useState<string[]>([]);

  return (
    <div className="flex flex-wrap gap-[10px] px-[16px]">
      {healths.map((health) => (
        <button
          key={health}
          className={`rounded-[10px] px-[24px] py-[12px] text-[24px] font-[500] transition-colors duration-200 ${selectedHealth.includes(health) ? "bg-primary text-white" : "bg-white outline-2 outline-[#e4e4e4]"}`}
          onClick={() => {
            if (selectedHealth.includes(health)) {
              setSelectedHealth(selectedHealth.filter((h) => h !== health));
            } else {
              setSelectedHealth([...selectedHealth, health]);
            }
          }}
        >
          {health}
        </button>
      ))}
    </div>
  );
}
