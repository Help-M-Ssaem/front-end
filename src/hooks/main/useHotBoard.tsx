import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { hotBoardKeys } from "../../constants/boardKey";
import { HotBoard } from "../../interfaces/board";

async function getHotBoard(): Promise<HotBoard[]> {
  const { data } = await axios.get("/boards/home");
  return data;
}

interface UseHotBoard {
  hotBoard?: HotBoard[];
}

export function useHotBoard(): UseHotBoard {
  const { data: hotBoard } = useQuery(hotBoardKeys.all, () => getHotBoard());
  return { hotBoard };
}
