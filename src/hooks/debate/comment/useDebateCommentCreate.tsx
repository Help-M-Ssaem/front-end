import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../../apis/axios";
import { commentKeys } from "../../../constants/commentKey";

async function createDebateComment(
  debateId: number,
  comment: FormData,
  commentId?: number,
): Promise<void> {
  let url = `/member/discussions/${debateId}/comments`;
  commentId && (url += `?commentId=${commentId}`);

  await axios.post(url, comment, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

interface UseDebateCommentCreate {
  mutate: () => void;
}

export function useDebateCommentCreate(
  debateId: number,
  comment: FormData,
  commentId?: number,
): UseDebateCommentCreate {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => createDebateComment(debateId, comment, commentId), {
    onSuccess: () => {
      queryClient.invalidateQueries(commentKeys.all);
    },
  });
  return { mutate };
}
