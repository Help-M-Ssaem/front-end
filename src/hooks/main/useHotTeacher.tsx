import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { hotTeacherKeys } from "../../constants/boardKey";
import { HotTeacher } from "../../interfaces/worry";

async function getHotTeacher(): Promise<HotTeacher[]> {
  const { data } = await axios.get("/teacher");
  return data;
}

interface UseHotTeacher {
  hotTeacher?: HotTeacher[];
}

export function useHotTeacher(): UseHotTeacher {
  const { data: hotTeacher } = useQuery<HotTeacher[]>(hotTeacherKeys.all, getHotTeacher);
  return { hotTeacher };
}
