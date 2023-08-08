import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { worryKeys } from "../../constants/matchingKey";
import { WorryList } from "../../interfaces/worry";

async function getWorryPostListMember(
  id: number,
  page: number,
  size: number,
): Promise<WorryList> {
  const { data } = await axios.get(
    `/worry-board/post-list?memberId=${id}&page=${page}&size=${size}`,
  );
  return data;
}

interface UseWorryListMember {
  worryPostList?: WorryList;
}

export function useWorryPostListMember(
  id: number,
  page: number,
  size: number,
): UseWorryListMember {
  const { data: worryPostList } = useQuery(worryKeys.all, () =>
    getWorryPostListMember(id, page, size),
  );
  return { worryPostList };
}
