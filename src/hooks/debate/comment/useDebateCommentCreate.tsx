import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../../apis/axios";
import { commentKeys } from "../../../constants/commentKey";

async function createDebateComment(
  boardId: number,
  comment: FormData,
): Promise<void> {
  await axios.post(
    `/member/discussions/${boardId}/comments?commentId`,
    comment,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
}

interface UseDebateCommentCreate {
  mutate: () => void;
}

export function useDebateCommentCreate(
  boardId: number,
  comment: FormData,
): UseDebateCommentCreate {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => createDebateComment(boardId, comment), {
    onSuccess: () => {
      queryClient.invalidateQueries(commentKeys.all);
    },
  });
  return { mutate };
}
