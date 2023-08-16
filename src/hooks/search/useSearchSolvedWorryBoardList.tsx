import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { debateKeys } from "../../constants/debateKey";
import { DebateList } from "../../interfaces/debate";

export async function getSearchSolvedWorryBoard(
  searchType: number,
  keyword: string,
  strFromMbti: string,
  strToMbti: string,
  page: number,
  size: number,
): Promise<DebateList> {
  const { data } = await axios.get(
    `/worry-board/solved/search?searchType=${searchType}&keyword=${keyword}&strFromMbti=${strFromMbti}&strToMbti=${strToMbti}&page=${page}&size=${size}`,
  );
  return data;
}

interface UseBoardSearch {
  searchSolvedWorryBoardList?: DebateList;
}

export function useSearchBoardList(
  searchType: number,
  keyword: string,
  strFromMbti: string,
  strToMbti: string,
  page: number,
  size: number,
): UseBoardSearch {
  const { data: searchSolvedWorryBoardList } = useQuery(debateKeys.all, () =>
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
