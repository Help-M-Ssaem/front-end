import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../../apis/axios";
import { commentKeys } from "../../../constants/commentKey";

async function debateCommentLike(
  debateId: number,
  commentId: number,
): Promise<void> {
  await axios.post(`/member/discussions/${debateId}/comments/${commentId}/like`);
}

interface UseDebateCommentLike {
  mutate: () => void;
}

export function useDebateCommentLike(
  debateId: number,
  commentId: number,
): UseDebateCommentLike {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => debateCommentLike(debateId, commentId), {
    onSuccess: () => {
      queryClient.invalidateQueries(commentKeys.all);
    },
  });
  return { mutate };
}
