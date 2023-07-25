import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { boardKeys } from "../../constants/boardKey";

async function deleteBoard(id: number): Promise<void> {
  await axios.delete(`/member/boards/${id}`);
}

interface UseDeleteBoard {
  mutate: () => void;
}

export function useDeleteBoard(id: number): UseDeleteBoard {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => deleteBoard(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(boardKeys.all);
    },
  });
  return { mutate };
}
