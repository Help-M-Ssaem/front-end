/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import FONT from "../../styles/font";
import Text from "../../components/text/Text";
import ListPagination from "../../components/Pagination/ListPagination";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/search/SearchBar";
import Container from "../../components/container/Container";
import { WorryBoard } from "../../interfaces/worry";
import BoardComponent from "../../components/board/Board";
import DebateComponent from "../../components/debate/debate";
import { useBoardListAll } from "../../hooks/board/useBoardList";
import MatchingComponent from "../../components/matching/Matching";
import { useLocation } from "react-router-dom";
import { useSearchResult } from "../../hooks/search/search";
import COLOR from "../../styles/color";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const SearchResult: React.FC = () => {
  let query = useQuery();
  const navigate = useNavigate();

  const multipleBoardList = useSearchResult(query.get("query"));

  const limit = 5; //한 페이지당 아이템의 개수
  const { boardListAll } = useBoardListAll(1, limit);

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
                {multipleBoardList?.boardSimpleInfos.result.length == 5 && (
                  <button
                    onClick={() =>
                      navigate(`/search/moreBoard?query=${query.get("query")}`)
                    }
                    css={moreButtonText}
                  >
                    더보기
                  </button>
                )}
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
                {multipleBoardList?.discussionSimpleInfo.result.length == 5 && (
                  <button
                    css={moreButtonText}
                    onClick={() =>
                      navigate(`/search/moreDebate?query=${query.get("query")}`)
                    }
                  >
                    더보기
                  </button>
                )}
              </div>
            </div>

            {multipleBoardList &&
              multipleBoardList.discussionSimpleInfo.result.map(
                (debate, index) => (
                  <DebateComponent
                    debate={debate}
                    key={debate.id}
                    mode=""
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
                {multipleBoardList?.getWorriesRes.result.length == 5 && (
                  <button
                    onClick={() =>
                      navigate(
                        `/search/moreMatching?query=${query.get("query")}`,
                      )
                    }
                    css={moreButtonText}
                  >
                    더보기
                  </button>
                )}
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
  padding-bottom: 0.625rem;
  border-bottom: 0.125rem solid ${COLOR.GRAY4};
`;

const searchContainer = css`
  padding: 3.75rem 10.625rem 0 10.625rem;
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
  font-weight: ${FONT.WEIGHT.SEMIBOLD};
`;

const boardListWrapper = css`
  // &:first-child {
  //   border-top: none!important;
  // }

  // border-top: 0.625rem solid ${COLOR.ALARM};
`;

const noResult = css`
  margin-top: 0.3125rem;
`;
export default SearchResult;
