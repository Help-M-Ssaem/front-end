import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../../apis/axios";
import { CommentList } from "../../../interfaces/comment";
import { commentKeys } from "../../../constants/commentKey";

async function getDebateComment(
  id: number,
  page: number,
  size: number,
): Promise<CommentList> {
  const { data } = await axios.get(
    `/discussions/${id}/comments?page=${page}&size=${size}`,
  );
  return data;
}

interface UseDebateComment {
  comments?: CommentList;
}

export function useDebateComment(
  id: number,
  page: number,
  size: number,
): UseDebateComment {
  const { data: comments } = useQuery(commentKeys.all, () =>
    getDebateComment(id, page, size),
  );
  return { comments };
}
