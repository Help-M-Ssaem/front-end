import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { alarmKeys } from "../../constants/alarmKey";
import { AlarmList } from "../../interfaces/alarm";

export async function getAlarmList(
  page: number,
  size: number,
): Promise<AlarmList> {
  const { data } = await axios.get(
    `/member/notifications?page=${page}&size=${size}`,
  );
  return data;
}

interface UseAlarmList {
    alarmList?: AlarmList;
}

export function useAlarmList(
  page: number,
  size: number,
): UseAlarmList {
  const { data: alarmList } = useQuery(alarmKeys.all, () =>
    getAlarmList( page, size),
  );
  return { alarmList };
}
