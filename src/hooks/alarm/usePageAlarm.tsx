import { mssaemAxios as axios } from "../../apis/axios";
import { AlarmList } from "../../interfaces/alarm";
import { useQuery } from "react-query";
import { alarmKeys } from "../../constants/alarmKey";
export async function getDebateDetail(page: number): Promise<AlarmList> {
    const { data } = await axios.get(`/member/notifications?page=${page}&size=${10}`);
    return data;
  }
interface UseAlarmList {
    alarmList? : AlarmList;
}
export function useAlarmPaging ( page: number) : UseAlarmList {
    const {data:alarmList} = useQuery("alramList", ()=>
    getDebateDetail(page),
    )
    return{alarmList}
  };
  
  export default useAlarmPaging;
  