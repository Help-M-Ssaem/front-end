import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../../apis/axios";
import { categoryBookmarkKeys } from "../../../constants/boardKey";
import { CategoryBookmark } from "../../../interfaces/board";

async function getCategoryBookmark(): Promise<CategoryBookmark> {
  const { data } = await axios.get("/member/bookmark");
  return data;
}

interface UseCategoryBookmark {
  categoryBookmark?: CategoryBookmark;
}

export function useCategoryBookmark(): UseCategoryBookmark {
  const { data: categoryBookmark } = useQuery(categoryBookmarkKeys.all, () =>
    getCategoryBookmark(),
  );
  return { categoryBookmark };
}
