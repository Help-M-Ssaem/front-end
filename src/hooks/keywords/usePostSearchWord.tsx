import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";

async function postSerch(keyWord: string) {
  await axios.post("/keywords", { keyword: keyWord });
}

interface UseSerchWord {
  mutate: () => void;
}

export function useSerch(keyWord: string): UseSerchWord {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => postSerch(keyWord), {
    onSuccess: () => {
      queryClient.invalidateQueries("keyWordKeys");
    },
  });

  return { mutate };
}
