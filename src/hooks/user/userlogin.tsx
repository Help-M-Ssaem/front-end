import { mssaemAxios as axios } from "../../apis/axios";
import { useMutation, UseMutationResult } from "react-query";

function saveTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

function saveEmail(email: string) {
  localStorage.setItem("email", email);
}

async function userLogin(
  type: string | null,
  idToken: string | null,
): Promise<
  { accessToken: string; refreshToken: string } | { message: string }
> {
  if (!idToken || !type) {
    throw new Error("인가코드X");
  }
  console.log(`/${type}/login`, { idToken });
  const { data } = await axios.post(`/${type}/login`, { idToken });

  return data;
}

export function useLogin(): UseMutationResult<
  { accessToken: string; refreshToken: string } | { message: string },
  unknown,
  { type: string | null; idToken: string | null },
  unknown
> {
  const loginMutation = useMutation<
    { accessToken: string; refreshToken: string } | { message: string },
    unknown,
    { type: string | null; idToken: string | null },
    unknown
  >(({ type, idToken }) => userLogin(type as string, idToken as string), {
    onSuccess: (data) => {
      if ("accessToken" in data && "refreshToken" in data) {
        saveTokens(data.accessToken, data.refreshToken);
      }
      if ("message" in data) {
        const emailRegex = /[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}/;
        const message = data.message;
        const extractedEmail = message.match(emailRegex);

        if (extractedEmail) {
          const email = extractedEmail[0];

          saveEmail(email);
        } else {
          console.log("Email not found in the message.");
        }
      }
    },
  });

  return loginMutation;
}
