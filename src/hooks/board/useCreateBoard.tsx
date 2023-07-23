import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { boardKeys } from "../../constants/boardKey";

async function createBoard(board: FormData): Promise<void> {
  await axios.post(`/member/board`, board, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

interface UseCreateBoard {
  mutate: () => void;
}

export function useCreateBoard(board: FormData): UseCreateBoard {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => createBoard(board), {
    onSuccess: () => {
      queryClient.invalidateQueries(boardKeys.all);
    },
  });
  return { mutate };
}
