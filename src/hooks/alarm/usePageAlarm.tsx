import { useEffect, useState } from "react";
import { mssaemAxios as axios } from "../../apis/axios";
import { AlarmList } from "../../interfaces/alarm";

export function useAlarmPaging ( page: number) {
    const [alarmList, setAlarmList] = useState<AlarmList>();
  
    useEffect(() => {
        axios.get(`/member/notifications?page=${page}&size=${10}`).then((res) => {
        setAlarmList(res.data);
        })
    }, [page]);
    return alarmList;
  };
  
  export default useAlarmPaging;
  