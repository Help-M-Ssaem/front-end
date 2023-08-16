import { useEffect, useState } from "react";
import { mssaemAxios as axios } from "../../apis/axios";
import { DebateList } from "../../interfaces/debate";
import { useQueryClient } from "react-query";
import { debateKeys } from "../../constants/debateKey";

export function useDebatePaging ( path: string, page: number) {
    const [DebateList, setDebateList] = useState<DebateList>();
    const queryClient = useQueryClient();
  
    useEffect(() => {
      if (path === "discusstion") {
        axios.get(`/discussions?page=${page}&size=${6}`).then((res) => {
            setDebateList(res.data);
            queryClient.setQueryData(debateKeys.all, res.data);
        });
    } else if (path === "hotDiscusstion"){
        axios.get(`/discussions/hot?page=${page}&size=${6}`).then((res) => {
            setDebateList(res.data);
            queryClient.setQueryData(debateKeys.all, res.data);
        }); 
    }
}, [path, page, queryClient]);
    return DebateList;
  };
  
  export default useDebatePaging;
  