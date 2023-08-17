import { useEffect, useState } from "react";
import { mssaemAxios as axios } from "../../apis/axios";
import { UseWorryBoard } from "../../interfaces/worry";
import { useQueryClient, useQuery } from "react-query";
import { worryKeys } from "../../constants/matchingKey";

export function useFetchWorryBoardList (mbti1: string, mbti2: string, path: string, page: number, postId: number) {
  const [worryBoardList, setWorryBoardList] = useState<UseWorryBoard>();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (mbti1 === "전체" && mbti2 === "전체") {
      axios.get(`/worry-board/${path}/filter?worryBoardId=${postId}&page=${page}&size=${6}&strFromMbti=ALL&strToMbti=ALL`).then((res) => {
        setWorryBoardList(res.data);
        queryClient.setQueryData(worryKeys.all, res.data);
      });
    } else if (mbti1 !== "전체" && mbti2 === "전체"){
      axios
        .get(`/worry-board/${path}/filter?worryBoardId=${postId}&page=${page}&size=${10}&strFromMbti=${mbti1}&strToMbti=ALL`)
        .then((res) => {
          setWorryBoardList(res.data);
          queryClient.setQueryData(worryKeys.all, res.data);
        })
    } else if (mbti1 === "전체" && mbti2 !== "전체"){
        axios
          .get(`/worry-board/${path}/filter?worryBoardId=${postId}&page=${page}&size=${10}&strFromMbti=ALL&strToMbti=${mbti2}`)
          .then((res) => {
            setWorryBoardList(res.data);
            queryClient.setQueryData(worryKeys.all, res.data);
          })
    
      } else {
        axios
          .get(`/worry-board/${path}/filter?worryBoardId=${postId}&page=${page}&size=${10}&strFromMbti=${mbti1}&strToMbti=${mbti2}`)
          .then((res) => {
            setWorryBoardList(res.data);
            queryClient.setQueryData(worryKeys.all, res.data);
          })
      }
  }, [mbti1, mbti2, path, page, queryClient, postId]);

  return worryBoardList;
};

export default useFetchWorryBoardList;
