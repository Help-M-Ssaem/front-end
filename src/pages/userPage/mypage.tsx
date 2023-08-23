/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { useState } from "react";
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import Badge from "../../components/badge/Badge";
import BoardComponent from "../../components/board/Board";
import Profile from "../../components/profile/Profile";
import { useGetProfile } from "../../hooks/user/useProfile";
import { BigCatLogoIcon, SettingIcon } from "../../assets/CommonIcons";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container/Container";
import { useBoardListMember } from "../../hooks/board/useBoardListMember";
import { useWorryPostListMember } from "../../hooks/worry/useWorryPostListMember";
import { useWorrySolveListMember } from "../../hooks/worry/useWorrySolveListMember";
import MatchingComponent from "../../components/matching/Matching";
import useMemberInfo from "../../hooks/user/useMemberInfo";
import { useDebateListMember } from "../../hooks/debate/useDebateListMember";
import MyDebateComponent from "../../components/debate/myDebate";
import MyActivityList from "../../components/mypage/MyActivityList";

const menuTabBar = [
  { type: 1, title: "내가 쓴 게시글" },
  { type: 2, title: "내가 쓴 토론글" },
  { type: 3, title: "내가 쓴 고민글" },
  { type: 4, title: "내가 해결한 고민" },
];
// 가져올 컴포넌트들 임시로
const myPostArray5 = [
  {
    id: 1,
    name: "유저5",
    profile: "https://i.ibb.co/KN0Ty4Q/bread.png",
    thumbnail: "https://i.ibb.co/wrVDXsy/IMG-6365-23992340.png",
    mbti: "EsFP",
    badge: "엠비티어론",
    title: "내가 고민 해결왕이다",
    content: "예에",
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
    title: "내가 고민 해결왕이다",
    content: "예에",
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
    title: "내가 고민 해결왕이다",
    content: "예에",
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
    title: "내가 고민 해결왕이다",
    content: "예에",
    createdAt: "23.06.21",
    like: 3,
    comment: 4,
  },
];

const MyPage = () => {
  const navigate = useNavigate();
  const { user } = useMemberInfo();
  const userId = user?.id || 1;
  const { profileData } = useGetProfile(userId);
  const mbti = profileData?.teacherInfo?.mbti || "";
  const badge = profileData?.teacherInfo?.badge || "";

  const limit = 6;
  const [page, setPage] = useState(1);

  const { boardList } = useBoardListMember(userId, page - 1, limit);
  const { worryPostList } = useWorryPostListMember(userId, page - 1, limit);
  const { worrySolveList } = useWorrySolveListMember(userId, page - 1, limit);
  const { debateList } = useDebateListMember(userId, page - 1, limit);

  const handleSettingClick = () => {
    navigate("/mypage/update");
  };

  const [menuSelected, setMenuSelected] = useState(1);

  const clickMenu = (type: number) => {
    setMenuSelected(type);
  };

  console.log(profileData);

  return (
    <div>
      <div css={boxHeadContainerCSS}>
        <div css={mainTitleCSS}>프로필</div>
        <button onClick={handleSettingClick} css={settingIconContainerCSS}>
          수정하기
        </button>
      </div>
      <div css={boxContainerCSS}>
        {/* box1 */}
        <Container addCSS={box1CSS}>
          <div css={profileContainerCSS}>
            <div css={profileImageContainerCSS}>
              <img
                css={imageCSS}
                style={{
                  objectFit: "cover",
                }}
                src={profileData?.teacherInfo?.profileImgUrl}
                alt="프로필"
              />
            </div>
            <p css={profilenameCSS}>{profileData?.teacherInfo?.nickName} 님</p>
            <div css={badgeContainer}>
              <Badge mbti={mbti} />
              {badge && <Badge mbti={badge} />}
            </div>
            <p css={subTitleCSS}>한줄소개</p>
            <p css={oneLineIntroductionCSS}>
              {profileData?.teacherInfo?.introduction}
            </p>
          </div>
        </Container>
        {/* box2 */}
        <Container addCSS={box2CSS}>
          <p css={subTitleCSS}>수집한 칭호</p>
          <div css={collectedTitleContainer}>
            {profileData?.badgeInfos &&
              profileData?.badgeInfos.map((badgeInfo: any) => {
                return (
                  <Badge mbti={badgeInfo.name} imgUrl={badgeInfo.imgUrl} />
                );
              })}
          </div>
        </Container>

        {/* box3 */}
        <MyActivityList profileData={profileData}></MyActivityList>
      </div>

      <Container>
        <div css={menuButtonContainer}>
          {menuTabBar?.map((value, idx) => {
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
          boardList &&
          (boardList.result.length > 0 ? (
            boardList.result.map((board) => (
              <BoardComponent
                board={board}
                key={board.id}
                onClick={() => navigate(`/board/${board.id}`)}
              />
            ))
          ) : (
            <div css={noChatCSS}>
              <div css={IconCSS}>
                <BigCatLogoIcon />
              </div>
              <div css={bottomFontSIZE}>게시글이 없어요!</div>
            </div>
          ))}

        {menuSelected === 2 &&
          debateList &&
          (debateList.result.length > 0 ? (
            debateList.result.map((debateItem) => (
              <MyDebateComponent
                debate={debateItem}
                onClick={() => navigate(`/debate/${debateItem.id}`)}
                key={debateItem.id}
              />
            ))
          ) : (
            <div css={noChatCSS}>
              <div css={IconCSS}>
                <BigCatLogoIcon />
              </div>
              <div css={bottomFontSIZE}>게시글이 없어요!</div>
            </div>
          ))}

        {menuSelected === 3 &&
          worryPostList &&
          (worryPostList.result.length > 0 ? (
            worryPostList.result.map((worryPost) => (
              <MatchingComponent
                matching={worryPost}
                solve={"waiting"}
                onClick={() => navigate(`/match/${worryPost.id}`)}
                key={worryPost.id}
              />
            ))
          ) : (
            <div css={noChatCSS}>
              <div css={IconCSS}>
                <BigCatLogoIcon />
              </div>
              <div css={bottomFontSIZE}>게시글이 없어요!</div>
            </div>
          ))}
        {menuSelected === 4 &&
          worrySolveList &&
          (worrySolveList.result.length > 0 ? (
            worrySolveList.result.map((worrySolve) => (
              <>
                {console.log(worrySolve.title)}
                <MatchingComponent
                  matching={worrySolve}
                  solve={"solved"}
                  onClick={() => navigate(`/match/${worrySolve.id}`)}
                  key={worrySolve.id}
                />
              </>
            ))
          ) : (
            <div css={noChatCSS}>
              <div css={IconCSS}>
                <BigCatLogoIcon />
              </div>
              <div css={bottomFontSIZE}>게시글이 없어요!</div>
            </div>
          ))}
      </Container>
    </div>
  );
};

export default MyPage;

const noChatCSS = css`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
`;

const bottomFontSIZE = css`
  font-size: ${FONT.SIZE.TITLE1};
  color: ${COLOR.GRAY2};
`;

const IconCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const boxHeadContainerCSS = css`
  margin-bottom: 2rem;
`;

const mainTitleCSS = css`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  color: ${COLOR.MAINDARK};
`;

const boxContainerCSS = css`
  display: flex;
  width: 100%;
  margin: 1.5rem 0;
`;

const box1CSS = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  height: 26rem;
  margin-right: 1.5rem;
`;

const box2CSS = css`
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 26rem;
  margin-right: 1.5rem;
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
  margin-top: 0.5rem;
`;

const profileContainerCSS = css`
  margin: 0.625rem 0 2.5rem;
  display: flex;
  flex-direction: column;
`;

const profileImageContainerCSS = css`
  width: 12.125rem;
  height: 12.125rem;
  overflow: hidden;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const imageCSS = css`
  // width: 12.125rem;
  // height: auto;
  // width: auto;
  width: 100%;
  height: 100%;
  // max-height: 9rem;
  object-fit: contain;
`;

const profilenameCSS = css`
  font-size: 1.5rem;
  margin: 0.9375rem 0 0.625rem;
  font-weight: ${FONT.WEIGHT.BOLD};
  color: ${COLOR.MAINDARK};
  text-align: center;
`;

const settingIconContainerCSS = css`
  float: right;
  color: ${COLOR.GRAY2};
  text-decoration: underline;
  text-underline-position: under;
  margin-right: 1rem;
`;

const badgeContainer = css`
  display: flex;
  margin: 0 auto 1.25rem;
  column-gap: 0.1rem;
`;

const collectedTitleContainer = css`
  margin: 0.625rem 0 0.625rem;
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.3rem;
  row-gap: 0.625rem;
`;

const menuButtonContainer = css`
  display: flex;
  justify-content: space-between;
  border-bottom: 0.0625rem solid ${COLOR.MAIN1};
  height: 3.5rem;
  li {
    cursor: pointer;
    position: relative;
    color: ${COLOR.GRAY2};
  }
  li:hover {
    color: ${COLOR.MAIN1};
    border-bottom: 0.0625rem solid ${COLOR.MAIN1};
  }

  li.active {
    color: ${COLOR.MAIN1};
    border-bottom: 0.0625rem solid ${COLOR.MAIN1};
  }
  list-style-type: none;
`;

const menuBox = css`
  text-align: center;
  flex: 1;
  padding: 0.5rem 2.5625rem;
`;
