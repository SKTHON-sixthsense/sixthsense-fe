import { privateAPI } from "@/shared/api/apiInstance";

const getRegions = async () => {
  return await privateAPI.get("/search/districts").then((res) => res.data);
};

export default getRegions;
