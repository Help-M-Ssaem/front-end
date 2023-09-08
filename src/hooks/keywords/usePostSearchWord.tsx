import { useMutation, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";

async function postSearch(keyWord: string) {
  await axios.post("/keywords", { keyword: keyWord });
}

interface UseSearchWord {
  mutate: () => void;
}
// interface UseSearchWord {
//   search: () => void;
//   isLoading: boolean;
// }

export function useSearch(keyWord: string): UseSearchWord {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => postSearch(keyWord), {
    onSuccess: () => {
      queryClient.invalidateQueries("recentkeyWordKeys");
    },
  });

  return { mutate };
}
// export function useSearch(keyWord: string): UseSearchWord {
//   const queryClient = useQueryClient();

//   const { mutate, isLoading } = useMutation(() => postSearch(keyWord), {
//     onSuccess: () => {
//       queryClient.invalidateQueries("recentkeyWordKeys");
//     },
//   });

//   const search = () => {
//     if (!isLoading) {
//       mutate();
//     }
//   };

//   return { search, isLoading };
// }
