import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { debateKeys } from "../../constants/debateKey";
import { DebateDetail } from "../../interfaces/debate";

export async function getDebateDetail(id: number): Promise<DebateDetail> {
  try{
    const { data } = await axios.get(`/discussions/${id}`);
    return data;
  } catch (error:any){
    window.history.back();
    window.alert(error.response.data.message);
    throw error;
  }
}

interface UseDebateDetail {
    debate?: DebateDetail;
    isLoading: boolean;
}

export function useDebateDetail(id: number): UseDebateDetail {
  const { isLoading , data: debate } = useQuery(debateKeys.detail(id), () =>
    getDebateDetail(id),
    {
      refetchOnMount : true,
    } 
  );
  return { isLoading,debate,  };
}
