import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { boardKeys } from "../../constants/boardKey";
import { BoardList } from "../../interfaces/board";

export async function getBoardList(
  page: number,
  size: number,
): Promise<BoardList> {
  const { data } = await axios.get(`/boards?page=${page}&size=${size}`);
  return data;
}

interface UseBoardList {
  boardListAll?: BoardList;
}

export function useBoardList(page: number, size: number): UseBoardList {
  const { data: boardListAll } = useQuery(boardKeys.all, () =>
    getBoardList(page, size),
  );
  return { boardListAll };
}
