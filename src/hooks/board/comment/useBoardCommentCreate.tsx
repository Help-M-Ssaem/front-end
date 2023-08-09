import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../../apis/axios";
import { commentKeys } from "../../../constants/commentKey";

async function createBoardComment(
  boardId: number,
  comment: FormData,
): Promise<void> {
  await axios.post(`/member/boards/${boardId}/comments?commentId`, comment, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

interface UseBoardCommentCreate {
  mutate: () => void;
}

export function useBoardCommentCreate(
  boardId: number,
  comment: FormData,
): UseBoardCommentCreate {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => createBoardComment(boardId, comment), {
    onSuccess: () => {
      queryClient.invalidateQueries(commentKeys.all);
    },
  });
  return { mutate };
}
