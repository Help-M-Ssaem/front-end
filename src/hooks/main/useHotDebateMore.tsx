import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { DebateList } from "../../interfaces/debate";
import { hotDebateKeys } from "../../constants/boardKey";

async function getHotDebateMore(
  page: number,
  size: number,
): Promise<DebateList> {
  const { data } = await axios.get(
    `/discussions/hot?page=${page}&size=${size}`,
  );
  return data;
}

interface UseHotDebate {
  hotDebateMore?: DebateList;
}

export function useHotDebateMore(page: number, size: number): UseHotDebate {
  const { data: hotDebateMore } = useQuery(hotDebateKeys.all, () =>
    getHotDebateMore(page, size),
  );
  return { hotDebateMore };
}
