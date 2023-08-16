/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import FONT from "../../styles/font";
import Text from "../../components/text/Text";
import ListPagination from "../../components/Pagination/ListPagination";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/search/SearchBar";
import Container from "../../components/container/Container";
import { BoardList } from "../../interfaces/board";
import BoardComponent from "../../components/board/Board";
import { useBoardListAll } from "../../hooks/board/useBoardList";
import SelectBox from "../../components/Pagination/SelectBox";
import { useLocation } from "react-router-dom";
import { mssaemAxios as axios } from "../../apis/axios";
import COLOR from "../../styles/color";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const MoreBoardResult = () => {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState<BoardList>();

  const limit = 10; //한 페이지당 아이템의 개수
  const { boardListAll } = useBoardListAll(1, limit);

  const totalPage = boardListAll ? boardListAll.totalSize : 1; //전체 페이지 수
  const pageNum = boardListAll ? boardListAll.page : 1;
  const [page, setPage] = useState(pageNum); // 현재 페이지 설정하는 함수
  const [blockNum, setBlockNum] = useState(0); //블록 설정하는 함수

  let query = useQuery();

  async function changePage(page: number) {
    let { data } = await axios.get(
      `/boards/search?page=${page}&size=${limit}`,
      {
        // strMbti: 'ALL',
      },
    );
    setBoardList(data);
  }

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

          {boardList &&
            boardList.result.map((board) => (
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
    border-top: none;
  }
  border-top: 0.625rem solid ${COLOR.ALARM};
`;
export default MoreBoardResult;
