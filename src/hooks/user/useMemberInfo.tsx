import { useQuery, useQueryClient } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { User } from "../../interfaces/user";
import { userKeys } from "../../constants/userKey";

async function getMemberInfo(): Promise<User> {
  const { data } = await axios.get("/member/info");
  return data;
}

interface UseMemberInfo {
  user?: User;
}

export default function useMemberInfo(): UseMemberInfo {
  const queryClient = useQueryClient();

  const { data: user } = useQuery(userKeys.all, () => getMemberInfo());

  return { user };
}
