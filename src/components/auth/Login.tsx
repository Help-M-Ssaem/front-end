/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import FONT from "../../styles/font";
import COLOR from "../../styles/color";
import Container from "../container/Container";
import Profile from "../profile/Profile";
import { User } from "../../interfaces/user";
import { useNavigate } from "react-router-dom";

interface userProps {
  user: User;
}

const LoginComponent = ({ user }: userProps) => {
  const navigate = useNavigate();

  return (
    <Container addCSS={containerCSS}>
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
        <div css={detailCSS} onClick={() => navigate("/chatting")}>
          M쌤 채팅
        </div>
        <span css={verticalBarCSS}>|</span>
        <div css={detailCSS} onClick={() => navigate("/alarm")}>
          알림
        </div>
        <span css={verticalBarCSS}>|</span>
        <div css={detailCSS} onClick={() => navigate("/profile/myprofile")}>
          활동
        </div>
        <span css={verticalBarCSS}>|</span>
        <div css={detailCSS} onClick={() => navigate("/mypage/update")}>
          프로필 설정
        </div>
      </div>
    </Container>
  );
};

export default LoginComponent;

const containerCSS = css`
  background: ${COLOR.WHITE};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

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
