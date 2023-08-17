import { useEffect, useState } from "react";
import { mssaemAxios as axios } from "../../apis/axios";
import { DebateList } from "../../interfaces/debate";
import { useQueryClient } from "react-query";
import { debateKeys } from "../../constants/debateKey";

export function useDebatePaging ( path: string, page: number, postId: number) {
    const [DebateList, setDebateList] = useState<DebateList>();
    const queryClient = useQueryClient();
  
    useEffect(() => {
      if (path === "discusstion") {
        axios.get(`/discussions?discussionId=${postId}&page=${page}&size=${6}`).then((res) => {
            setDebateList(res.data);
            queryClient.setQueryData(debateKeys.all, res.data);
        });
    } else if (path === "hotDiscusstion"){
        axios.get(`/discussions/hot?discussionId=${postId}&page=${page}&size=${6}`).then((res) => {
            setDebateList(res.data);
            queryClient.setQueryData(debateKeys.hot, res.data);
        }); 
    }
}, [path, page, queryClient, postId]);
    return DebateList;
  };
  
  export default useDebatePaging;
  