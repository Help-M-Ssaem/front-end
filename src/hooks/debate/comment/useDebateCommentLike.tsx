import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../../apis/axios";
import { commentKeys } from "../../../constants/commentKey";

async function boardCommentLike(
  boardId: number,
  commentId: number,
): Promise<void> {
  await axios.post(`/member/discussions/${boardId}/comments/${commentId}/like`);
}

interface UseDebateCommentLike {
  mutate: () => void;
}

export function useDebateCommentLike(
  boardId: number,
  commentId: number,
): UseDebateCommentLike {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => boardCommentLike(boardId, commentId), {
    onSuccess: () => {
      queryClient.invalidateQueries(commentKeys.all);
    },
  });
  return { mutate };
}
