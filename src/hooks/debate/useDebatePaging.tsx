import { useEffect, useState } from "react";
import { mssaemAxios as axios } from "../../apis/axios";
import { DebateList } from "../../interfaces/debate";

export function useDebatePaging ( path: string, page: number) {
    const [DebateList, setDebateList] = useState<DebateList>();
  
    useEffect(() => {
      if (path === "discusstion") {
        axios.get(`/discussions?page=${page}&size=${6}`).then((res) => {
            setDebateList(res.data);
        });
    } else if (path === "hotDiscusstion"){
        axios.get(`/discussions/hot?page=${page}&size=${6}`).then((res) => {
            setDebateList(res.data);
        }); 
    }
}, [path, page]);
    return DebateList;
  };
  
  export default useDebatePaging;
  