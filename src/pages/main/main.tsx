/** @jsxImportSource @emotion/react */
import Text from "../../components/text/Text";
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import { useHotBoard } from "../../hooks/main/useHotBoard";
import Hot from "../../components/main/Hot";
import FONT from "../../styles/font";
import NotLoginComponent from "../../components/auth/NotLogin";
import LoginComponent from "../../components/auth/Login";
import { HotBoard } from "../../interfaces/board";
import { useHotDebate } from "../../hooks/main/useHotDebate";
import { useNavigate } from "react-router";
import HotBoardComponent from "../../components/main/HotBoard";
import { useHotThree } from "../../hooks/main/useHotThree";
import Container from "../../components/container/Container";
import { useEffect, useState } from "react";
import { useMainMatching } from "../../hooks/main/useMainMatching";
import { useMainTheacher } from "../../hooks/main/useMainTeacher";
import { Debate } from "../../interfaces/debate";
import HotDebateComponent from "../../components/main/HotDebate";
import useMemberInfo from "../../hooks/user/useMemberInfo";
import { MainMatching, MainTeacher } from "../../interfaces/matching";
import HotWorryComponent from "../../components/main/HotWorry";
import Mssaem from "../../components/matching/Mssaem";
import { User } from "../../interfaces/user";

const MainPage = () => {
  const { hotThree } = useHotThree();
  const { hotBoards } = useHotBoard();
  const { hotDebates, refetch } = useHotDebate();
  const { mainMatching } = useMainMatching();
  const { mainTeacher } = useMainTheacher();
  const [selected, setSelected] = useState(0);
  const [info, setInfo] = useState<User | undefined>(undefined);
  const { user } = useMemberInfo();
  const [isLoadingTime, setIsLoadingTime] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setInfo(user);
    };
    fetchData();
  }, [user]);

  const gridContainerCSS = css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    > *:nth-of-type(2n + 1) {
      border-right: 1px solid ${COLOR.MAIN};
      padding-right: 1rem;
    }

    > *:nth-of-type(1),
    > *:nth-of-type(2) {
      ${Array.isArray(mainMatching) &&
      mainMatching.length > 2 &&
      `
      border-bottom: 1px solid ${COLOR.MAIN};
    `}
    }

    > *:nth-of-type(3),
    > *:nth-of-type(4) {
      ${Array.isArray(mainMatching) &&
      mainMatching.length > 4 &&
      `
      border-bottom: 1px solid ${COLOR.MAIN};
    `}
    }
  `;
  const handleHotDebatesClick = () => {
    setIsLoadingTime(true); 
    refetch();
    setIsLoadingTime(false);
  };
  useEffect(() => {
    setIsLoadingTime(true);
    refetch();
  }, [refetch, isLoadingTime]);
  return (
    <>
      <div css={headerCSS}>
        <Hot
          title={hotThree && hotThree.boardTitle}
          content={"지금의 게시글"}
          key={hotThree && `${hotThree.boardId}`}
          id={hotThree && hotThree.boardId}
          category="board"
        />
        <Hot
          title={hotThree && hotThree.discussionTitle}
          content={"지금의 토론"}
          key={hotThree && `${hotThree.discussionId}`}
          id={hotThree && hotThree.discussionId}
          category="debate"
        />
        <Hot
          title={hotThree && hotThree.worryBoardTitle}
          content={"고민 그만! M쌤 매칭"}
          key={hotThree && `${hotThree.worryBoardId}`}
          id={hotThree && hotThree.worryBoardId}
          category="match"
        />
        {info ? <LoginComponent user={info} /> : <NotLoginComponent />}
      </div>

      <div css={plusBoxCSS}>
        <Text addCSS={textCSS}>HOT 게시글</Text>
        <div css={plusCSS} onClick={() => navigate("hotBoard")}>
          더보기
        </div>
      </div>
      <div css={hotBoardBoxCSS}>
        {Array.isArray(hotBoards) &&
          hotBoards.map((hotboard: HotBoard) => (
            <HotBoardComponent hotBoard={hotboard} key={hotboard.id} />
          ))}
      </div>
      <hr css={hrCSS} />

      <div css={plusBoxCSS}>
        <Text addCSS={textCSS}>HOT 토론</Text>
        <div css={plusCSS} onClick={() => navigate("hotDebate")}>
          더보기
        </div>
      </div>
      <div css={hotDebateBoxCSS} onClick={handleHotDebatesClick}>
        {Array.isArray(hotDebates) &&
          hotDebates.map((hotDebate: Debate) => (
            <HotDebateComponent hotDebate={hotDebate} key={hotDebate.id} />
          ))}
      </div>
      <hr css={hrCSS} />
      <Container addCSS={containerCSS}>
        <div css={bottomTitleBoxCSS}>
          <div
            css={bottomTitleCSS}
            onClick={() => setSelected(0)}
            className={selected === 0 ? "active" : ""}
          >
            M샘 매칭을 기다리는 고민
          </div>
          <div
            css={bottomTitleCSS}
            onClick={() => setSelected(1)}
            className={selected === 1 ? "active" : ""}
          >
            인기 M쌤
          </div>
        </div>
        <div>
          {selected === 0 && Array.isArray(mainMatching) && (
            <div css={gridContainerCSS}>
              {mainMatching.map((hotWorry: MainMatching) => (
                <HotWorryComponent hotWorry={hotWorry} key={hotWorry.id} />
              ))}
            </div>
          )}

          {selected === 1 && Array.isArray(mainTeacher) && (
            <div css={MssaemCenterCSS}>
              {mainTeacher.map((hotboard: MainTeacher) => (
                <Mssaem mssaem={hotboard} key={hotboard.id} css={MssaemCSS} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default MainPage;

const containerCSS = css`
  padding: 0rem;
`;
const textCSS = css`
  margin: 1rem 0;
`;

const headerCSS = css`
  width: calc(100% + 30rem);
  margin-left: -15rem;
  background: ${COLOR.MAIN4};
  padding: 2.8rem 15rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 15rem;
`;

const hotBoardBoxCSS = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const hotDebateBoxCSS = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2rem;
`;

const plusBoxCSS = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const plusCSS = css`
  font-size: ${FONT.SIZE.BODY};
  font-weight: ${FONT.WEIGHT.REGULAR};
  color: ${COLOR.GRAY2};
  text-decoration: underline;
  cursor: pointer;
`;

const hrCSS = css`
  width: 100%;
  border: 1px solid ${COLOR.GRAY4};
  margin-top: 3rem;
`;

const bottomTitleBoxCSS = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const bottomTitleCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2rem 0;

  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  border-bottom: 4px solid ${COLOR.MAIN4};
  color: ${COLOR.GRAY2};
  cursor: pointer;

  &.active {
    color: ${COLOR.MAIN2};
    border-bottom: 4px solid ${COLOR.MAIN};
  }
`;

const MssaemCSS = css`
  display: flex;
  margin-bottom: 2rem;
`;

const MssaemCenterCSS = css`
  justify-content: center;
  display: flex;
  margin-bottom: 2rem;
`;
