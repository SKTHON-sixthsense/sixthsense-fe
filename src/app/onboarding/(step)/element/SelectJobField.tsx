import ItemBlock from "../../(component)/ItemBlock";
import { useQuery } from "@tanstack/react-query";
import getJobField from "../../(api)/getJobField";
import { BaseResponse } from "@/shared/api/BaseResponse";
import useOnboardingStore from "../../(store)/OnboardingStore";

export default function SelectJobField() {
  const { data: jobs } = useQuery<BaseResponse<string[]>>({
    queryKey: ["onboarding", "jobs"],
    queryFn: getJobField,
  });

  const { data, setData } = useOnboardingStore();

  return (
    <div className="flex flex-col gap-[10px] px-[16px] pb-[90px]">
      {jobs?.data?.map((job) => (
        <ItemBlock
          key={job}
          name={job}
          selected={data.jobField === job}
          onClick={() => {
            setData({ jobField: job });
          }}
        />
      ))}
    </div>
  );
}
