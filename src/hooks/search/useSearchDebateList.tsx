import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { SearchKeys } from "../../constants/searchKey";
import { DebateList } from "../../interfaces/debate";

export async function getSearchDebateList(
  searchType: number,
  keyword: string,
  page: number,
  size: number,
): Promise<DebateList> {
  const { data } = await axios.get(
    `/discussions/search?searchType=${searchType}&keyword=${keyword}&page=${page}&size=${size}`,
  );
  return data;
}

interface UseSearchDebateList {
  searchDebateList?: DebateList;
}

export function useSearchBoardList(
  searchType: number,
  keyword: string,
  page: number,
  size: number,
): UseSearchDebateList {
  const { data: searchDebateList } = useQuery(SearchKeys.all, () =>
    getSearchDebateList(searchType, keyword, page, size),
  );
  return { searchDebateList };
}
