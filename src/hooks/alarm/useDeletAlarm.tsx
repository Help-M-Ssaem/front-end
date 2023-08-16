import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { alarmKeys } from "../../constants/alarmKey";

async function deleteAlarm(id: number): Promise<void> {
  await axios.delete(`/member/notifications?id=${id}`);
}

interface UseDeleteAlarm {
  mutate: () => void;
}

export function useDeleteAlarm(id: number): UseDeleteAlarm {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(() => deleteAlarm(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(alarmKeys.all);
    },
  });
  return { mutate };
}
