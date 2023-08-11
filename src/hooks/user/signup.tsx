import { useMutation, UseMutationResult } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { userinfo } from "../../interfaces/signup";

function saveTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}
async function postUserInfo(
  data: userinfo,
): Promise<{ accessToken: string; refreshToken: string }> {
  const response = await axios.post("/sign-up", data);
  saveTokens(response.data.accessToken, response.data.refreshToken);
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
