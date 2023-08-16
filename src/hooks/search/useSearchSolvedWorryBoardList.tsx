import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { WorryList } from "../../interfaces/worry";
import { SearchKeys } from "../../constants/searchKey";

export async function getSearchSolvedWorryBoard(
  searchType: number,
  keyword: string,
  strFromMbti: string,
  strToMbti: string,
  page: number,
  size: number,
): Promise<WorryList> {
  const { data } = await axios.get(
    `/worry-board/solved/search?searchType=${searchType}&keyword=${keyword}&strFromMbti=${strFromMbti}&strToMbti=${strToMbti}&page=${page}&size=${size}`,
  );
  return data;
}

interface UseBoardSearch {
  searchSolvedWorryBoardList?: WorryList;
}

export function useSearchBoardList(
  searchType: number,
  keyword: string,
  strFromMbti: string,
  strToMbti: string,
  page: number,
  size: number,
): UseBoardSearch {
  const { data: searchSolvedWorryBoardList } = useQuery(SearchKeys.all, () =>
    getSearchSolvedWorryBoard(
      searchType,
      keyword,
      strFromMbti,
      strToMbti,
      page,
      size,
    ),
  );
  return { searchSolvedWorryBoardList };
}
