import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../../apis/axios";
import { commentKeys } from "../../../constants/commentKey";

async function boardCommentLike(
  boardId: number,
  commentId: number,
): Promise<void> {
  await axios.post(`/member/boards/${boardId}/comments/${commentId}/like`);
}

interface UseBoardCommentLike {
  mutate: () => void;
}

export function useBoardCommentLike(
  boardId: number,
  commentId: number,
): UseBoardCommentLike {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => boardCommentLike(boardId, commentId), {
    onSuccess: () => {
      queryClient.invalidateQueries(commentKeys.all);
    },
  });
  return { mutate };
}
