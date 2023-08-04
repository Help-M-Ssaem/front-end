import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { worryKeys } from "../../constants/matchingKey";

//405 error 수정값이 반영이 안돼...

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
      queryClient.invalidateQueries(worryKeys.all);
    },
  });
  return { mutate };
}