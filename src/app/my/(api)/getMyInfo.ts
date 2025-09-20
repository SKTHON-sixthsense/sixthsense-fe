import { privateAPI } from "@/shared/api/apiInstance";

export interface MyInfo {
  id: number;
  username: string;
  name: string;
  role: "WORKER" | "EMPLOYER";
  birthDate: string;
  age: number;
  gender: "MALE" | "FEMALE";
  phone: string;
  personality: {
    code: string;
    name: string;
  }[];
  health: {
    code: string;
    name: string;
  }[];
  firstTime: boolean;
}

const getMyInfo = async () => {
  return await privateAPI.get("/users/detail").then((res) => res.data);
};

export default getMyInfo;
