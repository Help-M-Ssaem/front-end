import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { boardKeys } from "../../constants/boardKey";
import { BoardList } from "../../interfaces/board";

async function getBoardList(page: number, size: number): Promise<BoardList> {
  const { data } = await axios.get(`/boards?page=${page}&size=${size}`);
  return data;
}

interface UseBoardList {
  boardList?: BoardList;
}

export function useBoardList(page: number, size: number): UseBoardList {
  const { data: boardList } = useQuery(boardKeys.all, () =>
    getBoardList(page, size),
  );
  return { boardList };
}