import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { worryKeys } from "../../constants/matchingKey";
import { createChatRoom } from "../chatting/useChatRoomCreate";
import { useChatContext } from "../chatting/ChatProvider";

async function createBoard(board: FormData) {
  const { data } = await axios.post(`/member/worry-board`, board, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

interface UseCreateBoard {
  mutate: () => void;
}

export function useCreateBoard(board: FormData): UseCreateBoard {
  const queryClient = useQueryClient();
  const { connect } = useChatContext();

  const { mutate } = useMutation(async () => {
    queryClient.invalidateQueries(worryKeys.all);
    const res = await createBoard(board);
    const roomId = await createChatRoom(res.worryBoardId);
    connect(roomId);
  });

  return { mutate };
}
