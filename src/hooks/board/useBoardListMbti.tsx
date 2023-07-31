import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { boardKeys } from "../../constants/boardKey";
import { BoardList } from "../../interfaces/board";

export async function getBoardListMbti(
  mbti: string,
  page: number,
  size: number,
): Promise<BoardList> {
  const { data } = await axios.get(
    `/boards/mbti?mbti=${mbti}&page=${page}&size=${size}`,
  );
  return data;
}

interface UseBoardList {
  boardListMbti?: BoardList;
}

export function useBoardListMbti(
  mbti: string,
  page: number,
  size: number,
): UseBoardList {
  const { data: boardListMbti } = useQuery(boardKeys.all, () =>
    getBoardListMbti(mbti, page, size),
  );
  return { boardListMbti };
}
