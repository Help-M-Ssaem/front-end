import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { Keywords } from "../../interfaces/keyword";

async function getRecentSearch(): Promise<Keywords[]> {
  const { data } = await axios.get(`/member/recent/keywords`);
  return data;
}

interface UseKeywords {
    keywords?: Keywords[];
}

export function useRecentSearch(): UseKeywords {
  const { data: keywords } = useQuery("recentkeyWordKeys", () =>
    getRecentSearch(),
  );
  return { keywords };
}
