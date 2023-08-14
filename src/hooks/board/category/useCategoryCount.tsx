import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../../apis/axios";
import { categoryCountKeys } from "../../../constants/boardKey";

async function getCategoryCount() {
  const { data } = await axios.get("/boards/list");
  return data;
}

export function useCategoryCount() {
  const { data: categoryCount } = useQuery(categoryCountKeys.all, () =>
    getCategoryCount(),
  );
  return { categoryCount };
}
