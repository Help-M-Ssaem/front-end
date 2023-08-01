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
import { useBoardList } from "../../hooks/board/useBoardList";
import { BoardList } from "../../interfaces/board";
import { mssaemAxios as axios } from "../../apis/axios";

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

  // TODO: 페이지네이션 구현되면 page, size 수정
  const { boardListAll } = useBoardList(0, 10);

  useEffect(() => {
    if (mbtiSelected === "전체") {
      axios.get(`/boards?page=${0}&size=${10}`).then((res) => {
        setBoardList(res.data);
      });
    } else {
      axios
        .get(`/boards/mbti?mbti=${mbtiSelected}&page=${0}&size=${10}`)
        .then((res) => setBoardList(res.data));
    }
  }, [mbtiSelected]);

  useEffect(() => {
    setMbtiSelected("전체");
  }, []);

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
            전체 ({boardListAll && `${boardListAll.result.length}`})
          </div>
          <div css={mbtiCSS}>
            {mbtiList.map((mbti) => (
              <Mbti mbti={mbti} />
            ))}
          </div>
        </div>
      </div>

      <Text>{mbtiSelected} 게시판</Text>
      <Container>
        <div css={buttonBoxCSS}>
          <Button onClick={() => navigate("/board/create")}>글 쓰기</Button>
        </div>
        {boardList &&
          boardList.result.map((board) => (
            <BoardComponent
              board={board}
              key={board.id}
              onClick={() => navigate(`/board/${board.id}`)}
            />
          ))}
      </Container>
    </>
  );
};

export default MbtiBoardPage;

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
  justify-content: flex-end;
  margin-bottom: 1rem;
`;
