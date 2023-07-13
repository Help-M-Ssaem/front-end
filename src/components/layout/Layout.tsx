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
  min-width: 1280px;

  display: flex;
  flex-direction: column;

  padding: 10rem 15rem 0 15rem;
`;

export default Layout;
