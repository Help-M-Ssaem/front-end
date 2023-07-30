/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import FONT from "../../styles/font";
import COLOR from "../../styles/color";
import Container from "../container/Container";
import Profile from "../profile/Profile";
import { User } from "../../interfaces/user";

interface userProps {
  user: User;
}

const LoginComponent = ({ user }: userProps) => {
  return (
    <Container
      background={COLOR.WHITE}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div css={textCSS}>로그아웃</div>
      <div css={profileCSS}>
        <Profile
          image={user.profileImgUrl}
          name={user.nickName}
          mbti={user.mbti}
          badge={user.badge}
        />
      </div>
      <div css={detailBoxCSS}>
        <div css={detailCSS}>M쌤 채팅</div>
        <span css={verticalBarCSS}>|</span>
        <div css={detailCSS}>알림</div>
        <span css={verticalBarCSS}>|</span>
        <div css={detailCSS}>활동</div>
        <span css={verticalBarCSS}>|</span>
        <div css={detailCSS}>프로필 설정</div>
      </div>
    </Container>
  );
};

export default LoginComponent;

const textCSS = css`
  font-weight: ${FONT.WEIGHT.REGULAR};
  font-size: ${FONT.SIZE.FOOTNOTE};
  color: ${COLOR.GRAY1};
  text-align: right;
  cursor: pointer;
`;

const detailBoxCSS = css`
  display: flex;
  justify-content: space-between;
`;

const detailCSS = css`
  font-weight: ${FONT.WEIGHT.REGULAR};
  font-size: ${FONT.SIZE.FOOTNOTE};
  color: ${COLOR.GRAY2};
  margin-top: 0.7rem;
  cursor: pointer;
`;

const profileCSS = css`
  margin-bottom: 0.5rem;
`;

const verticalBarCSS = css`
  color: ${COLOR.GRAY2};
  font-size: ${FONT.SIZE.FOOTNOTE};
  margin-top: 0.7rem;
  cursor: default;
`;
