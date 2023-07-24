import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { MainTeacher } from "../../interfaces/matching";
import { mainTeacherKeys } from "../../constants/matchingKey";

async function getMainTheacher(): Promise<MainTeacher[]> {
  const { data } = await axios.get("/worry-board/home");
  return data;
}

interface UseMainTheacher {
  mainTeacher?: MainTeacher[];
}

export function useMainTheacher(): UseMainTheacher {
  const { data: mainTeacher } = useQuery(mainTeacherKeys.all, () =>
    getMainTheacher(),
  );
  return { mainTeacher };
}
