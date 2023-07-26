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
import { RightArrowIcon, SmallArrowIcon } from "../../assets/CommonIcons";
import { useState } from "react";

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

const mbtiList = [
  "전체",
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

const MatchingPage = () => {
  const navigate = useNavigate();
  const [openMbti1, setOpenMbti1] = useState(false);
  const [openMbti2, setOpenMbti2] = useState(false);
  const [mbti1, setMbti1] = useState("전체");
  const [mbti2, setMbti2] = useState("전체");

  const handleOpenMbti1 = () => {
    setOpenMbti1(!openMbti1);
    setOpenMbti2(false);
  };
  const handleOpenMbti2 = () => {
    setOpenMbti2(!openMbti2);
    setOpenMbti1(false);
  };

  const handleMbti1Click = (mbti: string) => {
    setOpenMbti1(false);
    setMbti1(mbti);
  };
  const handleMbti2Click = (mbti: string) => {
    setOpenMbti2(false);
    setMbti2(mbti);
  };

  // TODO: Matching 고민글 디테일 페이지로 이동
  const handleMatchingClick = (id: number) => {
    navigate(`/match/${id}`);
  };

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
          <div css={mbtiBoxCSS}>
            <div css={mbtiSelectBoxCSS}>
              <div css={mbtiCSS} onClick={handleOpenMbti1}>
                {mbti1} <SmallArrowIcon />
              </div>
              {openMbti1 && (
                <div css={categoryBoxCSS}>
                  {mbtiList.map((mbti) => (
                    <div
                      css={categoryCSS}
                      onClick={() => handleMbti1Click(mbti)}
                    >
                      {mbti}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <RightArrowIcon />

            <div css={mbtiSelectBoxCSS}>
              <div css={mbtiCSS} onClick={handleOpenMbti2}>
                {mbti2} <SmallArrowIcon />
              </div>
              {openMbti2 && (
                <div css={categoryBoxCSS}>
                  {mbtiList.map((mbti) => (
                    <div
                      css={categoryCSS}
                      onClick={() => handleMbti2Click(mbti)}
                    >
                      {mbti}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
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

const mbtiBoxCSS = css`
  display: flex;
  align-items: center;
`;

const mbtiSelectBoxCSS = css`
  display: flex;
  align-items: center;
  position: relative;
`;

const mbtiCSS = css`
  dispaly: flex;
  align-items: center;

  background: ${COLOR.WHITE};
  border: 1px solid ${COLOR.GRAY4};

  font-weight: ${FONT.WEIGHT.REGULAR};
  font-size: ${FONT.SIZE.BODY};
  color: ${COLOR.GRAY2};

  padding: 0.3rem 0.5rem;
  margin-right: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const categoryBoxCSS = css`
  display: flex;
  flex-wrap: wrap;
  width: 20rem;

  border: 1px solid ${COLOR.GRAY4};
  border-radius: 1rem;
  padding: 1rem 1rem 1rem 2rem;
  margin-bottom: 1rem;

  position: absolute;
  left: 0;
  top: 2rem;
  background: ${COLOR.WHITE};
  z-index: 1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const categoryCSS = css`
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  color: ${COLOR.GRAY2};
  cursor: pointer;
  padding: 0.5rem 0;
  width: 3.3rem;
`;

const buttonBoxCSS = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
