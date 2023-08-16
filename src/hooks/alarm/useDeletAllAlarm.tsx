import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { alarmKeys } from "../../constants/alarmKey";

async function deleteAllAlarm(): Promise<void> {
  await axios.delete(`/member/notifications/all`);
}

interface UseDeleteAllAlarm {
  mutate: () => void;
}

export function useDeleteAllAlarm(): UseDeleteAllAlarm {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(() => deleteAllAlarm(), {
    onSuccess: () => {
      queryClient.invalidateQueries(alarmKeys.all);
    },
  });
  return { mutate };
}
