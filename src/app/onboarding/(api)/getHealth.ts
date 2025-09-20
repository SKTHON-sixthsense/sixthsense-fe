import { privateAPI } from "@/shared/api/apiInstance";

export interface Health {
  code: string;
  name: string;
}

const getHealth = async () => {
  return await privateAPI.get(`/health`).then((res) => res.data);
};

export default getHealth;
