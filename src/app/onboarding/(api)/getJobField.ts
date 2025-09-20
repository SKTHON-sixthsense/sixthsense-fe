import { privateAPI } from "@/shared/api/apiInstance";

const getJobField = async () => {
  return await privateAPI.get("/jobcategories").then((res) => res.data);
};

export default getJobField;
