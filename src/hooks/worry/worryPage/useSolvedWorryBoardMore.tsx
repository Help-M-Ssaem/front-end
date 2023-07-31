import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../../apis/axios";
import { worryKeys } from "../../../constants/matchingKey";
import { UseWorryBoard } from "../../../interfaces/worry";

//근데 밑에 훅들이 다 역할을 해서 애는 쓸모가 없어요..
async function getUseWorrySolvedBoardMore(
  page: number,
  size: number,
): Promise<UseWorryBoard> {
  const { data } = await axios.get(`/worry-board/solved?page=${page}&size=${size}`);
  return data;
}

interface UseWorrySolvedBoardMore {
    worrySolvedBoardMore?: UseWorryBoard;
}

export function useWorrySolvedBoardMore(page: number, size: number): UseWorrySolvedBoardMore {
  const { data: worrySolvedBoardMore } = useQuery(worryKeys.solved, () =>
    getUseWorrySolvedBoardMore(page, size),
  );
  return { worrySolvedBoardMore };
}
