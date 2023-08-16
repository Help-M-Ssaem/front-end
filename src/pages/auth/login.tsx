/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import FONT from "../../styles/font";
import Catlogo from "../../assets/logo/CatLogo.svg";
import Google from "../../assets/logo/Google.svg";
import Kakao from "../../assets/logo/Kakao.svg";
import Naver from "../../assets/logo/Naver.svg";

const LoginPage = () => {
  const loginHandler = (URL: string) => {
    window.location.href = URL;
  };

  function KakaoLogin() {
    const URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

    // https://kauth.kakao.com/oauth/authorize?client_id=0b193a8cee2b14d1a2c57470cb2d8e3b&redirect_uri=https://m-ssaem.vercel.app/kakao/login&response_type=code
    loginHandler(URL);
  }

  function NaverLogin() {
    const URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_API_KEY}&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}&state=test`;
    loginHandler(URL);
  }

  function GoogleLogin() {
    const URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_API_KEY}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;

    loginHandler(URL);
  }

  return (
    <div css={loginCss}>
      <img src={Catlogo} css={CatCss} />
      <h1 css={titleCSS}>로그인 / 회원가입 </h1>

      <span css={descCSS}>소셜 로그인으로 가입할 수 있습니다.</span>

      <hr css={lineCSS} />

      <div css={RectCSS}>
        <img src={Google} onClick={GoogleLogin} />
        <img src={Kakao} onClick={KakaoLogin} />
        <img src={Naver} onClick={NaverLogin} />
      </div>
    </div>
  );
};
const loginCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  max-width: 100rem;
`;

const CatCss = css`
  width: 7rem;
  padding-top: 2rem;
`;

const titleCSS = css`
  font-size: ${FONT.SIZE.TITLE1};
  font-weight: ${FONT.WEIGHT.BOLD};
  margin-right: 0.5rem;
  padding-top: 2rem;
`;

const descCSS = css`
  margin-right: 0.5rem;
  padding-top: 1rem;
  padding-bottom: 2rem;
  color: #7a7a7b;
`;

const lineCSS = css`
  border: 1px solid #d4d3d3;
  height: 0.1rem;
  width: 30rem;
`;

const RectCSS = css`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1rem;
  cursor: pointer;
  width: 30rem;
`;

export default LoginPage;
