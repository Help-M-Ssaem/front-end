/** @jsxImportSource @emotion/react */
import Text from "../../components/text/Text";
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import { useHotBoard } from "../../hooks/main/useHotBoard";
import Hot from "../../components/main/Hot";
import Profile from "../../components/profile/Profile";
import FONT from "../../styles/font";
import NotLoginComponent from "../../components/auth/NotLogin";
import LoginComponent from "../../components/auth/Login";
import { HotBoard } from "../../interfaces/board";
import { useHotDebate } from "../../hooks/main/useHotDebate";
import { useNavigate } from "react-router";

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
  const { hotBoard } = useHotBoard();
  const { hotDebate } = useHotDebate();
  const navigate = useNavigate();

  return (
    <>
      <div css={headerCSS}>
        {hotboardlist &&
          hotboardlist.map((hotboard) => (
            <Hot board={hotboard} key={hotboard.id} />
          ))}
        <NotLoginComponent />
        {/* <LoginComponent user={user} /> */}
      </div>

      <div css={plusBoxCSS}>
        <Text>HOT 게시글</Text>
        <div css={plusCSS} onClick={() => navigate("hotBoard")}>
          더보기
        </div>
      </div>
      <div css={hotBoardBoxCSS}>
        {hotBoard &&
          hotBoard.map((board: HotBoard) => (
            <div css={containerCSS} key={board.id}>
              <div css={leftCSS}>
                <div css={profileCSS}>
                  <Profile
                    image={board.memberSimpleInfo.profileImgUrl}
                    name={board.memberSimpleInfo.nickName}
                    mbti={board.memberSimpleInfo.mbtiEnum}
                    badge={board.memberSimpleInfo.badge}
                  />
                </div>
                <div css={titleCSS}>{board.title}</div>
                <div css={contentCSS}>
                  {board.content.length > 30
                    ? `${board.content.slice(0, 30)}...`
                    : board.content}
                </div>
                <div css={textCSS}>{board.boardMbti}</div>
              </div>
              <div css={rightCSS}>
                <div css={textCSS}>{board.createdAt}</div>
                <img css={imgCSS} src={board.imgUrl} alt="thumbnail" />
                <div css={detailCSS}>
                  <div css={[textCSS, marginRightCSS]}>
                    공감 {board.likeCount}
                  </div>
                  <div css={textCSS}>댓글 {board.commentCount}</div>
                </div>
              </div>
            </div>
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

const containerCSS = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: ${COLOR.MAIN3};
  width: calc(50% - 0.5rem);
  margin-bottom: 1rem;
  border-radius: 1.2rem;
  padding: 1.5rem;
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

const leftCSS = css`
  display: flex;
  flex-direction: column;
`;

const rightCSS = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const profileCSS = css`
  margin-bottom: 0.6rem;
`;

const titleCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  color: ${COLOR.MAINDARK};
  margin-bottom: 0.3rem;
`;

const contentCSS = css`
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  margin-bottom: 0.8rem;
`;

const detailCSS = css`
  display: flex;
`;

const textCSS = css`
  font-size: ${FONT.SIZE.CAPTION};
  font-weight: ${FONT.WEIGHT.REGULAR};
  color: ${COLOR.GRAY2};
`;

const imgCSS = css`
  width: 6rem;
  height: 6rem;
  margin: 0.5rem 0 0.5rem 0.8rem;
`;

const marginRightCSS = css`
  margin-right: 0.7rem;
`;

const hrCSS = css`
  width: 100%;
  border: 1px solid ${COLOR.GRAY4};
  margin-top: 3rem;
`;
