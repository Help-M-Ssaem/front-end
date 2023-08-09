import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { HotDebate } from "../../interfaces/debate";
import { hotDebateKeys } from "../../constants/boardKey";

async function getHotDebate(): Promise<HotDebate[]> {
  const { data } = await axios.get("/discussions/home");
  return data;
}

interface UseHotDebate {
  hotDebates?: HotDebate[];
}

export function useHotDebate(): UseHotDebate {
  const { data: hotDebates } = useQuery(hotDebateKeys.all, () =>
    getHotDebate(),
  );
  return { hotDebates };
}
