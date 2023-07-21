import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { HotDebate } from "../../interfaces/debate";
import { hotDebateKeys } from "../../constants/boardKey";

async function getHotDebate(): Promise<HotDebate[]> {
  const { data } = await axios.get("/discussions/home");
  return data;
}

interface UseHotDebate {
  hotDebate?: HotDebate[];
}

export function useHotDebate(): UseHotDebate {
  const { data: hotDebate } = useQuery(hotDebateKeys.all, () => getHotDebate());
  return { hotDebate };
}
