import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { debateKeys } from "../../constants/debateKey";
import { DebateList } from "../../interfaces/debate";

async function getDebateListMember(
  id: number,
  page: number,
  size: number,
): Promise<DebateList> {
  const { data } = await axios.get(
    `/discussion/post-list?memberId=${id}&page=${page}&size=${size}`,
  );
  return data;
}

interface UseDebateListMember {
  debateList?: DebateList;
}

export function useDebateListMember(
  id: number,
  page: number,
  size: number,
): UseDebateListMember {
  const { data: debateList } = useQuery(debateKeys.all, () =>
    getDebateListMember(id, page, size),
  );
  return { debateList };
}
