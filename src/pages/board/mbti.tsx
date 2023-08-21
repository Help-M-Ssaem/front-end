/** @jsxImportSource @emotion/react */
import Container from "../../components/container/Container";
import BoardComponent from "../../components/board/Board";
import Button from "../../components/button/Button";
import { css } from "@emotion/react";
import { useNavigate } from "react-router";
import FONT from "../../styles/font";
import Mbti from "../../components/mbti/Mbti";
import COLOR from "../../styles/color";
import { useRecoilState } from "recoil";
import { mbtiState } from "../../states/board";
import { useEffect, useState } from "react";
import Text from "../../components/text/Text";
import ListPagination from "../../components/Pagination/ListPagination";
import SelectBox from "../../components/Pagination/SelectBox";
import { BoardList } from "../../interfaces/board";
import { mssaemAxios as axios } from "../../apis/axios";
import { useCategoryBookmark } from "../../hooks/board/category/useCategoryBookmark";
import { useCategoryCount } from "../../hooks/board/category/useCategoryCount";

const mbtiList = [
  "ISTJ",
  "ISFJ",
  "INFJ",
  "INTJ",
  "ISTP",
  "ISFP",
  "INFP",
  "INTP",
  "ESTP",
  "ESFP",
  "ENFP",
  "ENTP",
  "ESTJ",
  "ESFJ",
  "ENFJ",
  "ENTJ",
];

const MbtiBoardPage = () => {
  const navigate = useNavigate();
  const [mbtiSelected, setMbtiSelected] = useRecoilState(mbtiState);
  const [boardList, setBoardList] = useState<BoardList>();
  const { categoryBookmark } = useCategoryBookmark();
  const { categoryCount } = useCategoryCount();

  const limit = 10;
  const totalPage = boardList ? boardList.totalSize : 1;
  const [page, setPage] = useState(1);
  const [blockNum, setBlockNum] = useState(0);

  const [containerKey, setContainerKey] = useState(0);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    setContainerKey((prevKey) => prevKey + 1);
  }, [mbtiSelected]);

  useEffect(() => {
    if (mbtiSelected === "전체") {
      axios.get(`/boards?page=${page - 1}&size=${limit}`).then((res) => {
        setBoardList(res.data);
      });
    } else {
      axios
        .get(`/boards/mbti?mbti=${mbtiSelected}&page=${page - 1}&size=${limit}`)
        .then((res) => setBoardList(res.data));
    }
  }, [mbtiSelected, page]);

  return (
    <>
      <div css={headerCSS}>
        <div css={mbtiTitleCSS}>MBTI 별 게시판</div>
        <div css={mbtiContainerCSS}>
          <div
            css={mbtiAllCSS}
            onClick={() => setMbtiSelected("전체")}
            className={mbtiSelected === "전체" ? "active" : ""}
          >
            전체 ({categoryCount && categoryCount.boardCount})
          </div>
          <div css={mbtiCSS}>
            {mbtiList.map((mbti, index) => {
              let isBookmarked = false;
              if (categoryBookmark && Array.isArray(categoryBookmark)) {
                for (const bookmark of categoryBookmark) {
                  if (bookmark.mbti[0] === mbti) {
                    isBookmarked = true;
                    break;
                  }
                }
              }
              return <Mbti key={index} mbti={mbti} bookmark={isBookmarked} />;
            })}
          </div>
        </div>
      </div>

      <Container key={containerKey} addCSS={containerCSS}>
        <div css={buttonBoxCSS}>
          <Text>{mbtiSelected} 게시판</Text>
          {token && (
            <Button onClick={() => navigate("/board/create")}>글 쓰기</Button>
          )}
        </div>
        {boardList &&
          boardList.result.map((board) => (
            <BoardComponent
              board={board}
              key={board.id}
              onClick={() => navigate(`/board/${board.id}`)}
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
        <SelectBox />
      </Container>
    </>
  );
};

export default MbtiBoardPage;

const containerCSS = css`
  margin-top: 1rem;
`;

const headerCSS = css`
  width: calc(100% + 30rem);
  margin-left: -15rem;
  background: ${COLOR.MAIN3};
  padding: 0 15rem;
`;

const mbtiContainerCSS = css`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  border-top: 1px solid ${COLOR.MAIN};
`;

const mbtiTitleCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  color: ${COLOR.MAIN2};
  text-align: center;
  padding: 1.5rem 0;
`;

const mbtiAllCSS = css`
  width: 30%;
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  color: ${COLOR.GRAY2};
  padding-top: 0.5rem;
  cursor: pointer;

  &:hover,
  &.active {
    color: ${COLOR.MAINDARK};
    font-weight: ${FONT.WEIGHT.MEDIUM};
    text-decoration: underline;
    transition: 0.3s;
  }
`;

const mbtiCSS = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const buttonBoxCSS = css`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
  align-items: center;
  border-bottom: 1px solid ${COLOR.MAIN};
`;
