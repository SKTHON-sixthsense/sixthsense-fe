import { useMutation } from "@tanstack/react-query";
import searchJobPosting, { SearchJobPostingRequest } from "../(api)/searchJobPosting";

const useSearchJobPosting = () => {
  return useMutation({
    mutationFn: (data: SearchJobPostingRequest) => searchJobPosting(data),
  });
};

export default useSearchJobPosting;
