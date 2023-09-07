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
import { useSearchDebateList } from "../../hooks/search/useSearchDebateList";
import { SearchDebateList } from "../../interfaces/moresearch";
import DebateComponent from "../../components/debate/debate";
import { Debate } from "../../interfaces/debate";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const MoreDebateResult = () => {
  let query = useQuery();
  const navigate = useNavigate();
  const [searchDebateList, setSearchDebateList] = useState<SearchDebateList>();
  const limit = 10; //한 페이지당 아이템의 개수
  const [page, setPage] = useState(1); // 현재 페이지 설정하는 함수

  const queryValue = query.get("query") || ""; // null값일 때 빈 문자열로
  const searchTypeValue = Number(query.get("searchType")) || 0;
  const searchData = useSearchDebateList(
    searchTypeValue,
    queryValue,
    page,
    limit,
  );

  useEffect(() => {
    setSearchDebateList(searchData.searchDebateList);
  }, [searchData.searchDebateList]);
  // console.log(searchBoardList && searchBoardList.result);

  const totalPage = searchDebateList ? searchDebateList.totalSize : 1; //전체 페이지
  const [blockNum, setBlockNum] = useState(0); //블록 설정하는 함수

  useEffect(() => {
    axios
      .get(
        `/discussions/search?searchType=${searchTypeValue}&keyword=${queryValue}&page=${
          page - 1
        }&size=${limit}`,
      )
      .then((res) => {
        setSearchDebateList(res.data);
      });
  }, [page]);

  return (
    <>
      <div css={pageInfoBoxCSS}>
        <Container>
          <div css={pageInfoBoxMsgCSS}>
            '{query.get("query")}' 에 대한 토론 게시판 검색 결과입니다.
          </div>
        </Container>
      </div>

      <div css={boardBoxCSS}>
        <Container>
          <div css={boardTitleCSS}>토론 게시판</div>

          {searchDebateList &&
            searchDebateList.result.map((debate: Debate, index) => (
              <DebateComponent
                debate={debate}
                key={debate.id}
                index={index}
                mode="discusstion"
              />
            ))}
          <div css={pagenationCSS}>
            <ListPagination
              limit={limit}
              page={page}
              setPage={setPage}
              blockNum={blockNum}
              setBlockNum={setBlockNum}
              totalPage={totalPage}
            />
          </div>
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

const pagenationCSS = css`
  border-top: none;
`;
export default MoreDebateResult;
