import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { debateKeys } from "../../constants/debateKey";
import { DebateList } from "../../interfaces/debate";

export async function getSearchWaitingWorryBoardList(
  searchType: number,
  keyword: string,
  strFromMbti: string,
  strToMbti: string,
  page: number,
  size: number,
): Promise<DebateList> {
  const { data } = await axios.get(
    `/worry-board/waiting/search?searchType=${searchType}&keyword=${keyword}&strFromMbti=${strFromMbti}&strToMbti=${strToMbti}&page=${page}&size=${size}`,
  );
  return data;
}

interface UseSearchWaitingWorryBoardList {
  searchWaitingWorryBoardList?: DebateList;
}

export function useSearchWaitingWorryBoardList(
  searchType: number,
  keyword: string,
  strFromMbti: string,
  strToMbti: string,
  page: number,
  size: number,
): UseSearchWaitingWorryBoardList {
  const { data: searchWaitingWorryBoardList } = useQuery(debateKeys.all, () =>
    getSearchWaitingWorryBoardList(
      searchType,
      keyword,
      strFromMbti,
      strToMbti,
      page,
      size,
    ),
  );
  return { searchWaitingWorryBoardList };
}
