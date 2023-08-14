import { mssaemAxios as axios } from "../../apis/axios";
import { MultipleBoardList } from "../../interfaces/board";
import { useState, useEffect } from "react";

export async function getSearchResult(query: any): Promise<any> {
  const { data } = await axios.post("/keywords", { keyword: query });
  return data;
}

export function useSearchResult(query: any) {
  const [multipleBoardList, setMultipleBoardList] =
    useState<MultipleBoardList>();

  useEffect(() => {
    async function fetchSearchResult() {
      try {
        const searchResult = await getSearchResult(query);
        setMultipleBoardList(searchResult);
        console.log("FK", searchResult.discussionSimpleInfo.result);
      } catch (error) {
        console.error("Error fetching search result:", error);
      }
    }

    fetchSearchResult();
  }, [query]);

  return multipleBoardList;
}
