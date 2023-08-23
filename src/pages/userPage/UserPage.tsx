/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { useState } from "react";
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import BoardComponent from "../../components/board/Board";
import ActivityList from "../../components/mypage/ActivityList";
import { useGetProfile } from "../../hooks/user/useProfile";
import { BigCatLogoIcon, SettingIcon } from "../../assets/CommonIcons";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container/Container";
import { useBoardListMember } from "../../hooks/board/useBoardListMember";
import { useWorryPostListMember } from "../../hooks/worry/useWorryPostListMember";
import { useWorrySolveListMember } from "../../hooks/worry/useWorrySolveListMember";
import MatchingComponent from "../../components/matching/Matching";
import ListPagination from "../../components/Pagination/ListPagination";
import { useDebateListMember } from "../../hooks/debate/useDebateListMember";
import MyDebateComponent from "../../components/debate/myDebate";
import { useParams } from "react-router-dom";
import useMemberInfo from "../../hooks/user/useMemberInfo";
import Badge from "../../components/badge/Badge";

const UserPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useMemberInfo();
  const userId = Number(id);
  const myId = user?.id;

  const { profileData } = useGetProfile(userId);
  const mbti = profileData?.teacherInfo?.mbti || "";
  const badge = profileData?.teacherInfo?.badge || "";

  // console.log({ myId, userId, profileData });

  const menuTabBar = [
    { type: 1, title: `${profileData?.teacherInfo.nickName}의 게시글` },
    { type: 2, title: `${profileData?.teacherInfo.nickName}의 토론글` },
    { type: 3, title: `${profileData?.teacherInfo.nickName}의 고민글` },
    { type: 4, title: `${profileData?.teacherInfo.nickName}님이 해결한 고민` },
  ];
  const limit = 6;
  const [page, setPage] = useState(1);
  const [blockNum, setBlockNum] = useState(0);

  const { boardList } = useBoardListMember(userId, page - 1, limit);
  const boardTotalPage = boardList ? boardList.totalSize : 1;
  const { worryPostList } = useWorryPostListMember(userId, page - 1, limit);
  const worryPostTotalPage = boardList ? boardList.totalSize : 1;
  const { worrySolveList } = useWorrySolveListMember(userId, page - 1, limit);
  const worrySolveTotalPage = boardList ? boardList.totalSize : 1;
  const { debateList } = useDebateListMember(userId, page - 1, limit);

  const handleSettingClick = () => {
    navigate("/mypage/update");
  };

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
      <div css={boxHeadContainerCSS}>
        <div css={mainTitleCSS}>프로필</div>
        <button
          style={{
            display: userId === myId ? "" : "none",
          }}
          onClick={handleSettingClick}
          css={settingIconContainerCSS}
        >
          수정하기
        </button>
      </div>
      <div css={boxContainerCSS}>
        {/* box1 */}
        <div css={box1CSS}>
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
            <p css={profilenameCSS}>
              {profileData?.teacherInfo?.nickName} 님
              {/* <button
                style={{
                  display: userId === myId ? "" : "none",
                }}
                onClick={handleSettingClick}
                css={settingIconContainerCSS}
              >
                <SettingIcon />
              </button> */}
            </p>
            {/* <div css={bedgeContainer}>
              <p css={selectBadge(1)}>{profileData?.teacherInfo?.mbti}</p>
              <p css={selectBadge(1)}>{profileData?.teacherInfo?.badge}</p>
            </div> */}
            <div css={badgeContainer}>
              <Badge mbti={mbti} />
              {badge && <Badge mbti={badge} />}
            </div>
            <p css={subTitleCSS}>한줄소개</p>
            <p css={oneLineIntroductionCSS}>
              {profileData?.teacherInfo?.introduction}
            </p>
          </div>
        </div>
        {/* box2 */}
        <div css={box2CSS}>
          <p css={subTitleCSS}>수집한 칭호</p>
          <div css={collectedTitleContainer}>
            {profileData?.badgeInfos &&
              profileData?.badgeInfos.map((badgeInfo: any) => {
                return <Badge mbti={badgeInfo.name} />;
              })}
          </div>
        </div>
        {/* box3 */}
        <ActivityList profileData={profileData}></ActivityList>
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
        {/* <ListPagination
          limit={limit}
          page={page}
          setPage={setPage}
          blockNum={blockNum}
          setBlockNum={setBlockNum}
          totalPage={boardTotalPage}
        /> */}

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

export default UserPage;

const noChatCSS = css`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const IconCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const bottomFontSIZE = css`
  font-size: ${FONT.SIZE.TITLE1};
  color: ${COLOR.GRAY2};
`;

const boxHeadContainerCSS = css`
  margin-bottom: 2rem;
`;

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
  min-width: 65.625rem;
`;

const box1CSS = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${COLOR.MAIN3};
  // min-width: 15.625rem;

  flex: 1;
  height: 26rem;
  width: 25%;
  border-radius: 1.875rem;
  margin-right: 1.5rem;

  // margin-right: 2.875rem;
  // padding: 2.5rem 2.125rem;
`;

const box2CSS = css`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.MAIN3};
  width: 25%;
  padding: 1.5rem;
  height: 26rem;
  border-radius: 1.875rem;
  margin-right: 1.5rem;
`;

const subTitleCSS = css`
  padding-top: 0.5rem;
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
  margin: 2rem 0 2.5rem;
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
  column-gap: 0.625rem;
`;

const collectedTitleContainer = css`
  margin: 0.625rem 0 0.625rem;
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.625rem;
  row-gap: 0.625rem;
`;

const badgeCSS1 = css`
  height: 1.4375rem;
  border-radius: 1.25rem;
  padding: 0.1875rem 0.625rem;
  background-color: #f8caff;
  color: white;
  width: fit-content;
`;

const badgeCSS2 = css`
  height: 1.4375rem;
  border-radius: 1.25rem;
  padding: 0.1975rem 0.625rem;
  background-color: #5be1a9;
  color: white;
  width: fit-content;
`;

const badgeCSS3 = css`
  height: 1.4375rem;
  border-radius: 1.25rem;
  padding: 0.1975rem 0.625rem;
  background-color: #ad71ea;
  color: white;
  width: fit-content;
`;

const badgeCSS4 = css`
  height: 1.4375rem;
  border-radius: 1.25rem;
  padding: 0.1975rem 0.625rem;
  background-color: #9ecbff;
  color: white;
  width: fit-content;
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
