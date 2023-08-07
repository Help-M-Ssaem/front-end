import { useQuery } from "react-query";
import { mssaemAxios as axios } from "../../apis/axios";

async function getProfile(id: any): Promise<any> {
  const { data } = await axios.get(`/profile/${id}`);
  return data;
}

export function useGetProfile(id: any): any {
  const { data: getProfileData } = useQuery(`profile/${id}`, () =>
    getProfile(id),
  );
  return { getProfileData };
}
