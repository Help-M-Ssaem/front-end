/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import { MBTICOLOR } from "../../styles/color";

interface BadgeProps {
  mbti: string;
}
type MBTIColors = typeof MBTICOLOR;

const Badge = ({ mbti }: BadgeProps) => {
  const badgeMbti = mbti.toUpperCase();

  const badgeCSS = css`
    display: flex;
    justify-content: center;
    align-items: center;

    color: ${COLOR.WHITE};
    font-size: ${FONT.SIZE.BODY};
    font-weight: ${FONT.WEIGHT.REGULAR};
    background: ${MBTICOLOR[badgeMbti as keyof MBTIColors] || "#5BE1A9"};
    padding: 0 0.5rem;
    border-radius: 0.9rem;
    margin-right: 0.4rem;

    height: 1.3rem;
    white-space: nowrap;
  `;

  return <div css={badgeCSS}>{mbti}</div>;
};

export default Badge;
