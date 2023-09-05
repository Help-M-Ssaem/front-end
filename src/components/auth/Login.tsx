/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import FONT from "../../styles/font";
import COLOR from "../../styles/color";
import Container from "../container/Container";
import Profile from "../profile/Profile";
import { User } from "../../interfaces/user";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface userProps {
  user: User;
}

const LoginComponent = ({ user }: userProps) => {
  const navigate = useNavigate();
  const logout_url = `https://m-ssaem.vercel.app/logout`;
  // const logout_url = `https://localhost:3000/logout`;
  const handleLogout = () => {
    axios.get(
      `https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&logout_redirect_uri=${logout_url}`,
    );
    //쿠키 삭제 로직 추가
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

      // 3. 쿠키 만료 날짜 설정 (현재 시간 이전으로)
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    localStorage.removeItem("accessToken");
    window.location.reload();
    // window.location.href = "/";
  };

  return (
    <Container addCSS={containerCSS}>
      <div css={textCSS} onClick={handleLogout}>
        로그아웃
      </div>
      <div css={profileCSS}>
        <Profile
          id={user.id}
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
  white-space: nowrap;
`;

const profileCSS = css`
  margin-bottom: 0.5rem;
`;

const verticalBarCSS = css`
  color: ${COLOR.GRAY2};
  font-size: ${FONT.SIZE.FOOTNOTE};
  margin-top: 0.7rem;
  cursor: default;
  padding: 0 0.2rem;
`;
