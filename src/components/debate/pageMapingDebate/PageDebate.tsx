/** @jsxImportSource @emotion/react */
import DebateComponent from "../../../components/debate/debate";
import { css } from "@emotion/react";
import { useNavigate } from "react-router";
import Container from "../../../components/container/Container";
import { Debate } from "../../../interfaces/debate";
import COLOR from "../../../styles/color";
import SelectBox from "../../Pagination/SelectBox";
import ListPagination from "../../Pagination/ListPagination";
import { useEffect, useState } from "react";
import { useDebatePaging } from "../../../hooks/debate/useDebatePaging";
import Button from "../../button/Button";
import Text from "../../text/Text";

interface Props {
  pathMov: string;
  postId: number;
}
const PageDebate: React.FC<Props> = ({ pathMov, postId }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [blockNum, setBlockNum] = useState(0); //블록 설정하는 함수
  const [page, setPage] = useState(1);
  const { debateList, refetch } = useDebatePaging(pathMov, page - 1, postId);
  const limit = 6; //한 페이지당 아이템의 개수
  const totalPage = debateList ? debateList.totalSize : 1; //전체 페이지 수
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  useEffect(() => {
    setPage(page);
    refetch();
  }, [page, refetch]);

  return (
    <Container addCSS={containerCSS}>
      <div>
        {debateList &&
          debateList.result.map((debate: Debate, index: number) => (
            <DebateComponent
              debate={debate}
              key={debate.id}
              index={index}
              mode={pathMov}
            />
          ))}
          {/* 게시글이 아예 없을 경우 처리 */}
          {debateList &&!debateList.result.length && 
            <div css={[debateBoxCSS]} >
              <div css={buttonBoxCSS}>
                {pathMov === "discusstion" ? <Text>MBTI 과몰입 토론</Text> : <Text>HOT 토론글</Text>}
                {token &&<Button onClick={() => navigate("/debate/create")}>글 쓰기</Button>}
              </div>
            </div>
          }
      </div>
      <ListPagination
        limit={limit}
        page={page}
        setPage={handlePageChange}
        blockNum={blockNum}
        setBlockNum={setBlockNum}
        totalPage={totalPage}
      />
      <SelectBox boardName={"discussion"} />
    </Container>
  );
};

export default PageDebate;

const containerCSS = css`
  background: ${COLOR.WHITE};
  padding: 1rem 0 0 0;
`;

const debateBoxCSS = css`
    padding: 0 1.5rem 1.5rem 1.5rem;
    margin: 0 0 4rem 0;
    background: ${COLOR.MAIN3};
    border-radius: 1.4rem;
    position: relative;
  `;

  const buttonBoxCSS = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top:1.5rem;
  border-bottom: 1px solid ${COLOR.MAIN};
  padding-bottom: 1.4rem;
`;
