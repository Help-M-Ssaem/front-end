/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import FONT from "../../styles/font";
import Text from "../../components/text/Text";
import ListPagination from "../../components/Pagination/ListPagination";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/search/SearchBar";
import Container from "../../components/container/Container";
import {
  BoardList as SharedBoard,
  MultipleBoardList,
} from "../../interfaces/board";
import { WorryBoard } from "../../interfaces/worry";
import BoardComponent from "../../components/board/Board";
import DebateComponent from "../../components/debate/debate";
import { useBoardList } from "../../hooks/board/useBoardList";
// 토론 컴포넌트 import
import MatchingComponent from "../../components/matching/Matching";
import { mssaemAxios as axios } from "../../apis/axios";
import { useLocation } from "react-router-dom";

import { getSearchResult } from "../../hooks/search/search";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const SearchResult: React.FC = () => {
  let query = useQuery();
  const navigate = useNavigate();
  const [multipleBoardList, setMultipleBoardList] =
    useState<MultipleBoardList>();

  useEffect(() => {
    async function fetchSearchResult() {
      try {
        const searchResult = await getSearchResult(query.get("query"));
        setMultipleBoardList(searchResult);
        console.log("FK", searchResult.discussionSimpleInfo.result);
      } catch (error) {
        // Handle error if necessary
        console.error("Error fetching search result:", error);
      }
    }

    fetchSearchResult();
  }, [query]);

  const limit = 5; //한 페이지당 아이템의 개수
  const { boardListAll } = useBoardList(1, limit);

  const totalPage = boardListAll ? boardListAll.totalSize : 1; //전체 페이지 수
  const pageNum = boardListAll ? boardListAll.page : 1;
  const [page, setPage] = useState(pageNum); // 현재 페이지 설정하는 함수
  const [blockNum, setBlockNum] = useState(0); //블록 설정하는 함수

  return (
    <>
      <div css={searchContainer}>
        <SearchBar></SearchBar>
      </div>

      <div css={resultContainer}>
        {/* 게시판 */}
        <div css={resultEachBoardContainer}>
          <Container>
            <div css={boardHeader}>
              <div css={boardTitleCSS}>MBTI 게시판 </div>
              <div css={moreButtonCSS}>
                <button
                  onClick={() =>
                    navigate(`/search/moreBoard?query=${query.get("query")}`)
                  }
                  css={moreButtonText}
                >
                  더보기
                </button>
              </div>
            </div>

            {multipleBoardList &&
              multipleBoardList.boardSimpleInfos.result.map((board) => (
                <div css={boardListWrapper}>
                  <BoardComponent
                    board={board}
                    key={board.id}
                    onClick={() => navigate(`/board/${board.id}`)}
                  />
                </div>
              ))}
            <div css={noResult}>
              {!multipleBoardList?.boardSimpleInfos.result.length &&
                "검색 결과가 없습니다 🥲"}
            </div>
          </Container>
        </div>
        {/* 토론 게시판 */}
        <div css={resultEachBoardContainer}>
          <Container>
            <div css={boardHeader}>
              <div css={boardTitleCSS}>토론 게시판 </div>
              <div css={moreButtonCSS}>
                <button
                  css={moreButtonText}
                  onClick={() =>
                    navigate(`/search/moreDebate?query=${query.get("query")}`)
                  }
                >
                  더보기
                </button>
              </div>
            </div>

            {multipleBoardList &&
              multipleBoardList.discussionSimpleInfo.result.map(
                (debate, index) => (
                  <DebateComponent
                    debate={debate}
                    key={debate.id}
                    onClick={() => navigate(`/debate/${debate.id}`)}
                    index={index}
                  />
                ),
              )}

            <div css={noResult}>
              {!multipleBoardList?.discussionSimpleInfo.result.length &&
                "검색 결과가 없습니다 🥲"}
            </div>
          </Container>
        </div>
        {/* M쌤 매칭 게시판 */}
        <div css={resultEachBoardContainer}>
          <Container>
            <div css={boardHeader}>
              <div css={boardTitleCSS}>M쌤 매칭 게시판 </div>
              <div css={moreButtonCSS}>
                <button
                  onClick={() =>
                    navigate(`/search/moreMatching?query=${query.get("query")}`)
                  }
                  css={moreButtonText}
                >
                  더보기
                </button>
              </div>
            </div>
            {multipleBoardList &&
              multipleBoardList!.getWorriesRes.result?.map((match) => (
                <MatchingComponent
                  matching={match}
                  solve={"solved"}
                  onClick={() => navigate(`/match/${match.id}`)}
                  key={match.id}
                />
              ))}
            <div css={noResult}>
              {!multipleBoardList?.getWorriesRes.result.length &&
                "검색 결과가 없습니다 🥲"}
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

const boardHeader = css`
  display: flex;
  padding-bottom: 10px;
  border-bottom: 2px solid #eee;
`;

const searchContainer = css`
  padding: 60px 170px 0 170px;
  display: flex;
  flex-direction: column;
`;

const resultContainer = css`
  margin-top: 4rem;
`;

const resultEachBoardContainer = css`
  margin-bottom: 2rem;
`;

const boardTitleCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  margin-bottom: 0.4rem;
`;

const moreButtonCSS = css`
  margin-left: auto;
`;

const moreButtonText = css`
  font-weight: 600;
`;

const boardListWrapper = css`
  // &:first-child {
  //   border-top: none!important;
  // }

  // border-top: 1px solid red;
`;

const noResult = css`
  margin-top: 5px;
`;
export default SearchResult;
