/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import FONT from "../../styles/font";
import ListPagination from "../../components/Pagination/ListPagination";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container/Container";
import BoardComponent from "../../components/board/Board";
import { useLocation } from "react-router-dom";
import { mssaemAxios as axios } from "../../apis/axios";
import COLOR from "../../styles/color";
import { useSearchBoardList } from "../../hooks/search/useSearchBoardList";
import { SearchBoardList } from "../../interfaces/moresearch";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const MoreBoardResult = () => {
  let query = useQuery();
  const navigate = useNavigate();
  const [searchBoardList, setSearchBoardList] = useState<SearchBoardList>();
  const mbti = "ALL";
  const limit = 10; //한 페이지당 아이템의 개수
  const [page, setPage] = useState(1); // 현재 페이지 설정하는 함수

  const queryValue = query.get("query") || ""; // null값일 때 빈 문자열로
  const searchTypeValue = Number(query.get("searchType")) || 0;
  const searchData = useSearchBoardList(
    searchTypeValue,
    queryValue,
    mbti,
    page,
    limit,
  );
  console.log("query : " + query); // searchType=0&query=%EC%9A%94
  console.log("searchtypeget: " + query.get("searchType")); // 0
  console.log("queryget: " + query.get("query")); // 요
  console.log(query.get("query")?.at(0)); // 요

  useEffect(() => {
    setSearchBoardList(searchData.searchBoardList);
  }, [searchData.searchBoardList]);

  const totalPage = searchBoardList ? searchBoardList.totalSize : 1; //전체 페이지
  const [blockNum, setBlockNum] = useState(0); //블록 설정하는 함수

  useEffect(() => {
    axios
      .get(
        `/boards/search?searchType=${searchTypeValue}&keyword=${queryValue}&strMbti=${mbti}&page=${
          page - 1
        }&size=${limit}`,
      )
      .then((res) => {
        setSearchBoardList(res.data);
      });
  }, [page]);

  return (
    <>
      <div css={pageInfoBoxCSS}>
        <Container>
          <div css={pageInfoBoxMsgCSS}>
            '{query.get("query")}' 에 대한 일반 게시판 검색 결과입니다.
          </div>
        </Container>
      </div>

      <div css={boardBoxCSS}>
        <Container>
          <div css={boardTitleCSS}>MBTI 게시판</div>

          {searchBoardList &&
            searchBoardList.result.map((board) => (
              <div css={boardListWrapper}>
                <BoardComponent
                  board={board}
                  key={board.id}
                  onClick={() => navigate(`/board/${board.id}`)}
                />
              </div>
            ))}
          <ListPagination
            limit={limit}
            page={page}
            setPage={setPage}
            blockNum={blockNum}
            setBlockNum={setBlockNum}
            totalPage={totalPage}
          />
        </Container>
      </div>
    </>
  );
};

const pageInfoBoxCSS = css`
  display: flex;
  align-items: center;
  margin-top: 3rem;
`;

const pageInfoBoxMsgCSS = css`
  margin-left: 2rem;
`;

const boardTitleCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  margin-bottom: 0.4rem;
`;

const boardBoxCSS = css`
  display: flex;
  align-items: center;
  margin-top: 2rem;
`;

const boardListWrapper = css`
  &:first-child {
    border-top: 0.625rem solid ${COLOR.ALARM};
  }
  border-top: none;
`;
export default MoreBoardResult;
