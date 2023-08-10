import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { debateKeys } from "../../constants/debateKey";

async function createDebate(debate: FormData): Promise<void> {
  await axios.post(`/member/discussion`, debate, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

interface UseCreateDebate {
  mutate: () => void;
}

export function useCreateDebate(debate: FormData): UseCreateDebate {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => createDebate(debate), {
    onSuccess: () => {
      queryClient.invalidateQueries(debateKeys.all);
    },
  });
  return { mutate };
}
