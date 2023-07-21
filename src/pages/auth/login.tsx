/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { css } from "@emotion/react";
import FONT from "../../styles/font";
import { useNavigate } from "react-router-dom";
import { navbarState } from "../../states/navbar";
import Catlogo from "../../assets/logo/CatLogo.svg";

import Google from "../../assets/logo/Google.svg";
import Kakao from "../../assets/logo/Kakao.svg";
import Naver from "../../assets/logo/Naver.svg";
import KakaoLogin from "../../components/auth/KakaoLogin";
import GLogin from "../../components/auth/GoogleLogin";

const LoginPage = () => {
  const [state, setState] = useState({
    Id: "",
    password: "",
  });
  const setSelectedItem = useRecoilState(navbarState);

  const navigate = useNavigate();

  const handleItemClick = (path: string) => {
    // setSelectedItem(path);
    navigate(path);
  };

  return (
    <div css={loginCss}>
      <img src={Catlogo} css={CatCss} />
      <h1 css={titleCSS}>로그인 / 회원가입 </h1>

      <span css={descCSS}>소셜 로그인 및 이메일로 가입할 수 있습니다.</span>

      <hr css={lineCSS} />

      <div css={RectCSS}>
        {/* <GLogin /> */}
        <KakaoLogin />
        {/* <img src={Google} /> */}
        {/* <img src={Kakao} /> */}
        {/* <img src={Naver} /> */}
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

  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // padding-top: 3rem;
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
