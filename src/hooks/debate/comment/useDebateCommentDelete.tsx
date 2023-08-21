import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../../apis/axios";
import { commentKeys } from "../../../constants/commentKey";

async function deleteDebateComment(
  debateId: number,
  commentId: number,
): Promise<void> {
  await axios.delete(`/member/discussions/${debateId}/comments/${commentId}`);
}

interface UseDebateCommentDelete {
  mutate: () => void;
}

export function useDebateCommentDelete(
  debateId: number,
  commentId: number,
): UseDebateCommentDelete {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => deleteDebateComment(debateId, commentId), {
    onSuccess: () => {
      queryClient.invalidateQueries(commentKeys.all);
    },
  });
  return { mutate };
}
