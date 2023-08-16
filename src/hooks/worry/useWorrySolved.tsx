import { useMutation, useQuery, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { worryKeys } from "../../constants/matchingKey";
import { MsseamProps } from "../../interfaces/chatting";

async function getSolved(id: number): Promise<MsseamProps> {
  const { data } = await axios.patch(`/member/worry-board/${id}/solved`, {
    worrySolverId: id,
  });
  console.log(data);
  return data;
}

interface UseSolveWorry {
  solveProfile?: MsseamProps;
}

export function useSolveWorry(id: number): UseSolveWorry {
  const { data: solveProfile } = useQuery(worryKeys.solved, () =>
    getSolved(id),
  );

  return { solveProfile };
}
