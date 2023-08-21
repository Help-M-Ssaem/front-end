import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { WorryList } from "../../interfaces/worry";
import { SearchKeys } from "../../constants/searchKey";

export async function getSearchWaitingWorryList(
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

interface UseSearchWaitingWorryList {
  searchWaitingWorryList?: WorryList;
}

export function useSearchWaitingWorryList(
  searchType: number,
  keyword: string,
  strFromMbti: string,
  strToMbti: string,
  page: number,
  size: number,
): UseSearchWaitingWorryList {
  const { data: searchWaitingWorryList } = useQuery(SearchKeys.all, () =>
    getSearchWaitingWorryList(
      searchType,
      keyword,
      strFromMbti,
      strToMbti,
      page,
      size,
    ),
  );
  return { searchWaitingWorryList };
}
