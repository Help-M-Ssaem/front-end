import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { hotBoardKeys } from "../../constants/boardKey";
import { HotBoardMore } from "../../interfaces/board";

async function getHotBoardMore(
  page: number,
  size: number,
): Promise<HotBoardMore> {
  const { data } = await axios.get(`/boards/hot?page=${page}&size=${size}`);
  return data;
}

interface UseHotBoardMore {
  hotBoardMore?: HotBoardMore;
}

export function useHotBoardMore(page: number, size: number): UseHotBoardMore {
  const { data: hotBoardMore } = useQuery(hotBoardKeys.all, () =>
    getHotBoardMore(page, size),
  );
  return { hotBoardMore };
}
