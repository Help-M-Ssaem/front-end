import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { hotThreeKeys } from "../../constants/boardKey";
import { HotThree } from "../../interfaces/board";

async function getHotThree(): Promise<HotThree> {
  const { data } = await axios.get("/three-hot");
  return data;
}

interface UseHotThree {
  hotThree?: HotThree;
}

export function useHotThree(): UseHotThree {
  const { data: hotThree } = useQuery(hotThreeKeys.all, () => getHotThree());
  return { hotThree };
}
