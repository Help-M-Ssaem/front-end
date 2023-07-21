import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { boardKeys } from "../../constants/boardKey";

async function getHotBoard(): Promise<void> {
  const { data } = await axios.get("/boards/home");
  return data;
}

interface UseHotBoard {
  hotBoard?: any;
}

export function useHotBoard(): UseHotBoard {
  const { data: hotBoard } = useQuery(boardKeys.all, () => getHotBoard());
  return { hotBoard };
}
