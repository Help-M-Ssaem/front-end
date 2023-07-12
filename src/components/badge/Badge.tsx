/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";

type BadgeProps = {
  mbti: string;
  color?: string;
};

const Badge = ({ mbti, color }: BadgeProps) => {
  const badgeCSS = css`
    display: flex;
    justify-content: center;
    align-items: center;

    color: ${COLOR.WHITE};
    font-size: ${FONT.SIZE.BODY};
    font-weight: ${FONT.WEIGHT.REGULAR};
    background: ${color || "transparent"};
    padding: 0.1rem 0.5rem;
    border-radius: 0.9rem;
    margin-right: 0.5rem;
  `;

  return <div css={badgeCSS}>{mbti}</div>;
};

export default Badge;
