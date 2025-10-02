import { privateAPI } from "@/shared/api/apiInstance";

const testLogin = async () => {
  const response = await privateAPI.post("/auth/login/test/worker");

  return response.data;
};

export default testLogin;
