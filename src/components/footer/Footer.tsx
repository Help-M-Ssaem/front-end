/** @jsxImportSource @emotion/react */
import React from "react";
import { LogoIcon } from "../../assets/HeaderIcons";
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import { useNavigate } from "react-router-dom";
import FONT from "../../styles/font";

const Footer = () => {
  const navigate = useNavigate();

  const handleWindowClick = (path: string) => {
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
        <LogoIcon
          width={"170"}
          height={"45"}
          onClick={() => handleWindowClick("/")}
        />
      </div>
    </footer>
  );
};

export default Footer;

const footerCSS = css`
  width: 100%;
  height: 10rem;
  min-width: 1280px;
  padding: 10rem 15rem 5rem 15rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const infoCSS = css`
  display: flex;
  color: ${COLOR.GRAY2};
  cursor: pointer;
  font-size: ${FONT.SIZE.BODY};
  font-weight: ${FONT.WEIGHT.REGULAR};

  li {
    padding: 0 0.5rem;
    border-right: 1px solid ${COLOR.GRAY2};
  }

  li:last-child {
    border-right: none;
  }
`;

const lineCSS = css`
  width: 100%;
  margin: 1.2rem 0;
  border: 0.5px solid ${COLOR.GRAY4};
`;

const logoIcon = css``;
