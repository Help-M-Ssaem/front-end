import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";

async function postSearch(keyWord: string) {
  await axios.post("/keywords", { keyword: keyWord });
}

interface UseSearchWord {
  mutate: () => void;
}

export function useSearch(keyWord: string): UseSearchWord {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => postSearch(keyWord), {
    onSuccess: () => {
      queryClient.invalidateQueries("recentkeyWordKeys");
    },
  });

  return { mutate };
}
