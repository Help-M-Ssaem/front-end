import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { worryKeys } from "../../constants/matchingKey";
import { EvaluationProps } from "../../interfaces/chatting";

async function evaluationM(evaluationItem: EvaluationProps): Promise<void> {
  await axios.post(`/member/evaluations`, evaluationItem, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

interface EvaluationM {
  mutate: () => void;
}

export function useCreateEvaluation(
  evaluationItem: EvaluationProps,
): EvaluationM {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => evaluationM(evaluationItem), {
    onSuccess: () => {
      queryClient.invalidateQueries(worryKeys.all);
    },
  });
  return { mutate };
}
