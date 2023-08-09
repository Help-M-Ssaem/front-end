import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";

async function useevaluationM() {
  const { data } = await axios.get(`/member/evaluations/count`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
}

export function UseEvaluation() {
  const { data: evaluations } = useQuery("evaluations", useevaluationM);
  return { ...evaluations };
}
