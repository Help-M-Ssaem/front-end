/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { useState } from "react";
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import Badge from "../../components/badge/Badge";
import BoardComponent from "../../components/board/Board";
import Profile from "../../components/profile/Profile";
import ActivityList from "../../components/mypage/MyPage";
import { useGetProfile } from "../../hooks/user/useProfile";
import { SettingIcon } from "../../assets/CommonIcons";
import { useNavigate } from "react-router-dom";
import UserInfo from "../auth/UserInfo";
import MbtiBox from "../../components/mypage/mbtiBox";
import NameBox from "../../components/mypage/nameBox";
import Input from "../../components/input/Input";
import Input2 from "../../components/input/Input2";
import Button from "../../components/button/Button";

const MyPageUpdate = () => {
  const navigate = useNavigate();
  const { profileData } = useGetProfile(1);
  const [selectedBadgeId, setSelectedBadgeId] = useState(null);

  const handleSettingClick = () => {
    navigate("/mypage/update");
  };

  const [menuSelected, setMenuSelected] = useState(1);
  const clickMenu = (type: number) => {
    setMenuSelected(type);
  };
  const selectBadge = (value: any) => {
    const isSelectedBadge = value.id === selectedBadgeId;
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
            <span css={modifyCSS}>프로필 설정</span>
            <div>
              <p css={subTitleCSS}>닉네임</p>
              <NameBox />
              <p css={subTitleCSS}>MBTI</p>
              <MbtiBox />
              <p css={subTitleCSS}>한줄소개</p>
              <Input2 placeholder="한줄 소개 들어가야함" />
            </div>
          </div>
        </div>
        {/* box2 */}

        <div css={box2CSS}>
          <p css={subTitleCSS}>수집한 칭호</p>
          <div css={collectedTitleContainer}>
            {profileData?.badgeInfos?.map(
              (value: { id: number; name: string }, idx: number) => {
                const isSelected = value.id === selectedBadgeId;
                return (
                  <p key={idx} css={selectBadge(value)}>
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
      <div css={buttonCSS}>
        <Button addCSS={calcelCSS}>취소하기</Button>
        <Button>수정하기</Button>
      </div>
      <div css={buttonCSS}>
        <Button addCSS={calcelCSS}>취소하기</Button>
        <Button>수정하기</Button>
      </div>
    </div>
  );
};

export default MyPageUpdate;

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
  // height: 27.0625rem;
  border-radius: 1.875rem;
  margin-right: 2.875rem;
  padding: 2.5rem 2.125rem 0 2.125rem;
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

const badgeCSS = css`
  // border: 2px solid ${COLOR.WHITE};
`;

const subTitleCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  color: ${COLOR.GRAY2};
  margin-top: 1.3rem;
`;

const profileContainerCSS = css`
  margin: 0.625rem 0 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const modifyCSS = css`
  font-size: ${FONT.SIZE.BODY};
  padding-top: 1rem;
`;
const calcelCSS = css`
  opacity: 0.5;
  margin-right: 1rem;
`;

const buttonCSS = css`
  display: flex;
  justify-content: flex-end;
  margin-right: 5rem;
  margin-top: -5rem;
`;
