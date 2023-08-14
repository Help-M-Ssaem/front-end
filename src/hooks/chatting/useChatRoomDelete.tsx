import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { chattingKeys } from "../../constants/chattingKey";

async function deleteChatRoom(roomId: number): Promise<void> {
  await axios.delete(`/member/chat/rooms/${roomId}`);
}

interface UseChatRoomDelete {
  mutate: () => void;
}

export function useChatRoomDelete(roomId: number): UseChatRoomDelete {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => deleteChatRoom(roomId), {
    onSuccess: () => {
      queryClient.invalidateQueries(chattingKeys.all);
    },
  });
  return { mutate };
}
