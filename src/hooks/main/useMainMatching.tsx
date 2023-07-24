import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { MainMatching } from "../../interfaces/matching";
import { mainMatchingKeys } from "../../constants/matchingKey";

async function getMainMatching(): Promise<MainMatching[]> {
  const { data } = await axios.get("/worry-board/home");
  return data;
}

interface UseHotThree {
  mainMatching?: MainMatching[];
}

export function useMainMatching(): UseHotThree {
  const { data: mainMatching } = useQuery(mainMatchingKeys.all, () =>
    getMainMatching(),
  );
  return { mainMatching };
}
