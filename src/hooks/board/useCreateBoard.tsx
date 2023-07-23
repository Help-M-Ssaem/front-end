import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { BoardCreate } from "../../interfaces/board";
import { boardKeys } from "../../constants/boardKey";

async function createBoard({
  postBoardReq,
  image,
}: BoardCreate): Promise<void> {
  await axios.post(
    `/member/board`,
    { postBoardReq, image },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
}

interface UseCreateBoard {
  mutate: () => void;
}

export function useCreateBoard({
  postBoardReq,
  image,
}: BoardCreate): UseCreateBoard {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => createBoard({ postBoardReq, image }), {
    onSuccess: () => {
      queryClient.invalidateQueries(boardKeys.all);
    },
  });
  return { mutate };
}
