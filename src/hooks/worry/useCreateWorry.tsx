import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { worryKeys } from "../../constants/matchingKey";
import { createChatRoom } from "../chatting/useChatRoomCreate";

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

  const { mutate } = useMutation(() => createBoard(board), {
    onSuccess: (res) => {
      queryClient.invalidateQueries(worryKeys.all);
      createChatRoom(res.worryBoardId);
    },
  });

  return { mutate };
}
