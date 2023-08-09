import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { boardKeys } from "../../constants/boardKey";

async function updateBoard(board: FormData, id: number): Promise<void> {
  await axios.patch(`/member/boards/${id}`, board, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

interface UseUpdateBoard {
  mutate: () => void;
}

export function useUpdateBoard(board: FormData, id: number): UseUpdateBoard {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => updateBoard(board, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(boardKeys.all);
    },
  });
  return { mutate };
}
