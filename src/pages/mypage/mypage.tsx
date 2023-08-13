/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { useState } from "react";
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import BoardComponent from "../../components/board/Board";
import ActivityList from "../../components/mypage/MyPage";
import { useGetProfile } from "../../hooks/user/useProfile";
import { SettingIcon } from "../../assets/CommonIcons";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container/Container";
import { useBoardListMember } from "../../hooks/board/useBoardListMember";
import { useWorryPostListMember } from "../../hooks/worry/useWorryPostListMember";
import { useWorrySolveListMember } from "../../hooks/worry/useWorrySolveListMember";
import MatchingComponent from "../../components/matching/Matching";
import useMemberInfo from "../../hooks/user/useMemberInfo";
import ListPagination from "../../components/Pagination/ListPagination";
import { useDebateListMember } from "../../hooks/debate/useDebateListMember";
import MyDebateComponent from "../../components/debate/myDebate";

const menuTabBar = [
  { type: 1, title: "내가 쓴 게시글" },
  { type: 2, title: "내가 쓴 토론글" },
  { type: 3, title: "내가 쓴 고민글" },
  { type: 4, title: "내가 해결한 고민" },
];

const MyPage = () => {
  const navigate = useNavigate();
  const { user } = useMemberInfo();
  const userId = user!!.id;
  const { profileData } = useGetProfile(userId);

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
      <div css={mainTitleCSS}>프로필</div>
      <div css={boxContainerCSS}>
        {/* box1 */}
        <div css={box1CSS}>
          <div css={profileContainerCSS}>
            <div css={profileImageContainerCSS}>
              <img
                style={{
                  objectFit: "contain",
                }}
                src={profileData?.teacherInfo?.profileImgUrl}
                alt="프로필"
              />
            </div>
            <p css={profilenameCSS}>
              {profileData?.teacherInfo?.nickName} 님
              <button
                onClick={handleSettingClick}
                css={settingIconContainerCSS}
              >
                <SettingIcon />
              </button>
            </p>

            <div css={bedgeContainer}>
              <p css={selectBadge(1)}>{profileData?.teacherInfo?.mbti}</p>
              <p css={selectBadge(1)}>{profileData?.teacherInfo?.badge}</p>
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
            {profileData?.badgeInfos?.map(
              (value: { id: number; name: string }, idx: number) => {
                return (
                  <p key={idx} css={selectBadge(value?.id)}>
                    {value.name}
                  </p>
                );
              },
            )}
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
          boardList.result.map((board) => (
            <BoardComponent
              board={board}
              key={board.id}
              onClick={() => navigate(`/board/${board.id}`)}
            />
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
          debateList.result.map((debateList) => (
            <MyDebateComponent
              debate={debateList} 
              onClick={() => navigate(`/debate/${debateList.id}`)}
              key={debateList.id} />
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
            <>{console.log(worrySolve.title)}
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
  max-width: 80rem;
  min-width: 65.625rem;
`;

const box1CSS = css`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.MAIN3};
  min-width: 15.625rem;
  /* max-width: 250px; */
  flex: 1;
  height: 27.0625rem;
  border-radius: 1.875rem;
  margin-right: 2.875rem;
  padding: 2.5rem 2.125rem;
`;

const box2CSS = css`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.MAIN3};
  min-width: 15.625rem;
  /* max-width: 250px; */
  flex: 1;
  height: 27.0625rem;
  border-radius: 1.875rem;
  margin-right: 2.875rem;
  padding: 2.5rem 3.125rem;
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
  border-radius: 6.25rem;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const profilenameCSS = css`
  font-size: 1.75rem;
  margin: 0.9375rem 0 0.625rem;
  font-weight: ${FONT.WEIGHT.BOLD};
  color: ${COLOR.MAINDARK};
  text-align: center;
`;

const settingIconContainerCSS = css`
  margin-left: 0.625rem;
`;

const bedgeContainer = css`
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
