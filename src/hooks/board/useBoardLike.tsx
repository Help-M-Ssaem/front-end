import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { boardKeys } from "../../constants/boardKey";

async function boardLike(id: number): Promise<void> {
  await axios.post(`/member/boards/${id}/like`);
}

interface UseBoardLike {
  mutate: () => void;
}

export function useBoardLike(id: number): UseBoardLike {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => boardLike(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(boardKeys.detail(id));
    },
  });
  return { mutate };
}
