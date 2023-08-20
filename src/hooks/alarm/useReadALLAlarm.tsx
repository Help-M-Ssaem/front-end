import { mssaemAxios as axios } from "../../apis/axios";
import { useMutation, useQueryClient } from "react-query";
import { alarmKeys } from "../../constants/alarmKey";

async function readALLAlarm(): Promise<void> {
  await axios.patch(`/member/notifications/all`, { status: true });
}
export function useReadALLAlarm() {
  const queryClient = useQueryClient();
  const allReadMutation = useMutation(() => readALLAlarm(), {
     onSuccess: () => {
      queryClient.invalidateQueries(alarmKeys.all);
    },
  });
  return allReadMutation;
}