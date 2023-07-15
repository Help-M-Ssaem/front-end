/** @jsxImportSource @emotion/react */
import { ReactElement } from "react";
import { motion } from "framer-motion";
import { css } from "@emotion/react";
import { ContainerAnimation } from "../../styles/animation";
import COLOR from "../../styles/color";

type ContainerProps = {
  width?: string;
  height?: string;
  background?: string;
  children?: ReactElement[] | ReactElement | React.ReactNode;
  style?: React.CSSProperties;
};

const Container = ({
  width,
  height,
  background,
  children,
  style,
}: ContainerProps) => {
  const containerCSS = css`
    width: ${width || "100%"};
    height: ${height || "100%"};
    background: ${background || COLOR.MAIN3};
    border-radius: 1.2rem;
    padding: 1.5rem;
  `;

  return (
    <motion.div
      css={containerCSS}
      initial="hidden"
      animate="visible"
      variants={ContainerAnimation}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export default Container;
