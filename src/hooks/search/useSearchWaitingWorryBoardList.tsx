import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { WorryList } from "../../interfaces/worry";
import { SearchKeys } from "../../constants/searchKey";

export async function getSearchWaitingWorryBoardList(
  searchType: number,
  keyword: string,
  strFromMbti: string,
  strToMbti: string,
  page: number,
  size: number,
): Promise<WorryList> {
  const { data } = await axios.get(
    `/worry-board/waiting/search?searchType=${searchType}&keyword=${keyword}&strFromMbti=${strFromMbti}&strToMbti=${strToMbti}&page=${page}&size=${size}`,
  );
  return data;
}

interface UseSearchWaitingWorryBoardList {
  searchWaitingWorryBoardList?: WorryList;
}

export function useSearchWaitingWorryBoardList(
  searchType: number,
  keyword: string,
  strFromMbti: string,
  strToMbti: string,
  page: number,
  size: number,
): UseSearchWaitingWorryBoardList {
  const { data: searchWaitingWorryBoardList } = useQuery(SearchKeys.all, () =>
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
