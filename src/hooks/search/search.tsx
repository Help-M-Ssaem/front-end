import { mssaemAxios as axios } from "../../apis/axios";
import { MultipleBoardList } from "../../interfaces/board";
import { useState } from "react";

const [multipleBoardList, setMultipleBoardList] = useState<MultipleBoardList>();

export async function getSearchResult(query: any): Promise<any> {
  const { data } = await axios.post("/keywords", { keyword: query });
  return data;
}

export async function useSearchResult(query: any) {
  try {
    const searchResult = await getSearchResult(query.get("query"));
    setMultipleBoardList(searchResult);
    console.log("FK", searchResult.discussionSimpleInfo.result);
  } catch (error) {
    console.error("Error fetching search result:", error);
  }
}
