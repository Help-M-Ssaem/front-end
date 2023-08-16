/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { debateKeys } from "../../constants/debateKey";

export async function PostVoteItem(postId: number, itemId: number) : Promise<void> {
  await axios.post(`/member/discussions/${postId}/discussion-options/${itemId}`, {selected: true} );
}

interface UseSelectedItem {
  mutate: () => void;
}

export function useSelectedItem(postId: number, itemId: number): UseSelectedItem {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(() => PostVoteItem(postId, itemId), {
    onSuccess: () => {
      queryClient.invalidateQueries(debateKeys.all);
    },
  });
      
  return { mutate };
}
