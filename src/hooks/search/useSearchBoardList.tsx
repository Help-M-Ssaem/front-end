import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { boardKeys } from "../../constants/boardKey";
import { BoardList } from "../../interfaces/board";

export async function getBoardSearchList(
  strMbti: string,
  page: number,
  size: number,
): Promise<BoardList> {
  const { data } = await axios.get(
    `/boards/search?strMbti=${strMbti}&page=${page}&size=${size}`,
  );
  return data;
}

interface UseBoardSearch {
  searchBoardList?: BoardList;
}

export function useSearchBoardList(
  strMbti: string,
  page: number,
  size: number,
): UseBoardSearch {
  const { data: searchBoardList } = useQuery(boardKeys.all, () =>
    getBoardSearchList(strMbti, page, size),
  );
  return { searchBoardList };
}
