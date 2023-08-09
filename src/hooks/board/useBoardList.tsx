import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { boardKeys } from "../../constants/boardKey";
import { BoardList } from "../../interfaces/board";

export async function getBoardList(
  page: number,
  size: number,
  boardId?: number,
): Promise<BoardList> {
  let url = `/boards?page=${page}&size=${size}`;
  boardId && (url += `&boardId=${boardId}`);

  const { data } = await axios.get(url);
  return data;
}

interface UseBoardList {
  boardList?: BoardList;
}

export function useBoardList(
  page: number,
  size: number,
  boardId?: number,
): UseBoardList {
  const { data: boardList } = useQuery(boardKeys.all, () =>
    getBoardList(page, size, boardId),
  );
  return { boardList };
}
