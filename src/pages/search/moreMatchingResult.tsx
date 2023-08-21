/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import FONT from "../../styles/font";
import ListPagination from "../../components/Pagination/ListPagination";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container/Container";
import SelectBox from "../../components/Pagination/SelectBox";
import { useLocation } from "react-router-dom";
import { mssaemAxios as axios } from "../../apis/axios";
import COLOR from "../../styles/color";
import { useSearchSolvedWorryList } from "../../hooks/search/useSearchSolvedWorryBoardList";
import { useSearchWaitingWorryList } from "../../hooks/search/useSearchWaitingWorryBoardList";
import MatchingComponent from "../../components/matching/Matching";
import { SearchMatchingList } from "../../interfaces/moresearch";
import { WorryList } from "../../interfaces/worry";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const MoreMatchingResult = () => {
  let query = useQuery();
  const navigate = useNavigate();
  const [searchWaitingWorryList, setSearchWaitingWorryList] =
    useState<WorryList>();
  const [searchSolvedWorryList, setSearchSolvedWorryList] =
    useState<WorryList>();
  const mbti = "ALL";
  const limit = 10; //한 페이지당 아이템의 개수
  const [pageWaiting, setPageWaiting] = useState(1); // 현재 페이지 설정하는 함수
  const [pageSolved, setPageSolved] = useState(1); // 현재 페이지 설정하는 함수

  const queryValue = query.get("query") || ""; // null값일 때 빈 문자열로

  const searchWaitingData = useSearchWaitingWorryList(
    0,
    queryValue,
    mbti,
    mbti,
    pageWaiting,
    limit,
  );
  const searchSolvedData = useSearchSolvedWorryList(
    0,
    queryValue,
    mbti,
    mbti,
    pageSolved,
    limit,
  );

  useEffect(() => {
    setSearchWaitingWorryList(searchWaitingData.searchWaitingWorryList);
  }, [searchWaitingData.searchWaitingWorryList]);

  useEffect(() => {
    setSearchSolvedWorryList(searchSolvedData.searchSolvedWorryList);
  }, [searchSolvedData.searchSolvedWorryList]);

  console.log(
    "해결완료" + (searchSolvedWorryList && searchSolvedWorryList.result),
  );
  console.log(
    "기다리는" + (searchWaitingWorryList && searchWaitingWorryList.result),
  );

  const totalPageSolved = searchSolvedWorryList
    ? searchSolvedWorryList.totalSize
    : 1; //전체 페이지
  const totalPageWaiting = searchWaitingWorryList
    ? searchWaitingWorryList.totalSize
    : 1; //전체 페이지
  const [blockNum, setBlockNum] = useState(0); //블록 설정하는 함수

  useEffect(() => {
    axios
      .get(
        `/worry-board/solved/search?searchType=0&keyword=${queryValue}&strFromMbti=${mbti}&strToMbti=${mbti}&page=${
          pageWaiting - 1
        }&size=${limit}`,
      )
      .then((res) => {
        setSearchWaitingWorryList(res.data);
      });
  }, [pageWaiting]);

  useEffect(() => {
    axios
      .get(
        `/worry-board/waiting/search?searchType=0&keyword=${queryValue}&strFromMbti=${mbti}&strToMbti=${mbti}&page=${
          pageSolved - 1
        }&size=${limit}`,
      )
      .then((res) => {
        setSearchSolvedWorryList(res.data);
      });
  }, [pageSolved]);

  const handleMatchingClick = (id: number) => {
    navigate(`/match/${id}`);
  };

  return (
    <>
      <div css={pageInfoBoxCSS}>
        <Container>
          <div css={pageInfoBoxMsgCSS}>
            '{query.get("query")}' 에 대한 M쌤 매칭 게시판 검색 결과입니다.
          </div>
        </Container>
      </div>

      <div css={boardBoxCSS}>
        <Container>
          <div css={boardTitleCSS}>M쌤 매칭을 기다리는 고민</div>

          {searchWaitingWorryList &&
            searchWaitingWorryList.result.map((matching) => (
              <MatchingComponent
                matching={matching}
                solve="waiting"
                key={matching.id}
                onClick={() => handleMatchingClick(matching.id)}
              />
            ))}
          <ListPagination
            limit={limit}
            page={pageWaiting}
            setPage={setPageWaiting}
            blockNum={blockNum}
            setBlockNum={setBlockNum}
            totalPage={totalPageWaiting}
          />
          <SelectBox />
        </Container>
      </div>

      <div css={boardBoxCSS}>
        <Container>
          <div css={boardTitleCSS}>해결 완료된 고민</div>

          {searchSolvedWorryList &&
            searchSolvedWorryList.result.map((matching) => (
              <MatchingComponent
                matching={matching}
                solve="solved"
                key={matching.id}
                onClick={() => handleMatchingClick(matching.id)}
              />
            ))}
          <ListPagination
            limit={limit}
            page={pageSolved}
            setPage={setPageSolved}
            blockNum={blockNum}
            setBlockNum={setBlockNum}
            totalPage={totalPageSolved}
          />
          <SelectBox />
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
export default MoreMatchingResult;
