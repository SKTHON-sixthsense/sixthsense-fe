import { useMutation, useQueryClient } from "@tanstack/react-query";
import postIntroduction from "../(api)/postIntroduction";

const usePostIntroduction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ image }: { image: File }) => postIntroduction({ image }),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["my", "introduction"] });
    },
  });
};

export default usePostIntroduction;
