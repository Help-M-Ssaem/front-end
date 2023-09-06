import { mssaemAxios as axios } from "../../apis/axios";
import { UseWorryBoard } from "../../interfaces/worry";
import { useQuery } from "react-query";
import { worryKeys } from "../../constants/matchingKey";

export function useFetchWorryBoardList(mbti1: string, mbti2: string, path: string, page: number, postId: number) {
  const worryQueryKey = path === "waiting" ? worryKeys.all : worryKeys.solved;
  const { data: worryBoardList, refetch } = useQuery<UseWorryBoard>(
    worryQueryKey,
    async () => {
      const { data } = await axios.get(
        `/worry-board/${path === "waiting" ? "waiting":"solved"}/filter?worryBoardId=${postId}&page=${page}&size=${6}&strFromMbti=${mbti1}&strToMbti=${mbti2}`
      );
      return data;
    }
  );
  return { worryBoardList, refetch };
}