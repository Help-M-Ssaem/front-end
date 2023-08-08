import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../../apis/axios";
import { commentKeys } from "../../../constants/commentKey";

async function deleteDebateComment(
  boardId: number,
  commentId: number,
): Promise<void> {
  await axios.delete(`/member/discussions/${boardId}/comments/${commentId}`);
}

interface UseDebateCommentDelete {
  mutate: () => void;
}

export function useDebateCommentDelete(
  boardId: number,
  commentId: number,
): UseDebateCommentDelete {
  const queryClient = useQueryClient();

<<<<<<< HEAD
  const { mutate } = useMutation(
    () => deleteDebateComment(boardId, commentId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(commentKeys.all);
      },
    },
  );
=======
  const { mutate } = useMutation(() => deleteDebateComment(boardId, commentId), {
    onSuccess: () => {
      queryClient.invalidateQueries(commentKeys.all);
    },
  });
>>>>>>> a26b40dc81d50aca2999cdd802c4f3e7c4b8c32f
  return { mutate };
}
