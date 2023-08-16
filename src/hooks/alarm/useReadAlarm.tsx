import { mssaemAxios as axios } from "../../apis/axios";
import { useMutation, useQueryClient } from "react-query";
import { alarmKeys } from "../../constants/alarmKey";

async function readPostAlarm(notificationId: number): Promise<void> {
  await axios.patch(`/member/notifications?id=${notificationId}`, { status: true });
}
export function useReadPostAlarm(id: number,) {
  const queryClient = useQueryClient();
  const markAsReadMutation = useMutation(() => readPostAlarm(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(alarmKeys.all);
    },
  });
  return markAsReadMutation;
}