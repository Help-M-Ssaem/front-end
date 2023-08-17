import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { KeywordList } from "../../interfaces/keyword";

async function getPopularSearch(): Promise<KeywordList[]> {
  const { data } = await axios.get(`/realtime/keywords`);
  return data;
}

interface UseKeywordList {
    keywordList?: KeywordList[];
}

export function usePopularSearch(): UseKeywordList {
  const { data: keywordList } = useQuery("keyWordKeys", () =>
    getPopularSearch(),
  );
  return { keywordList };
}
