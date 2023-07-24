import { useMutation, UseMutationResult } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";

async function getNickName(nickName: string): Promise<{ used: boolean }> {
  const { data } = await axios.post("/nick-name", { nickName });
  return data;
}

export function useNickName(): UseMutationResult<
  { used: boolean },
  unknown,
  string,
  unknown
> {
  const checkNickName = useMutation<
    { used: boolean },
    unknown,
    string,
    unknown
  >((nickName: string) => getNickName(nickName));

  return checkNickName;
}
