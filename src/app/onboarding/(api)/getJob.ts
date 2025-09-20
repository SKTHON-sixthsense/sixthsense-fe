import { privateAPI } from "@/shared/api/apiInstance";

const getJob = async (jobField: string) => {
  return await privateAPI.get(`/jobcategories/${jobField}/details`).then((res) => res.data);
};

export default getJob;
