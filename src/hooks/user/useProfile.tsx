import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";
import { UserProfile } from "../../interfaces/user";

async function getProfile(id: number): Promise<UserProfile> {
  const { data } = await axios.get(`/profile/${id}`);
  return data;
}

interface UseProfile {
  profileData?: UserProfile;
}

export function useGetProfile(id: number): UseProfile {
  const { data: profileData } = useQuery(`profile/${id}`, () => getProfile(id));
  return { profileData };
}
