import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { debateKeys } from "../../constants/debateKey";

async function updateDebate(debate: FormData, id: number): Promise<void> {
  await axios.patch(`/member/debate/${id}`, debate, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

interface UseUpdateDebate {
  mutate: () => void;
}

export function useUpdateDebate(debate: FormData, id: number): UseUpdateDebate {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => updateDebate(debate, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(debateKeys.all);
    },
  });
  return { mutate };
}
