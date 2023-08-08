import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../../apis/axios";
import { commentKeys } from "../../../constants/commentKey";

async function createDebateComment(
  boardId: number,
  comment: FormData,
): Promise<void> {
<<<<<<< HEAD
  await axios.post(
    `/member/discussions/${boardId}/comments?commentId`,
    comment,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
=======
  await axios.post(`/member/discussions/${boardId}/comments?commentId`, comment, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
>>>>>>> a26b40dc81d50aca2999cdd802c4f3e7c4b8c32f
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
