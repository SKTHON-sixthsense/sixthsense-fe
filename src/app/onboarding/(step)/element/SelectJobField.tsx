import { useState } from "react";
import ItemBlock from "../../(component)/ItemBlock";

export default function SelectJobField() {
  const jobs = [
    {
      id: 1,
      name: "시설관리 및 운영",
    },
    {
      id: 2,
      name: "요식업",
    },
    {
      id: 3,
      name: "운전 및 배송",
    },
    {
      id: 4,
      name: "판매직",
    },
    {
      id: 5,
      name: "가사 및 돌봄",
    },
    {
      id: 6,
      name: "일용직",
    },
  ];

  const [selectedJobField, setSelectedJob] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-[10px] px-[16px]">
      {jobs.map((job) => (
        <ItemBlock
          key={job.id}
          name={job.name}
          selected={selectedJobField === job.id}
          onClick={() => {
            setSelectedJob(job.id);
          }}
        />
      ))}
    </div>
  );
}
