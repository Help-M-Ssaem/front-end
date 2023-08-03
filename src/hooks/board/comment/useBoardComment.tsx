import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../../apis/axios";
import { CommentList } from "../../../interfaces/comment";
import { commentKeys } from "../../../constants/commentKey";

async function getBoardComment(
  id: number,
  page: number,
  size: number,
): Promise<CommentList> {
  const { data } = await axios.get(
    `/boards/${id}/comments?page=${page}&size=${size}`,
  );
  return data;
}

interface UseBoardComment {
  comments?: CommentList;
}

export function useBoardComment(
  id: number,
  page: number,
  size: number,
): UseBoardComment {
  const { data: comments } = useQuery(commentKeys.all, () =>
    getBoardComment(id, page, size),
  );
  return { comments };
}
