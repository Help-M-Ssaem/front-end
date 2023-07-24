import { mssaemAxios as axios } from "../../apis/axios";
import { useMutation, UseMutationResult } from "react-query";

function saveTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

async function userLogin(
  type: string | null,
  idToken: string | null,
): Promise<{ accessToken: string; refreshToken: string }> {
  if (!idToken || !type) {
    throw new Error("인가코드X");
  }
  console.log(`/${type}/login`, { idToken });
  const { data } = await axios.post(`/${type}/login`, { idToken });
  console.log(data);
  return data;
}

export function useLogin(): UseMutationResult<
  { accessToken: string; refreshToken: string },
  unknown,
  { type: string | null; idToken: string | null },
  unknown
> {
  const loginMutation = useMutation<
    { accessToken: string; refreshToken: string },
    unknown,
    { type: string | null; idToken: string | null },
    unknown
  >(({ type, idToken }) => userLogin(type as string, idToken as string), {
    onSuccess: (data) => {
      console.log(data.accessToken);
      saveTokens(data.accessToken, data.refreshToken);
    },
  });

  return loginMutation;
}
