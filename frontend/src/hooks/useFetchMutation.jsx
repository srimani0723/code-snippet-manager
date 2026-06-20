import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "../auth/fetcher";

const useFetchMutation = ({ key, method }, headers) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ url, data = {} }) => fetcher({ url, method, data, headers }),
    onSuccess: () => {
      queryClient.invalidateQueries([key]);
    },
  });
};

export default useFetchMutation;
