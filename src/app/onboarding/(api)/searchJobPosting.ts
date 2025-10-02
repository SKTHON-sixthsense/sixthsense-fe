import { privateAPI } from "@/shared/api/apiInstance";

export interface SearchJobPostingRequest {
  district: string;
  jobCategories: [string];
  detailedJobCategories: string[];
}

const searchJobPosting = async ({
  district,
  jobCategories,
  detailedJobCategories,
}: SearchJobPostingRequest) => {
  const response = await privateAPI.post("/search/jobpostings", {
    district,
    jobCategories,
    detailedJobCategories,
  });

  return response.data;
};

export default searchJobPosting;
