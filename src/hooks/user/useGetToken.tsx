import { useMutation, UseMutationResult } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";

function saveTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

async function getUserToken(
  refreshToken: string | null,
): Promise<{ accessToken: string; refreshToken: string }> {
  const { data } = await axios.patch(`/member/refresh`, { refreshToken });
  console.log("New Token" + data);
  return data;
}

export function useGetToken(): UseMutationResult<
  { accessToken: string },
  unknown,
  { refreshToken: string | null },
  unknown
> {
  const loginMutation = useMutation<
    { accessToken: string; refreshToken: string },
    unknown,
    { refreshToken: string | null },
    unknown
  >(({ refreshToken }) => getUserToken(refreshToken), {
    onSuccess: (data) => {
      if ("accessToken" in data && "refreshToken" in data) {
        saveTokens(data.accessToken, data.refreshToken);
      }
    },
  });

  return loginMutation;
}
