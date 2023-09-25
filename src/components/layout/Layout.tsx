/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <div css={layoutCSS}>{children}</div>;
};

const layoutCSS = css`
  width: 100%;
  // min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  // padding: 9rem 15rem 0 15rem;
  // min-width: 1280px;

  @media screen and (max-width: 768px) {
    max-width: 768px;
    width: 100%;
    padding: 0rem;
  }

  @media screen and (min-width: 1280px) {
    padding: 3rem 15rem 0 15rem;
    min-height: 100vh;
  }
`;

export default Layout;
