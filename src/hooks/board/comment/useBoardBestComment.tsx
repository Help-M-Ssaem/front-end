import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../../apis/axios";
import { commentKeys } from "../../../constants/commentKey";
import { Comment } from "../../../interfaces/comment";

async function getBoardBestComment(id: number): Promise<Comment[]> {
  const { data } = await axios.get(`/boards/${id}/comments/best`);
  return data;
}

interface UseBoardComment {
  bestComments?: Comment[];
}

export function useBoardBestComment(id: number): UseBoardComment {
  const { data: bestComments } = useQuery(commentKeys.best, () =>
    getBoardBestComment(id),
  );
  return { bestComments };
}
