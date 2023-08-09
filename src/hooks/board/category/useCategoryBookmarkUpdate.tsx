import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../../apis/axios";
import { categoryBookmarkKeys } from "../../../constants/boardKey";
import { CategoryBookmark } from "../../../interfaces/board";

async function categoryBookmarkUpdate(
  mbtiEnum: string,
): Promise<CategoryBookmark> {
  const { data } = await axios.post(`/member/bookmark?mbtiEnum=${mbtiEnum}`);
  return data;
}

interface UseCategoryBookmarkUpdate {
  mutate: () => void;
}

export function useCategoryBookmarkUpdate(
  mbtiEnum: string,
): UseCategoryBookmarkUpdate {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => categoryBookmarkUpdate(mbtiEnum), {
    onSuccess: () => {
      queryClient.invalidateQueries(categoryBookmarkKeys.all);
    },
  });
  return { mutate };
}
