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
import { useState } from "react";
import BoardDetail from "../../components/board/BoardDetail";
import { Board } from "../../interfaces/board";
import Text from "../../components/text/Text";

// TODO: mbtiBoardList 서버 연동
const mbtiBoardList = [
  {
    id: 1,
    name: "유보라",
    profile: "https://i.ibb.co/njkbL5W/react-query.png",
    thumbnail: "https://i.ibb.co/wrVDXsy/IMG-6365-23992340.png",
    mbti: "EsFP",
    badge: "엠비티어론",
    title: "카페에서 남친이랑 싸웠어",
    content:
      "내가 말을 '만약에'라고 시작하면 너무 기빨린대 내가 말을 '만약에'라고 시작하면 너무 기빨린대내가 말을 '만약에'라고 시작하면 너무 기빨린대내가 말을 '만약에'라고 시작하면 너무 기빨린대내가 말을 '만약에'라고 시작하면 너무 기빨린대",
    createdAt: "2023.06.14 19:07",
    like: 3,
    comment: 4,
  },
  {
    id: 2,
    name: "김보라",
    profile: "https://i.ibb.co/BVDQKL0/image.png",
    thumbnail: "https://i.ibb.co/wrVDXsy/IMG-6365-23992340.png",
    mbti: "EsFP",
    badge: "엠비티어론",
    title: "엠비티아이 신기하다",
    content: "내가 말을 '만약에'라고 시작하면 너무 기빨린대",
    createdAt: "2023.06.14 19:07",
    like: 4,
    comment: 4,
  },
  {
    id: 3,
    name: "박보라",
    profile: "https://i.ibb.co/KN0Ty4Q/bread.png",
    thumbnail: "https://i.ibb.co/wrVDXsy/IMG-6365-23992340.png",
    mbti: "EsFP",
    badge: "엠비티어론",
    title: "박보라박보라박보라박브레드?",
    content: "내가 말을 '만약에'라고 시작하면 너무 기빨린대",
    createdAt: "2023.06.14 19:07",
    like: 5,
    comment: 4,
  },
];

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
  const [boardClicked, setBoardClicked] = useState(false);
  const [mbtiBoard, setMbtiBoard] = useState<Board | null>(null);

  const handleBoardClick = (id: number) => {
    const selectedBoard = mbtiBoardList.find((board) => board.id === id);
    setMbtiBoard(selectedBoard || null);
    setBoardClicked(true);
    window.scrollTo(0, 0);
  };

  const handleBoardDelete = () => {};

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
            전체 (
            {mbtiBoardList &&
              mbtiBoardList.length > 0 &&
              `${mbtiBoardList.length}`}
            )
          </div>
          <div css={mbtiCSS}>
            {mbtiList.map((mbti) => (
              <Mbti mbti={mbti} />
            ))}
          </div>
        </div>
      </div>

      {/* board detail */}
      {boardClicked && (
        <>
          <Container
            style={{
              marginTop: "1rem",
            }}
          >
            <div css={buttonBoxCSS}>
              {/* TODO: 로그인 구현되면 수정 */}
              <Button
                onClick={() => navigate("/board/update")}
                style={{ marginRight: "0.5rem", background: COLOR.MAIN }}
              >
                수정
              </Button>
              <Button onClick={handleBoardDelete}>삭제</Button>
            </div>
            <BoardDetail board={mbtiBoard!} />
          </Container>
        </>
      )}

      {/* board all */}
      <Text>{mbtiSelected} 게시판</Text>
      <Container>
        <div css={buttonBoxCSS}>
          <Button onClick={() => navigate("/board/create")}>글 쓰기</Button>
        </div>
        {mbtiBoardList.map((board) => (
          <BoardComponent
            board={board}
            key={board.id}
            onClick={() => handleBoardClick(board.id)}
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


