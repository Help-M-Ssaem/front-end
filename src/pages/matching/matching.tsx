/** @jsxImportSource @emotion/react */
import Container from "../../components/container/Container";
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import MatchingComponent from "../../components/matching/Matching";

// TODO: matchingList 서버 연동
const matchingList = [
  {
    id: 1,
    thumbnail: "https://i.ibb.co/wrVDXsy/IMG-6365-23992340.png",
    title: "학생회장 선배 도와주세요ㅠㅠ",
    content: "마음이 있는 것 같나요?",
    createdAt: "2분전",
    mbti1: "EsFP",
    mbti2: "ISTJ",
    color1: "#94E3F8",
    color2: "#F8CAFF",
  },
  {
    id: 2,
    thumbnail: "https://i.ibb.co/wrVDXsy/IMG-6365-23992340.png",
    title: "학생회장 선배 도와주세요ㅠㅠ",
    content: "마음이 있는 것 같나요?",
    createdAt: "2분전",
    mbti1: "EsFP",
    mbti2: "ISTJ",
    color1: "#94E3F8",
    color2: "#F8CAFF",
  },
  {
    id: 3,
    thumbnail: "https://i.ibb.co/wrVDXsy/IMG-6365-23992340.png",
    title: "학생회장 선배 도와주세요ㅠㅠ",
    content: "마음이 있는 것 같나요?",
    createdAt: "2분전",
    mbti1: "EsFP",
    mbti2: "ISTJ",
    color1: "#94E3F8",
    color2: "#F8CAFF",
  },
];

const MatchingPage = () => {
  const navigate = useNavigate();

  const handleMatchingClick = (id: number) => {};

  return (
    <>
      <div css={headerCSS}>
        <div css={mbtiTitleCSS}>인기 M쌤</div>
      </div>
      <div css={titleBoxCSS}>전체 매칭</div>
      <Container>
        <div css={buttonBoxCSS}>
          <Button onClick={() => navigate("/match/create")}>글 쓰기</Button>
        </div>
        {matchingList.map((matching) => (
          <MatchingComponent
            matching={matching}
            key={matching.id}
            onClick={() => handleMatchingClick(matching.id)}
          />
        ))}
      </Container>
    </>
  );
};

export default MatchingPage;

const headerCSS = css`
  width: calc(100% + 30rem);
  margin-left: -15rem;
  background: ${COLOR.MAIN3};
  padding: 0 15rem;
`;

const mbtiTitleCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  color: ${COLOR.MAIN2};
  padding: 1.5rem 0;
`;

const titleBoxCSS = css`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
`;

const buttonBoxCSS = css`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;
