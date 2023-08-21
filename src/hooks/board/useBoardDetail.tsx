import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { boardKeys } from "../../constants/boardKey";
import { BoardDetail } from "../../interfaces/board";

export async function getBoardDetail(id: number): Promise<BoardDetail> {
  try{
    const { data } = await axios.get(`/boards/${id}`);
    return data;
  } catch (error:any){
    window.history.back();
    window.alert(error.response.data.message);
    throw error;
  }
}

interface UseBoardDetail {
  board?: BoardDetail;
}

export function useBoardDetail(id: number): UseBoardDetail {
  const { data: board } = useQuery(boardKeys.detail(id), () =>
    getBoardDetail(id),
  );
  return { board };
}
