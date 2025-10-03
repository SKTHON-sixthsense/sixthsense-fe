import { BaseResponse } from "@/shared/api/BaseResponse";
import { useQuery } from "@tanstack/react-query";
import getHealth, { Health } from "../../(api)/getHealth";
import useOnboardingStore from "../../(store)/OnboardingStore";

export default function SelectHealth() {
  const { data: healths } = useQuery<BaseResponse<Health[]>>({
    queryKey: ["onboarding", "health"],
    queryFn: getHealth,
  });

  const { data, setData } = useOnboardingStore();

  return (
    <div className="flex flex-wrap gap-[10px] px-[16px]">
      {healths?.data?.map((health) => (
        <button
          key={health.code}
          className={`rounded-[10px] px-[24px] py-[12px] text-[24px] font-[500] transition-colors duration-200 ${data.health.includes(health.code) ? "bg-primary text-white" : "bg-white outline-2 outline-[#e4e4e4]"}`}
          onClick={() => {
            if (data.health.includes(health.code)) {
              setData({ health: data.health.filter((h) => h !== health.code) });
            } else {
              setData({ health: [...data.health, health.code] });
            }
          }}
        >
          {health.name}
        </button>
      ))}
    </div>
  );
}
