/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { useState } from "react";
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import BoardComponent from "../../components/board/Board";
import { useGetProfile } from "../../hooks/user/useProfile";
import { SettingIcon } from "../../assets/CommonIcons";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container/Container";
import { useBoardListMember } from "../../hooks/board/useBoardListMember";
import { useWorryPostListMember } from "../../hooks/worry/useWorryPostListMember";
import { useWorrySolveListMember } from "../../hooks/worry/useWorrySolveListMember";
import MatchingComponent from "../../components/matching/Matching";
import useMemberInfo from "../../hooks/user/useMemberInfo";
import { useDebateListMember } from "../../hooks/debate/useDebateListMember";
import MyDebateComponent from "../../components/debate/myDebate";
import Badge from "../../components/badge/Badge";
import MyActivityList from "../../components/mypage/MyActivityList";

const menuTabBar = [
  { type: 1, title: "내가 쓴 게시글" },
  { type: 2, title: "내가 쓴 토론글" },
  { type: 3, title: "내가 쓴 고민글" },
  { type: 4, title: "내가 해결한 고민" },
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
          boardList.result.map((board) => (
            <BoardComponent
              board={board}
              key={board.id}
              onClick={() => navigate(`/board/${board.id}`)}
            />
          ))}
        {menuSelected === 2 &&
          debateList &&
          debateList.result.map((debateList) => (
            <MyDebateComponent
              debate={debateList}
              onClick={() => navigate(`/debate/${debateList.id}`)}
              key={debateList.id}
            />
          ))}
        {menuSelected === 3 &&
          worryPostList &&
          worryPostList.result.map((worryPost) => (
            <MatchingComponent
              matching={worryPost}
              solve={"waiting"}
              onClick={() => navigate(`/match/${worryPost.id}`)}
              key={worryPost.id}
            />
          ))}
        {menuSelected === 4 &&
          worrySolveList &&
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
          ))}
      </Container>
    </div>
  );
};

export default MyPage;

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
  height: 28rem;
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
  max-width: 12.125rem;
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
  height: 5.125rem;
  li {
    cursor: pointer;
    position: relative;
    color: ${COLOR.GRAY2};
  }
  li:hover {
    color: ${COLOR.MAIN1};
    border-bottom: 0.25rem solid ${COLOR.MAIN1};
  }

  li.active {
    color: ${COLOR.MAIN1};
    border-bottom: 0.25rem solid ${COLOR.MAIN1};
  }
  list-style-type: none;
`;

const menuBox = css`
  text-align: center;
  flex: 1;
  padding: 1.875rem 2.5625rem;
`;
