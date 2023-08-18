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

export async function useSelectedItem(postId: number, itemId: number):  Promise<UseSelectedItem> {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(() => PostVoteItem(postId, itemId), {
    onSuccess: () => {
      queryClient.invalidateQueries("debate");
    },
  });
      
  return { mutate };
}
