/** @jsxImportSource @emotion/react */
import React from "react";
import { LogoIcon } from "../../assets/HeaderIcons";
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { navbarState } from "../../states/navbar";
import FONT from "../../styles/font";

const Footer = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useRecoilState(navbarState);
  const handleItemClick = (path: string) => {
    setSelectedItem(path);
    navigate(path);
  };

  return (
    <footer css={footerCSS}>
      <ul css={infoCSS}>
        <li>이용약관</li>
        <li>개인정보처리방침</li>
        <li>문의 이메일</li>
      </ul>

      <hr css={lineCSS} />
      <div css={logoIcon}>
        <LogoIcon onClick={() => handleItemClick("/")} />
      </div>
    </footer>
  );
};

export default Footer;

const footerCSS = css`
  width: 100%;
  height: 8rem;
  min-width: 1280px;
  bottom: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 15rem;
  background: ${COLOR.WHITE};

  position: fixed;
  z-index: 1;
`;

const lineCSS = css`
  position: absolute;
  border: 1px solid #d4d3d3;
  bottom: 4rem;
  height: 0;
  display: flex;

  width: 70%;
  left: 20rem;
`;

const logoIcon = css`
  display: flex;
  width: 10rem;
  position: absolute;
  bottom: 0;
`;

const infoCSS = css`
  display: flex;
  position: absolute;
  top: 1.5rem;

  justify-content: space-between;

  align-items: center;

  font-size: ${FONT.SIZE.BODY};
  color: ${COLOR.GRAY2};
  li {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  li:not(:last-child)::after {
    content: "|";
    margin-left: 1rem;
    margin-right: 0.5rem;
  }
`;
