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
        <li onClick={() => handleWindowClick("policy/community")}>이용약관</li>
        <li onClick={() => handleWindowClick("/policy/privacy")}>
          개인정보처리방침
        </li>
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
  padding: 10rem 15rem 5rem 15rem;
  // position: fixed;
  bottom: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100vw;
    padding: 0;
    // position: absolute;
    margin-bottom: 0rem;
    height: 5rem;
  }
`;

const infoCSS = css`
  display: flex;
  color: ${COLOR.GRAY2};
  cursor: pointer;
  font-size: ${FONT.SIZE.CAPTION};
  font-weight: ${FONT.WEIGHT.REGULAR};

  li {
    padding: 0 0.5rem;
    border-right: 1px solid ${COLOR.GRAY2};
  }

  li:last-child {
    border-right: none;
  }

  @media (max-width: 768px) {
    margin: 0.3rem;
  }
`;

const lineCSS = css`
  width: 100%;
  margin: 1.2rem 0;
  border: 0.5px solid ${COLOR.GRAY4};

  @media (max-width: 400px) {
    margin: 0;
    border: 0.5px solid ${COLOR.GRAY4};
  }
`;

const logoIcon = css`
  @media (max-width: 400px) {
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 50%;
    }
  }
`;
