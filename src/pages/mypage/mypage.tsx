/** @jsxImportSource @emotion/react */
import React from "react";
import { useState } from "react";
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";

interface Board {
  id: number;
  name: string;
  profile: string;
  thumbnail: string;
  mbti: string;
  badge: string;
  title: string;
  content: string;
  createdAt: string;
  like: number;
  comment: number;
}

const bedge1Array = [
  { title: "EsFP", type: 1 },
  { title: "엠비티어른", type: 2 },
];

const bedge2Array = [
  { title: "엠비티어른", type: 2 },
  { title: "MBTMI", type: 3 },
  { title: "엠비티아노사우르스", type: 4 },
];

const menuArray = [
  { type: 1, title: "내가 쓴 게시글" },
  { type: 2, title: "내가 쓴 토론글" },
  { type: 3, title: "내가 쓴 고민글" },
  { type: 4, title: "내가 쓴 댓글" },
  { type: 5, title: "내가 해결한 고민" },
];

// dummy 데이터
const myPostArray = [
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
const myPostArray2 = [
  {
    id: 1,
    name: "유저2",
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
    name: "유저2",
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
    name: "유저2",
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
    name: "유저2",
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
const myPostArray3 = [
  {
    id: 1,
    name: "유저3",
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
    name: "유저3",
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
    name: "유저3",
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
    name: "유저3",
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
const myPostArray4 = [
  {
    id: 1,
    name: "유저4",
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
    name: "유저4",
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
    name: "유저4",
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
    name: "유저4",
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
const myPostArray5 = [
  {
    id: 1,
    name: "유저5",
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
    name: "유저5",
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
    name: "유저5",
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
    name: "유저5",
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

// ---- board ---

interface BoardProps {
  board: Board;
}

const BoardComponent = ({ board }: BoardProps) => {
  return (
    <div css={boardBoxCSS}>
      <div css={leftCSS}>
        <div css={profileBoxCSS}>
          <img
            css={[profileImgCSS, leftCSS]}
            src={board.profile}
            alt="profile"
          />
          <div css={[profileCSS, rightCSS]}>
            <div css={nameCSS}>{board.name} 님</div>
            <div css={profileDetailCSS}>
              <Badge mbti={board.mbti} color={"#F8CAFF"} />
              <Badge mbti={board.badge} color={"#5BE1A9"} />
            </div>
          </div>
        </div>
        <div css={titleCSS}>{board.title}</div>
        <div css={contentCSS}>{board.content}</div>
        <div css={detailCSS}>
          <div css={marginRightCSS}>{board.createdAt}</div>
          <div css={marginRightCSS}>공감 {board.like}</div>
          <div>댓글 {board.comment}</div>
        </div>
      </div>
      <div css={rightCSS}>
        <img css={thumbnailCSS} src={board.thumbnail} alt="thumbnail" />
      </div>
    </div>
  );
};

//  --- badge ---
type BadgeProps = {
  mbti: string;
  color?: string;
};

const Badge = ({ mbti, color }: BadgeProps) => {
  const badgeCSS = css`
    display: flex;
    justify-content: center;
    align-items: center;

    color: ${COLOR.WHITE};
    font-size: ${FONT.SIZE.BODY};
    font-weight: ${FONT.WEIGHT.REGULAR};
    background: ${color || "transparent"};
    padding: 0.1rem 0.5rem;
    border-radius: 0.9rem;
    margin-right: 0.5rem;
  `;

  return <div css={badgeCSS}>{mbti}</div>;
};

const Mypage = () => {
  const [menuSelected, setMenuSelected] = useState(1);
  const clickMenu = (type: number) => {
    setMenuSelected(type);
  };
  const selectBadge = (value: any) => {
    switch (value.type) {
      case 1:
        return badgeCSS1;
      case 2:
        return badgeCSS2;
      case 3:
        return badgeCSS3;
      case 4:
        return badgeCSS4;
      default:
        return badgeCSS1;
    }
  };
  return (
    <div>
      <div css={mainTitleCSS}>프로필</div>
      <div css={boxContainerCSS}>
        {/* box1 */}
        <div css={box1CSS}>
          <p css={subTitleCSS}>한줄소개</p>
          <p css={oneLineIntroductionCSS}>진짜 어른이 되고 싶은 어른이에요</p>
          <div css={profileContainerCSS}>
            <div css={profileImageContainerCSS}>
              <img
                style={{
                  objectFit: "cover",
                }}
                src={`${process.env.PUBLIC_URL}/logo192.png`}
                alt="프로필"
              />
            </div>
            <p css={profilenameCSS}>유보라 님</p>

            <div css={bedgeContainer}>
              {bedge1Array?.map((value, idx) => {
                return (
                  <p key={idx} css={selectBadge(value)}>
                    {value.title}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        {/* box2 */}
        <div css={box2CSS}>
          <p css={subTitleCSS}>수집한 칭호</p>
          <div css={collectedTitleContainer}>
            {bedge2Array?.map((value, idx) => {
              return (
                <p key={idx} css={selectBadge(value)}>
                  {value.title}
                </p>
              );
            })}
          </div>
        </div>
        {/* box3 */}
        <div css={box3CSS}>
          {/* 받은 평가 / 게시판 활동 */}
          <div css={spaceBetween}>
            {/* 받은평가 */}
            <div>
              <p css={subTitleCSS}>받은평가</p>
              <div css={contentContainer}>
                <div css={contentBox}>
                  <p>좋아요</p>
                  <p css={contentNumber}>11</p>
                </div>
                <div css={contentBox}>
                  <p>유익해요</p>
                  <p css={contentNumber}>13</p>
                </div>
                <div css={contentBox}>
                  <p>재밌어요</p>
                  <p css={contentNumber}>21</p>
                </div>
                <div css={contentBox}>
                  <p>성의있어요</p>
                  <p css={contentNumber}>11</p>
                </div>
                <div css={contentBox}>
                  <p>화끈해요</p>
                  <p css={contentNumber}>11</p>
                </div>
              </div>
            </div>
            {/* 게시판 활동 */}
            <div>
              <p css={subTitleCSS}>게시판 활동</p>
              <div css={contentContainer}>
                {/* 전체 게시글 */}
                <div css={contentBox}>
                  <p>전체 게시글</p>
                  <p css={contentNumber}>11</p>
                </div>
                {/* 전체 게시글 */}
                <div css={contentBox}>
                  <p>전체 댓글</p>
                  <p css={contentNumber}>13</p>
                </div>
                {/* 받은 좋아요 */}
                <div css={contentBox}>
                  <p>받은 좋아요</p>
                  <p css={contentNumber}>21</p>
                </div>
                {/* 누른 좋아요 */}
                <div css={contentBox}>
                  <p>누른 좋아요</p>
                  <p css={contentNumber}>11</p>
                </div>
              </div>
            </div>
          </div>
          {/* 과몰입토론 활동 / M쌤 매칭 */}
          <div css={spaceBetweenWithMargin}>
            {/* 과몰입토론 활동  */}
            <div>
              <p css={subTitleCSS}>과몰입토론 활동</p>
              <div css={contentContainer}>
                <div css={contentBox}>
                  <p>전체 토론글</p>
                  <p css={contentNumber}>11</p>
                </div>
                <div css={contentBox}>
                  <p>전체 댓글</p>
                  <p css={contentNumber}>13</p>
                </div>
                <div css={contentBox}>
                  <p>전체 참여자</p>
                  <p css={contentNumber}>21</p>
                </div>
              </div>
            </div>
            {/* M쌤 매칭 */}
            <div>
              <p css={subTitleCSS}>M쌤 매칭</p>
              <div css={contentContainer}>
                <div css={contentBox}>
                  <p>전체 고민</p>
                  <p css={contentNumber}>11</p>
                </div>

                <div css={contentBox}>
                  <p>전체 해결</p>
                  <p css={contentNumber}>13</p>
                </div>

                <div css={contentBox}>
                  <p>전체 평가</p>
                  <p css={contentNumber}>21</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div css={myContentContainer}>
        <div css={menuButtonContainer}>
          {menuArray?.map((value, idx) => {
            return (
              <li
                onClick={() => {
                  clickMenu(value.type);
                }}
                key={idx}
                css={menuBox}
                className={menuSelected === value.type ? "active" : ""}
              >
                {value.title}
              </li>
            );
          })}
        </div>

        {menuSelected === 1 &&
          myPostArray?.map((board) => (
            <BoardComponent board={board} key={board.id} />
          ))}
        {menuSelected === 2 &&
          myPostArray2?.map((board) => (
            <BoardComponent board={board} key={board.id} />
          ))}
        {menuSelected === 3 &&
          myPostArray3?.map((board) => (
            <BoardComponent board={board} key={board.id} />
          ))}
        {menuSelected === 4 &&
          myPostArray4?.map((board) => (
            <BoardComponent board={board} key={board.id} />
          ))}
        {menuSelected === 5 &&
          myPostArray5?.map((board) => (
            <BoardComponent board={board} key={board.id} />
          ))}
      </div>
    </div>
  );
};

export default Mypage;

const mainTitleCSS = css`
  display: flex;
  align-items: center;
  margin: 2rem 0 0 0;
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  color: ${COLOR.MAINDARK};
`;

const boxContainerCSS = css`
  display: flex;
  margin: 1.5rem 0 3rem;
`;

const box1CSS = css`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.MAIN3};
  min-width: 278px;
  max-width: 278px;
  height: 433px;
  border-radius: 30px;
  margin-right: 46px;
  padding: 40px 34px;
`;

const box2CSS = css`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.MAIN3};
  min-width: 278px;
  max-width: 278px;
  height: 433px;
  border-radius: 30px;
  margin-right: 46px;
  padding: 40px 50px;
`;
const box3CSS = css`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.MAIN3};
  min-width: 532px;
  height: 433px;
  border-radius: 30px;
  margin-right: 46px;
  padding: 39px 93px 39px 67px;
`;

const subTitleCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  color: ${COLOR.GRAY1};
`;

const oneLineIntroductionCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.REGULAR};
  color: ${COLOR.GRAY1};
  margin-top: 10px;
`;

const profileContainerCSS = css`
  margin: 15px 0 40px;
  display: flex;
  flex-direction: column;
`;

const profileImageContainerCSS = css`
  width: 194px;
  height: 194px;
  overflow: hidden;
  border-radius: 100px;
  background-color: black;
`;

const profilenameCSS = css`
  font-size: 28px;
  margin: 15px 0 10px;
  font-weight: ${FONT.WEIGHT.BOLD};
  color: ${COLOR.MAINDARK};
  text-align: center;
`;

const bedgeContainer = css`
  display: flex;
  margin: 0 auto;
  column-gap: 10px;
`;

const collectedTitleContainer = css`
  margin: 10px 0 10px;
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 10px;
`;

const badgeCSS1 = css`
  height: 23px;
  border-radius: 20px;
  padding: 3px 10px;
  background-color: #f8caff;
  color: white;
  width: fit-content;
`;

const badgeCSS2 = css`
  height: 23px;
  border-radius: 20px;
  padding: 3px 10px;
  background-color: #5be1a9;
  color: white;
  width: fit-content;
`;
const badgeCSS3 = css`
  height: 23px;
  border-radius: 20px;
  padding: 3px 10px;
  background-color: #ad71ea;
  color: white;
  width: fit-content;
`;
const badgeCSS4 = css`
  height: 23px;
  border-radius: 20px;
  padding: 3px 10px;
  background-color: #9ecbff;
  color: white;
  width: fit-content;
`;

const spaceBetween = css`
  display: flex;
  justify-content: space-between;
`;
const spaceBetweenWithMargin = css`
  display: flex;
  justify-content: space-between;
  margin-top: 45px;
`;

const contentContainer = css`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const contentBox = css`
  display: flex;
  justify-content: space-between;
  width: 115px;
`;

const contentNumber = css`
  font-weight: ${FONT.WEIGHT.SEMIBOLD};
`;

const myContentContainer = css`
  margin-top: 66px;
  width: 1180px;
  min-height: 500px;
  background: ${COLOR.MAIN3};
  border-radius: 1.2rem;
  /* padding: 1.5rem; */
`;

const menuButtonContainer = css`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${COLOR.MAIN1};
  height: 82px;
  li {
    cursor: pointer;
    position: relative;
    color: ${COLOR.GRAY2};
  }
  li:hover {
    color: ${COLOR.MAIN1};
    border-bottom: 1px solid ${COLOR.MAIN1};
  }

  li.active {
    color: ${COLOR.MAIN1};
    border-bottom: 1px solid ${COLOR.MAIN1};
  }
  list-style-type: none;
`;
const menuBox = css`
  text-align: center;
  flex: 1;
  padding: 30px 41px;
`;

// --- board css ---

const boardBoxCSS = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem;
  border-top: 1px solid ${COLOR.MAIN};
`;

const leftCSS = css`
  display: flex;
  flex-direction: column;
`;

const rightCSS = css``;

const nameCSS = css`
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.SEMIBOLD};
  margin-bottom: 0.4rem;
`;

const titleCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  margin-bottom: 0.4rem;
`;

const contentCSS = css`
  margin-bottom: 1rem;
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.REGULAR};
`;

const marginRightCSS = css`
  margin-right: 1rem;
`;

const profileBoxCSS = css`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
`;

const profileImgCSS = css`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  margin-right: 1rem;
`;

const profileCSS = css`
  display: flex;
  flex-direction: column;
`;

const profileDetailCSS = css`
  display: flex;
`;

const thumbnailCSS = css`
  width: 9rem;
  height: 9rem;
`;

const detailCSS = css`
  display: flex;
  font-size: 0.9rem;
  color: ${COLOR.GRAY2};

  font-size: ${FONT.SIZE.FOOTNOTE};
  font-weight: ${FONT.WEIGHT.REGULAR};
`;
