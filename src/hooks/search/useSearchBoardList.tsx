import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { boardKeys } from "../../constants/boardKey";
import { BoardList } from "../../interfaces/board";

export async function getBoardSearchList(
  searchType: number,
  keyword: string,
  strMbti: string,
  page: number,
  size: number,
): Promise<BoardList> {
  const { data } = await axios.get(
    `/boards/search?searchType=${searchType}&keyword=${keyword}&strMbti=${strMbti}&page=${page}&size=${size}`,
  );
  return data;
}

interface UseBoardSearch {
  searchBoardList?: BoardList;
}

export function useSearchBoardList(
  searchType: number,
  keyword: string,
  strMbti: string,
  page: number,
  size: number,
): UseBoardSearch {
  const { data: searchBoardList } = useQuery(boardKeys.all, () =>
    getBoardSearchList(searchType, keyword, strMbti, page, size),
  );
  return { searchBoardList };
}
