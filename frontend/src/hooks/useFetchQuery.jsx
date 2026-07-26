import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../auth/fetcher";

const useFetchQuery = ({ key, url, method = "GET", ...options }, headers) => {
  return useQuery({
    queryKey: [key],
    queryFn: () => fetcher({ url, method, headers }),
    retry: 1,
    select: (data) => {
      return data;
    },
    ...options,
  });
};

export default useFetchQuery;
