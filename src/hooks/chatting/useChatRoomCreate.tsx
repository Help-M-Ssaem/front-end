import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { chattingKeys } from "../../constants/chattingKey";

export async function createChatRoom(worryBoardId: number) {
  const res = await axios.post(`/member/chat/rooms/${worryBoardId}`);
  return res.data.chatRoomId;
}

interface UseChatRoomCreate {
  mutate: () => void;
}

export function useChatRoomCreate(worryBoardId: number): UseChatRoomCreate {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => createChatRoom(worryBoardId), {
    onSuccess: () => {
      queryClient.invalidateQueries(chattingKeys.all);
    },
  });
  return { mutate };
}
