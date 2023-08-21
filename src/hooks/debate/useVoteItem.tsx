/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { debateKeys } from "../../constants/debateKey";

export async function PostVoteItem(postId: number, itemId: number) : Promise<void> {
  const { data }= await axios.post(`/member/discussions/${postId}/discussion-options/${itemId}`, {selected: true} );
  return data;
}

interface UseSelectedItem {
  mutate: () => void;
}

export function useSelectedItem(postId: number, itemId: number):  UseSelectedItem {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(() => PostVoteItem(postId, itemId), {
    onSuccess: async () => {
      // 선택된 투표 항목에 대한 쿼리도 리패치
      await queryClient.invalidateQueries(["debateOption", postId, itemId]);
      // 전체 토론 목록 쿼리 리패치
      queryClient.invalidateQueries("debate");
    },
  });
      
  return { mutate };
}
