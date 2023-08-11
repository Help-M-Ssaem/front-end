import { mssaemAxios as axios } from "../../apis/axios";

export async function getSearchResult(query: any): Promise<any> {
  const { data } = await axios.post('/keywords', {keyword: query}) 
  return data;
}
