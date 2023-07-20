/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import FONT from "../../styles/font";
import COLOR from "../../styles/color";
import Container from "../container/Container";
import Button from "../button/Button";

const NotLoginComponent = () => {
  return (
    <Container
      background={COLOR.WHITE}
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <div css={textCSS}>M쌤이 되어 더 자유롭게 이용하세요</div>
      <Button>로그인하고 이용하기</Button>
      <div css={detailBoxCSS}>
        <div css={detailCSS}>아이디 찾기</div>
        <div css={detailCSS}>비밀번호 찾기</div>
        <div css={detailCSS}>회원가입</div>
      </div>
    </Container>
  );
};

export default NotLoginComponent;

const textCSS = css`
  font-weight: ${FONT.WEIGHT.REGULAR};
  font-size: ${FONT.SIZE.FOOTNOTE};
  color: ${COLOR.GRAY1};
  margin-bottom: 0.7rem;
`;

const detailBoxCSS = css`
  display: flex;
  justify-content: center;
`;

const detailCSS = css`
  font-weight: ${FONT.WEIGHT.REGULAR};
  font-size: ${FONT.SIZE.FOOTNOTE};
  color: ${COLOR.GRAY2};
  margin-top: 0.7rem;
  padding: 0 0.2rem;
  cursor: pointer;
  border-right: 1px solid ${COLOR.GRAY3};

  &:last-child {
    border-right: none;
  }
`;
