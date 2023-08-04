import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { debateKeys } from "../../constants/debateKey";
import { DebateList } from "../../interfaces/debate";

export async function getDebateList(
  page: number,
  size: number,
): Promise<DebateList> {
  const { data } = await axios.get(`/discussions?page=${page}&size=${size}`);
  return data;
}

interface UseDebateList {
  debateList?: DebateList;
}

export function useDebateList(page: number, size: number): UseDebateList {
  const { data: debateList } = useQuery(debateKeys.all, () =>
    getDebateList(page, size),
  );
  return { debateList };
}
