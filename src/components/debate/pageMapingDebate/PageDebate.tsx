/** @jsxImportSource @emotion/react */
import DebateComponent from "../../../components/debate/debate";
import { css } from "@emotion/react";
import { useNavigate } from "react-router";
import Container from "../../../components/container/Container";
import { Debate } from "../../../interfaces/debate";
import COLOR from "../../../styles/color";
import SelectBox from "../../Pagination/SelectBox";
import ListPagination from "../../Pagination/ListPagination";
import { useState } from "react";
import { useDebatePaging } from "../../../hooks/debate/useDebatePaging";

interface Props {
    pathMov: string;
    postId: number;
  }
const PageDebate: React.FC<Props> = ({pathMov, postId}) => {
  const navigate = useNavigate();
  const [blockNum, setBlockNum] = useState(0); //블록 설정하는 함수
  const [page, setPage] = useState(1);
  const debateLists = useDebatePaging(pathMov, page-1, postId);
  const limit = 6; //한 페이지당 아이템의 개수
  const totalPage = debateLists ? debateLists.totalSize : 1; //전체 페이지 수
  return (
    <Container addCSS={containerCSS}>
      <div>
        {debateLists &&
          debateLists.result.map((debate: Debate, index: number) => (
            <DebateComponent
              debate={debate}
              key={debate.id}
              index={index}
              mode={pathMov}
            />
          ))}
      </div>
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
  );
};

export default PageDebate;

const containerCSS = css`
  background: ${COLOR.WHITE};
  padding: 1rem 0 0 0;
`;
