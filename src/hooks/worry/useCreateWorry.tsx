import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { worryKeys } from "../../constants/matchingKey";

async function createBoard(board: FormData): Promise<void> {
  console.log(board);
  await axios.post(`/member/worry-board`, board, {
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
      queryClient.invalidateQueries(worryKeys.all);
    },
  });
  return { mutate };
}