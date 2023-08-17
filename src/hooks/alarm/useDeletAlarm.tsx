import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { alarmKeys } from "../../constants/alarmKey";

export async function deleteAlarm(notificationId: number): Promise<void> {
  await axios.delete(`/member/notifications?id=${notificationId}`);
}

interface UseDeleteAlarm {
  mutate: () => void;
}

export function useDeleteAlarm(notificationId: number): UseDeleteAlarm {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(() => deleteAlarm(notificationId), {
    onSuccess: () => {
      queryClient.invalidateQueries("alarmList");
    },
  });
  return { mutate };
}

export function useDeletePageAlarm(notificationId: number): UseDeleteAlarm {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(() => deleteAlarm(notificationId), {
    onSuccess: () => {
      queryClient.invalidateQueries(alarmKeys.all);
    },
  });
  return { mutate };
}
