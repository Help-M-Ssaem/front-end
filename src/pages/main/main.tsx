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
import { useState } from "react";
import { useMainMatching } from "../../hooks/main/useMainMatching";
import { useMainTheacher } from "../../hooks/main/useMainTeacher";

const user = {
  id: 1,
  name: "김보라",
  image: "https://i.ibb.co/wrVDXsy/IMG-6365-23992340.png",
  mbti: "EsFP",
  badge: "엠비티어론",
};

const MainPage = () => {
  const { hotThree } = useHotThree();
  const { hotBoards } = useHotBoard();
  const { hotDebates } = useHotDebate();
  const { mainMatching } = useMainMatching();
  const { mainTeacher } = useMainTheacher();
  const [selected, setSelected] = useState(0);

  const navigate = useNavigate();

  return (
    <>
      <div css={headerCSS}>
        {hotThree && (
          <>
            <Hot
              title={hotThree.boardTitle}
              content={hotThree.boardContent}
              key={hotThree.boardId}
            />
            <Hot
              title={hotThree.discussionTitle}
              content={hotThree.discussionContent}
              key={hotThree.discussionId}
            />
            <Hot
              title={hotThree.worryBoardTitle}
              content={hotThree.worryBoardContent}
              key={hotThree.worryBoardId}
            />
          </>
        )}
        <NotLoginComponent />
        {/* TODO: 로그인 구현되면 수정 <LoginComponent user={user} /> */}
      </div>

      <div css={plusBoxCSS}>
        <Text>HOT 게시글</Text>
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
        <Text>HOT 토론</Text>
        <div css={plusCSS} onClick={() => navigate("hotDebate")}>
          더보기
        </div>
      </div>
      <hr css={hrCSS} />

      <Container style={{ padding: "0" }}>
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
        <div></div>
      </Container>
    </>
  );
};

export default MainPage;

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
