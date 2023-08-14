import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../../apis/axios";
import { chattingKeys } from "../../../constants/chattingKey";

async function getChatExist(worryBoardId: number): Promise<boolean> {
  const { data } = await axios.get(`/member/chat/rooms/state/${worryBoardId}`);
  return data;
}

interface UseChatExist {
  chatExist?: boolean;
}

export function useChatExist(worryBoardId: number): UseChatExist {
  const { data: chatExist } = useQuery(chattingKeys.all, () =>
    getChatExist(worryBoardId),
  );
  return { chatExist };
}
