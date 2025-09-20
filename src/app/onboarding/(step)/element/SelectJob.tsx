import ItemBlock from "../../(component)/ItemBlock";
import { useQuery } from "@tanstack/react-query";
import getJob from "../../(api)/getJob";
import { BaseResponse } from "@/shared/api/BaseResponse";
import useOnboardingStore from "../../(store)/OnboardingStore";

export default function SelectJob() {
  const { data: jobs } = useQuery<BaseResponse<string[]>>({
    queryKey: ["onboarding", "jobs"],
    queryFn: () => getJob(data.jobField),
  });
  const { data, setData } = useOnboardingStore();

  return (
    <div className="flex flex-col gap-[10px] px-[16px]">
      {jobs?.data?.map((job) => (
        <ItemBlock
          key={job}
          name={job}
          selected={data.job.includes(job)}
          onClick={() => {
            setData({ job: [...data.job, job] });
          }}
        />
      ))}
    </div>
  );
}
