import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { boardKeys } from "../../constants/boardKey";
import { SearchBoardList } from "../../interfaces/moresearch";

export async function getSearchBoardList(
  searchType: number,
  keyword: string,
  strMbti: string,
  page: number,
  size: number,
): Promise<SearchBoardList> {
  const { data } = await axios.get(
    `/boards/search?searchType=${searchType}&keyword=${keyword}&strMbti=${strMbti}&page=${page}&size=${size}`,
  );
  return data;
}

interface UseSearchBoard {
  searchBoardList?: SearchBoardList;
}

export function useSearchBoardList(
  searchType: number,
  keyword: string,
  strMbti: string,
  page: number,
  size: number,
): UseSearchBoard {
  const { data: searchBoardList } = useQuery(boardKeys.all, () =>
    getSearchBoardList(searchType, keyword, strMbti, page, size),
  );
  return { searchBoardList };
}
