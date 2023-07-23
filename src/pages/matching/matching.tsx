/** @jsxImportSource @emotion/react */
import Container from "../../components/container/Container";
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import MatchingComponent from "../../components/matching/Matching";
import Text from "../../components/text/Text";
import Mssaem from "../../components/matching/Mssaem";

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

const mssaemList = [
  {
    id: 1,
    profile: "https://i.ibb.co/wrVDXsy/IMG-6365-23992340.png",
    name: "유보라",
    mbti: "ESFP",
    badge: "엠비티어론",
    title: "진짜 어른이 되고 싶은 어른이에요",
  },
  {
    id: 2,
    profile: "https://i.ibb.co/wrVDXsy/IMG-6365-23992340.png",
    name: "유보라",
    mbti: "ESFP",
    badge: "엠비티어론",
    title: "진짜 어른이 되고 싶은 어른이에요",
  },
  {
    id: 3,
    profile: "https://i.ibb.co/wrVDXsy/IMG-6365-23992340.png",
    name: "유보라",
    mbti: "ESFP",
    badge: "엠비티어론",
    title: "진짜 어른이 되고 싶은 어른이에요",
  },
  {
    id: 4,
    profile: "https://i.ibb.co/wrVDXsy/IMG-6365-23992340.png",
    name: "유보라",
    mbti: "ESFP",
    badge: "엠비티어론",
    title: "진짜 어른이 되고 싶은 어른이에요",
  },
];

const MatchingPage = () => {
  const navigate = useNavigate();

  const handleMatchingClick = (id: number) => {};

  return (
    <>
      <div css={headerCSS}>
        <div css={mbtiTitleCSS}>인기 M쌤</div>
        <div css={mssaemListCSS}>
          {mssaemList &&
            mssaemList.map((mssaem) => (
              <Mssaem mssaem={mssaem} key={mssaem.id} />
            ))}
        </div>
      </div>
      <Text>M쌤 매칭을 기다리는 고민</Text>
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
  padding: 2rem 15rem;
`;

const mssaemListCSS = css`
  display: flex;
`;

const mbtiTitleCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  color: ${COLOR.MAIN2};
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${COLOR.MAIN};
`;

const buttonBoxCSS = css`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;
