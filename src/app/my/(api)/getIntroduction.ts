import { privateAPI } from "@/shared/api/apiInstance";

export interface IntroductionResponse {
  id: number;
  s3Url: string;
  imageName: string;
  description: string;
  imageFormat: string;
  inferResult: string;
  userId: number;
}
const getIntroduction = async () => {
  return await privateAPI.get("/introduction").then((res) => res.data);
};

export default getIntroduction;
