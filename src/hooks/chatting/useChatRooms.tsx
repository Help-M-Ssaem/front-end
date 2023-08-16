import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { ChatRoom } from "../../interfaces/chatting";
import { chattingKeys } from "../../constants/chattingKey";

async function getChatRooms(): Promise<ChatRoom[]> {
  const { data } = await axios.get("/member/chatRooms");
  return data;
}

interface UseChatRooms {
  chatRooms?: ChatRoom[];
  isLoading: boolean;
}

export function useChatRooms(): UseChatRooms {
  const { data: chatRooms, isLoading } = useQuery(chattingKeys.all, () =>
    getChatRooms(),
  );
  return { chatRooms, isLoading };
}
