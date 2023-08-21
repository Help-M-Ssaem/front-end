/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import { MBTICOLOR } from "../../styles/color";
import { useEffect, useState } from "react";

interface BadgeProps {
  mbti: string;
}
type MBTIColors = typeof MBTICOLOR;

const Badge = ({ mbti }: BadgeProps) => {
  const [color, setColor] = useState("#7A7A7B");
  const [changeColor, setChangeColor] = useState(false);

  useEffect(() => {
    if (mbti === "엠비티어른" || mbti === "FUNFUN") {
      setColor("#C85287");
      setChangeColor(true);
    } else if (mbti === "MBTMI") {
      setColor("#F6E0A6");
      setChangeColor(true);
    } else if (mbti === "엠비티라노") {
      setColor("#00AF76");
      setChangeColor(true);
    } else if (mbti === "NEWBIE") {
      setColor("#9BF266");
      setChangeColor(true);
    }
  }, []);

  const formattedMbti = mbti && mbti.length === 4 && mbti.toUpperCase();

  const badgeCSS = css`
    display: flex;
    justify-content: center;
    align-items: center;

    color: ${COLOR.WHITE};
    font-size: ${FONT.SIZE.BODY};
    font-weight: ${FONT.WEIGHT.REGULAR};
    background: ${changeColor
      ? color
      : MBTICOLOR[formattedMbti as keyof MBTIColors]};
    padding: 0.15rem 0.5rem;
    border-radius: 0.9rem;
    margin-right: 0.4rem;
    white-space: nowrap;
  `;

  return <div css={badgeCSS}>{mbti}</div>;
};

export default Badge;
