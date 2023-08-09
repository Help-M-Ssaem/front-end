import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";

import { MainMatching } from "../../interfaces/matching";
import { worryBoardKeys } from "../../constants/boardKey";

async function getWorry(page: number, size: number): Promise<MainMatching[]> {
  const { data } = await axios.get(
    `/worry-board/wating?page=${page}&size=${size}`,
  );
  console.log(data);
  return data;
}

interface GetWorryBoard {
  getworryBoard?: MainMatching[];
}

export function GetWorryBoard(page: number, size: number): GetWorryBoard {
  const { data: getworryBoard } = useQuery(worryBoardKeys.all, () =>
    getWorry(page, size),
  );
  return { getworryBoard };
}
