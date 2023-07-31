import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { boardKeys } from "../../constants/boardKey";

async function updateWorry(board: FormData, id: number): Promise<void> {
  await axios.patch(`/member/worry-board/${id}`, board, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

interface UseUpdateWorry {
  mutate: () => void;
}

export function useUpdateWorry(board: FormData, id: number): UseUpdateWorry {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => updateWorry(board, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(boardKeys.all);
    },
  });
  return { mutate };
}
