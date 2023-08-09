import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { boardKeys } from "../../constants/boardKey";
import { EvaluationProps } from "../../interfaces/chatting";

async function evaluationM(evaluations: EvaluationProps): Promise<void> {
  console.log(evaluations);
  await axios.post(`/member/evaluations`, evaluations, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

interface EvaluationM {
  mutate: () => void;
}

export function useCreateEvaluation(evaluations: EvaluationProps): EvaluationM {
  const queryClient = useQueryClient();
  console.log(evaluations);
  const { mutate } = useMutation(() => evaluationM(evaluations), {
    onSuccess: () => {
      queryClient.invalidateQueries(boardKeys.all);
    },
  });
  return { mutate };
}
