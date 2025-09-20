import { privateAPI } from "@/shared/api/apiInstance";

export interface Career {
  id: number;
  companyName: string;
  startDate: string;
  endDate: string;
  current: boolean;
  createdAt: string;
  task: string;
}

const getCareer = async () => {
  return await privateAPI.get("/careers/users/1/careers").then((res) => res.data);
};

export default getCareer;
