/** @jsxImportSource @emotion/react */
import { ReactElement } from "react";
import { motion } from "framer-motion";
import { SerializedStyles, css } from "@emotion/react";
import { ContainerAnimation } from "../../styles/animation";
import COLOR from "../../styles/color";

interface ContainerProps {
  children?: ReactElement[] | ReactElement | React.ReactNode;
  addCSS?: SerializedStyles;
}

const Container = ({ children, addCSS }: ContainerProps) => {
  const containerCSS = css`
    background: ${COLOR.MAIN3};
    border-radius: 1.2rem;
    padding: 1.5rem;
  `;

  return (
    <motion.div
      css={[containerCSS, addCSS]}
      initial="hidden"
      animate="visible"
      variants={ContainerAnimation}
    >
      {children}
    </motion.div>
  );
};

export default Container;
