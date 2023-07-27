import { useMutation, UseMutationResult } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { userinfo } from "../../interfaces/signup";

async function postUserInfo(
  data: userinfo,
): Promise<{ accessToken: string; refreshToken: string }> {
  console.log(data);
  const response = await axios.post("/sign-up", data);
  return response.data;
}

export function usePostUserInfo(): UseMutationResult<
  { accessToken: string; refreshToken: string },
  unknown,
  userinfo,
  unknown
> {
  const mutation = useMutation(postUserInfo);

  return mutation;
}
