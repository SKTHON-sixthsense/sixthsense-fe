import { privateAPI } from "@/shared/api/apiInstance";

interface PostIntroductionRequest {
  image: File;
}

const postIntroduction = async ({ image }: PostIntroductionRequest) => {
  const formData = new FormData();

  formData.append("image", image);

  return await privateAPI.post("/introduction/{userId}?userId=1", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default postIntroduction;
