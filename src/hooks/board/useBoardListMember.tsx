import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { boardKeys } from "../../constants/boardKey";
import { BoardList } from "../../interfaces/board";

async function getBoardListMember(
  id: number,
  page: number,
  size: number,
): Promise<BoardList> {
  const { data } = await axios.get(
    `/boards/member?memberId=${id}&page=${page}&size=${size}`,
  );
  return data;
}

interface UseBoardListMember {
  boardList?: BoardList;
}

export function useBoardListMember(
  id: number,
  page: number,
  size: number,
): UseBoardListMember {
  const { data: boardList } = useQuery(boardKeys.all, () =>
    getBoardListMember(id, page, size),
  );
  return { boardList };
}
