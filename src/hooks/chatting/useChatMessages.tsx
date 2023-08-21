import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { ChatMessage } from "../../interfaces/chatting";
import { chatMessageKeys } from "../../constants/chattingKey";

async function getChatMessages(): Promise<ChatMessage[]> {
  const { data } = await axios.get("/member/allMessages/1");
  return data;
}

interface UseChatMessage {
  chatMessages?: ChatMessage[];
}

export function useChatMessages(): UseChatMessage {
  const { data: chatMessages } = useQuery(chatMessageKeys.all, () =>
    getChatMessages(),
  );
  return { chatMessages };
}
