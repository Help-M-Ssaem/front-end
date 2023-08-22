/** @jsxImportSource @emotion/react */
import Container from "../../components/container/Container";
import HotBoardComponent from "../../components/main/HotBoard";
import { useHotBoardMore } from "../../hooks/main/useHotBoardMore";
import Text from "../../components/text/Text";
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import ListPagination from "../../components/Pagination/ListPagination";
import SelectBox from "../../components/Pagination/SelectBox";
import { useState } from "react";

const HotBoardPage = () => {
  const limit = 6; //한 페이지에 보여주고자 하는 게시글 수
  const { hotBoardMore } = useHotBoardMore(1, limit);
  const totalPage = hotBoardMore ? hotBoardMore.totalSize : 6; //전체 페이지 수
  const pageNum = hotBoardMore ? hotBoardMore.page : 1;
  const [page, setPage] = useState(pageNum);
  const [blockNum, setBlockNum] = useState(0); //블록 번호 (1~10 에서 11~블록으로 넘어갈때)

  return (
    <>
      <Text addCSS={textCSS}>HOT 게시글</Text>
      <Container>
        {hotBoardMore &&
          Array.isArray(hotBoardMore.result) &&
          hotBoardMore.result.map((hotBoard) => (
            <HotBoardComponent
              hotBoard={hotBoard}
              key={hotBoard.id}
              addCSS={hotBoardCSS}
            />
          ))}
        <ListPagination
          limit={limit}
          page={page}
          setPage={setPage}
          blockNum={blockNum}
          setBlockNum={setBlockNum}
          totalPage={totalPage}
        />
        <SelectBox boardName={"mbtiboard"} />
      </Container>
    </>
  );
};

export default HotBoardPage;

const textCSS = css`
  margin: 1rem 0;
`;

const hotBoardCSS = css`
  width: 100%;
  border-radius: 0;
  border-top: 1px solid ${COLOR.MAIN};
  margin-bottom: 0;
`;
