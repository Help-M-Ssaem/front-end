/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import FONT from "../../styles/font";
import COLOR from "../../styles/color";
import Container from "../container/Container";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

const NotLoginComponent = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Container addCSS={containerCSS}>
      <div css={textCSS}>M쌤이 되어 더 자유롭게 이용하세요</div>
      <Button onClick={handleLogin}>로그인하고 이용하기</Button>
      {/* <div css={detailBoxCSS}>
        <div css={detailCSS}>아이디 찾기</div>
        <span css={verticalBarCSS}>|</span>
        <div css={detailCSS}>비밀번호 찾기</div>
        <span css={verticalBarCSS}>|</span>
        <div css={detailCSS}>회원가입</div>
      </div> */}
    </Container>
  );
};

export default NotLoginComponent;

const containerCSS = css`
  background: ${COLOR.WHITE};
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
`;

const textCSS = css`
  font-weight: ${FONT.WEIGHT.REGULAR};
  font-size: ${FONT.SIZE.FOOTNOTE};
  color: ${COLOR.GRAY1};
  margin-bottom: 0.7rem;
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
  padding: 0 0.2rem;
  cursor: pointer;
`;

const verticalBarCSS = css`
  color: ${COLOR.GRAY2};
  font-size: ${FONT.SIZE.FOOTNOTE};
  margin-top: 0.7rem;
  cursor: default;
`;
