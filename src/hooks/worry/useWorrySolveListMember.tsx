import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { worryKeys } from "../../constants/matchingKey";
import { WorryList } from "../../interfaces/worry"

async function getWorrySolveListMember(
  id: number,
  page: number,
  size: number,
): Promise<WorryList> {
  const { data } = await axios.get(
    `/worry-board/solve-list?memberId=${id}&page=${page}&size=${size}`
  );
  return data;
}

interface UseWorrySolveListMember {
    worrySolveList?: WorryList;
}

export function useWorrySolveListMember(
  id: number,
  page: number,
  size: number,
): UseWorrySolveListMember {
  const { data:  worrySolveList } = useQuery(worryKeys.solved, () =>
    getWorrySolveListMember(id, page, size),
  );
  return { worrySolveList };
}
