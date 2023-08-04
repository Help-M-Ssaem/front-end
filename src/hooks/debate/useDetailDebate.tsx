import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { debateKeys } from "../../constants/debateKey";
import { DebateDetail } from "../../interfaces/debate";

export async function getDebateDetail(id: number): Promise<DebateDetail> {
  const { data } = await axios.get(`/discussions/${id}`);
  return data;
}

interface UseDebateDetail {
    debate?: DebateDetail;
}

export function useDebateDetail(id: number): UseDebateDetail {
  const { data: debate } = useQuery(debateKeys.detail(id), () =>
    getDebateDetail(id),
  );
  return { debate };
}