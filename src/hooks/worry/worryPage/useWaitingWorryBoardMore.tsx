import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../../apis/axios";
import { worryKeys } from "../../../constants/matchingKey";
import { UseWorryBoard } from "../../../interfaces/worry";

//근데 밑에 훅들이 다 역할을 해서 애는 쓸모가 없어요..
async function getUseWorryWitingBoardMore(
  page: number,
  size: number,
): Promise<UseWorryBoard> {
  const { data } = await axios.get(`/worry-board/waiting?page=${page}&size=${size}`);
  return data;
}

interface UseWorryWitingBoardMore {
    worryWitingBoardMore?: UseWorryBoard;
}

export function useWorryWitingBoardMore(page: number, size: number): UseWorryWitingBoardMore {
  const { data: worryWitingBoardMore } = useQuery(worryKeys.witing, () =>
    getUseWorryWitingBoardMore(page, size),
  );
  return { worryWitingBoardMore };
}
