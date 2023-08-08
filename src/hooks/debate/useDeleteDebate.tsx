import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { debateKeys } from "../../constants/debateKey";

async function deleteDebate(id: number): Promise<void> {
  await axios.delete(`/member/discussion/${id}`);
}
interface UseDeleteDebate {
  mutate: () => void;
}

export function useDeleteDebate(id: number): UseDeleteDebate {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => deleteDebate(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(debateKeys.all);
    },
  });
  return { mutate };
}
