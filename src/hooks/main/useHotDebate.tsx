import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { Debates } from "../../interfaces/debate";
import { debateKeys } from "../../constants/debateKey";

export function useHotDebate() {
  const hotQueryKey = debateKeys.hot;
  const { data: hotDebates, refetch } = useQuery<Debates>(
    hotQueryKey,
    async () => {
      const { data } = await axios.get(
        "/discussions/home"
      );
      return data;
    }
  );
  return { hotDebates, refetch };
}
