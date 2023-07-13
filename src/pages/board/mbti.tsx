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

const MbtiBoardPage = () => {
  const navigate = useNavigate();
  const [mbtiSelected, setMbtiSelected] = useRecoilState(mbtiState);

  // dummy data for mbti board
  const mbtiBoardList = [
    {
      id: 1,
      name: "유보라",
      profile: "https://i.ibb.co/KN0Ty4Q/bread.png",
      thumbnail: "https://i.ibb.co/wrVDXsy/IMG-6365-23992340.png",
      mbti: "EsFP",
      badge: "엠비티어론",
      title: "카페에서 남친이랑 싸웠어",
      content: "내가 말을 '만약에'라고 시작하면 너무 기빨린대",
      createdAt: "23.06.21",
      like: 3,
      comment: 4,
    },
    {
      id: 2,
      name: "유보라",
      profile: "https://i.ibb.co/KN0Ty4Q/bread.png",
      thumbnail: "https://i.ibb.co/wrVDXsy/IMG-6365-23992340.png",
      mbti: "EsFP",
      badge: "엠비티어론",
      title: "카페에서 남친이랑 싸웠어",
      content: "내가 말을 '만약에'라고 시작하면 너무 기빨린대",
      createdAt: "23.06.21",
      like: 3,
      comment: 4,
    },
    {
      id: 3,
      name: "유보라",
      profile: "https://i.ibb.co/KN0Ty4Q/bread.png",
      thumbnail: "https://i.ibb.co/wrVDXsy/IMG-6365-23992340.png",
      mbti: "EsFP",
      badge: "엠비티어론",
      title: "카페에서 남친이랑 싸웠어",
      content: "내가 말을 '만약에'라고 시작하면 너무 기빨린대",
      createdAt: "23.06.21",
      like: 3,
      comment: 4,
    },
    {
      id: 4,
      name: "유보라",
      profile: "https://i.ibb.co/KN0Ty4Q/bread.png",
      thumbnail: "https://i.ibb.co/wrVDXsy/IMG-6365-23992340.png",
      mbti: "EsFP",
      badge: "엠비티어론",
      title: "카페에서 남친이랑 싸웠어",
      content: "내가 말을 '만약에'라고 시작하면 너무 기빨린대",
      createdAt: "23.06.21",
      like: 3,
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

  return (
    <>
      <div css={headerCSS}>
        <div css={mbtiContainerCSS}>
          <div
            css={mbtiAllCSS}
            onClick={() => setMbtiSelected("전체")}
            className={mbtiSelected === "전체" ? "active" : ""}
          >
            전체 (5,230)
          </div>
          <div css={mbtiCSS}>
            {mbtiList.map((mbti) => (
              <Mbti mbti={mbti} />
            ))}
          </div>
        </div>
      </div>
      <div css={titleBoxCSS}>{mbtiSelected} 게시판</div>
      <Container>
        <div css={buttonBoxCSS}>
          <Button text="글 쓰기" onClick={() => navigate("/board/create")} />
        </div>
        {mbtiBoardList.map((board) => (
          <BoardComponent board={board} key={board.id} />
        ))}
      </Container>
    </>
  );
};

const headerCSS = css`
  width: calc(100% + 30rem);
  margin-left: -15rem;
  background: ${COLOR.MAIN3};
  padding: 0 15rem;
`;

const titleBoxCSS = css`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
`;

const mbtiContainerCSS = css`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
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

export default MbtiBoardPage;
