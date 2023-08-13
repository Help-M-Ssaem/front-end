import { useMutation, useQuery, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";

async function usedeleteImage() {
  await axios.delete(`/member/profile`);
}

export function useDeleteImage() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => usedeleteImage(), {
    onSuccess: () => {
      queryClient.invalidateQueries("profile");
    },
  });
  return { mutate };
}
