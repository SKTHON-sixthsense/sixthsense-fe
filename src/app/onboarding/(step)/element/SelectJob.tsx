import { useState } from "react";
import ItemBlock from "../../(component)/ItemBlock";

export default function SelectJob() {
  const jobs = [
    {
      id: 1,
      name: "경비 및 보안",
    },
    {
      id: 2,
      name: "주차관리 및 안내",
    },
    {
      id: 3,
      name: "청소 및 미화",
    },
    {
      id: 4,
      name: "매장 관리",
    },
  ];

  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-[10px] px-[16px]">
      {jobs.map((job) => (
        <ItemBlock
          key={job.id}
          name={job.name}
          selected={selectedJob === job.id}
          onClick={() => {
            setSelectedJob(job.id);
          }}
        />
      ))}
    </div>
  );
}
