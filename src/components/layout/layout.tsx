/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <div css={layoutStyles}>{children}</div>;
};

const layoutStyles = css`
  width: 100%;
  min-width: 1280px;

  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 12rem 15rem 0 15rem;
`;

export default Layout;
