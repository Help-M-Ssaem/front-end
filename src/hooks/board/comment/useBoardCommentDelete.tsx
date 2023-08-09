import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../../apis/axios";
import { commentKeys } from "../../../constants/commentKey";

async function deleteBoardComment(
  boardId: number,
  commentId: number,
): Promise<void> {
  await axios.delete(`/member/boards/${boardId}/comments/${commentId}`);
}

interface UseBoardCommentDelete {
  mutate: () => void;
}

export function useBoardCommentDelete(
  boardId: number,
  commentId: number,
): UseBoardCommentDelete {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => deleteBoardComment(boardId, commentId), {
    onSuccess: () => {
      queryClient.invalidateQueries(commentKeys.all);
    },
  });
  return { mutate };
}
