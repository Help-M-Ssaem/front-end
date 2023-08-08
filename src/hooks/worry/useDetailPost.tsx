import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { worryKeys } from "../../constants/matchingKey";
import { DetailWorry } from "../../interfaces/worry";

<<<<<<< HEAD
export async function getWorryBoard(id: number): Promise<DetailWorry> {
  const { data } = await axios.get(`/worry-board/${id}`);
  return data;
}

interface UseWorryBoard {
  worryBoard?: DetailWorry;
}

export function useWorryBoard(id: number): UseWorryBoard {
  const { data: worryBoard } = useQuery(worryKeys.detail(id), () =>
    getWorryBoard(id),
  );
  return { worryBoard };
}
=======
export async function getWorryBoard(id:number): Promise<DetailWorry> {
    const { data } = await axios.get(`/worry-board/${id}`);
    return data;
  }
  
  interface UseWorryBoard {
    worryBoard?: DetailWorry;
  }
  
  export function useWorryBoard(id: number): UseWorryBoard {
    const { data: worryBoard } = useQuery(worryKeys.detail(id), () => 
    getWorryBoard(id));
    return { worryBoard };
  }
>>>>>>> a26b40dc81d50aca2999cdd802c4f3e7c4b8c32f
