import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../../apis/axios";
import { commentKeys } from "../../../constants/commentKey";

async function createBoardComment(
  boardId: number,
  comment: FormData,
  commentId?: number,
): Promise<void> {
  let url = `/member/boards/${boardId}/comments`;
  commentId && (url += `?commentId=${commentId}`);

  await axios.post(url, comment, {
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
  commentId?: number,
): UseBoardCommentCreate {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    () => createBoardComment(boardId, comment, commentId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(commentKeys.all);
      },
    },
  );
  return { mutate };
}
