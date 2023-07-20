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
    createdAt: "1분전",
    category: "커플 게시판",
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
    createdAt: "1분전",
    category: "커플 게시판",
    like: 3,
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
    createdAt: "1분전",
    category: "커플 게시판",
    like: 3,
    comment: 4,
  },
  {
    id: 4,
    name: "박보라",
    profile: "https://i.ibb.co/KN0Ty4Q/bread.png",
    thumbnail: "https://i.ibb.co/wrVDXsy/IMG-6365-23992340.png",
    mbti: "EsFP",
    badge: "엠비티어론",
    title: "박보라박보라박보라박브레드?",
    content: "내가 말을 '만약에'라고 시작하면 너무 기빨린대",
    createdAt: "1분전",
    category: "커플 게시판",
    like: 3,
    comment: 4,
  },
];

const hotboardlist = [
  {
    id: 1,
    category: "지금의 게시글",
    title: "어제 강남 러쉬에서 만난 대문자 E 직원",
  },
  {
    id: 2,
    category: "지금의 게시글",
    title: "어제 강남 러쉬에서 만난 대문자 E 직원",
  },
  {
    id: 3,
    category: "지금의 게시글",
    title: "어제 강남 러쉬에서 만난 대문자 E 직원",
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
  const HotBoard = useHotBoard();

  return (
    <>
      <div css={headerCSS}>
        {hotboardlist &&
          hotboardlist.map((hotboard) => (
            <Hot board={hotboard} key={hotboard.id} />
          ))}
        {/* <NotLoginComponent /> */}
        <LoginComponent user={user} />
      </div>

      <div css={plusBoxCSS}>
        <Text>HOT 게시글</Text>
        <div css={plusCSS}>더보기</div>
      </div>
      <div css={hotBoardBoxCSS}>
        {mbtiBoardList &&
          mbtiBoardList.map((board) => (
            <div css={containerCSS} key={board.id}>
              <div css={leftCSS}>
                <div css={profileCSS}>
                  <Profile
                    image={board.profile}
                    name={board.name}
                    mbti={board.mbti}
                    badge={board.badge}
                  />
                </div>
                <div css={titleCSS}>{board.title}</div>
                <div css={contentCSS}>
                  {board.content.length > 20
                    ? `${board.content.slice(0, 20)}...`
                    : board.content}
                </div>
                <div css={textCSS}>{board.category}</div>
              </div>
              <div css={rightCSS}>
                <div css={textCSS}>{board.createdAt}</div>
                <img src={board.thumbnail} css={imgCSS} alt="thumbnail" />
                <div css={detailCSS}>
                  <div css={[textCSS, marginRightCSS]}>공감 {board.like}</div>
                  <div css={textCSS}>댓글 {board.comment}</div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <hr css={hrCSS} />

      <div css={plusBoxCSS}>
        <Text>HOT 토론</Text>
        <div css={plusCSS}>더보기</div>
      </div>
      <div css={hotBoardBoxCSS}>
        {mbtiBoardList &&
          mbtiBoardList.map((board) => (
            <div css={containerCSS} key={board.id}>
              <div css={leftCSS}>
                <div css={profileCSS}>
                  <Profile
                    image={board.profile}
                    name={board.name}
                    mbti={board.mbti}
                    badge={board.badge}
                  />
                </div>
                <div css={titleCSS}>{board.title}</div>
                <div css={contentCSS}>
                  {board.content.length > 20
                    ? `${board.content.slice(0, 20)}...`
                    : board.content}
                </div>
                <div css={textCSS}>{board.category}</div>
              </div>
            </div>
          ))}
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
  background: ${COLOR.MAIN3};
  width: calc(50% - 0.5rem);
  margin-bottom: 1rem;
  align-items: center;
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
  margin: 0.5rem 0;
`;

const marginRightCSS = css`
  margin-right: 0.7rem;
`;

const hrCSS = css`
  width: 100%;
  border: 1px solid ${COLOR.GRAY4};
  margin-top: 3rem;
`;
