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

const hotboardlist = [
  {
    id: 1,
    category: "지금의 게시글",
    title: "어제 강남 러쉬에서 만난 대문자 E 직원",
    hot: true,
  },
  {
    id: 2,
    category: "지금의 게시글",
    title: "어제 강남 러쉬에서 만난 대문자 E 직원",
    hot: true,
  },
  {
    id: 3,
    category: "지금의 게시글",
    title: "어제 강남 러쉬에서 만난 대문자 E 직원",
    hot: false,
  },
];

const user = {
  id: 1,
  name: "김보라",
  image: "https://i.ibb.co/wrVDXsy/IMG-6365-23992340.png",
  mbti: "EsFP",
  badge: "엠비티어론",
};

const MainPage = () => {
  const { hotBoards } = useHotBoard();
  const { hotDebates } = useHotDebate();
  const navigate = useNavigate();

  return (
    <>
      <div css={headerCSS}>
        {hotboardlist &&
          hotboardlist.map((hotboard) => (
            <Hot board={hotboard} key={hotboard.id} />
          ))}
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
