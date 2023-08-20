import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../../apis/axios";
import { commentKeys } from "../../../constants/commentKey";
import { Comment } from "../../../interfaces/comment";

async function getDebateBestComment(id: number): Promise<Comment[]> {
  const { data } = await axios.get(`/discussions/${id}/comments/best`);
  return data;
}

interface UseDebateComment {
  bestComments?: Comment[];
}

export function useDebateBestComment(id: number): UseDebateComment {
  const { data: bestComments } = useQuery(commentKeys.best, () =>
    getDebateBestComment(id),
  );
  return { bestComments };
}
