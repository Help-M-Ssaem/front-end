import { useEffect, useState } from "react";
import { mssaemAxios as axios } from "../../apis/axios";
import { UseWorryBoard } from "../../interfaces/worry";

const useFetchWorryBoardList = (mbti1: string, mbti2: string, path: string) => {
  const [worryBoardList, setWorryBoardList] = useState<UseWorryBoard>();

  useEffect(() => {
    if (mbti1 === "전체" && mbti2 === "전체") {
      axios.get(`/worry-board/${path}/filter?page=${0}&size=${6}&strFromMbti=ALL&strToMbti=ALL`).then((res) => {
        setWorryBoardList(res.data);
      });
    } else if (mbti1 !== "전체" && mbti2 === "전체"){
      axios
        .get(`/worry-board/${path}/filter?page=${0}&size=${6}&strFromMbti=${mbti1}&strToMbti=ALL`)
        .then((res) => setWorryBoardList(res.data));
    } else if (mbti1 === "전체" && mbti2 !== "전체"){
        axios
          .get(`/worry-board/${path}/filter?page=${0}&size=${6}&strFromMbti=ALL&strToMbti=${mbti2}`)
          .then((res) => setWorryBoardList(res.data));
    
      } else {
        axios
          .get(`/worry-board/${path}/filter?page=${0}&size=${6}&strFromMbti=${mbti1}&strToMbti=${mbti2}`)
          .then((res) => setWorryBoardList(res.data));
      }
  }, [mbti1, mbti2, path]);

  return worryBoardList;
};

export default useFetchWorryBoardList;