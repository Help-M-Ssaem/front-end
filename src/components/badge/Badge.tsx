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
    if (mbti === "엠비티어른") {
      setColor("#F85CA2");
      setChangeColor(true);
    } else if (mbti === "MBTMI") {
      setColor("#FAA454");
      setChangeColor(true);
    } else if (mbti === "엠비티라노") {
      setColor("#00AF76");
      setChangeColor(true);
    } else if (mbti === "NEWBIE") {
      setColor("#80E045");
      setChangeColor(true);
    } else if (mbti === "FUNFUN") {
      setColor("#00B5DC");
      setChangeColor(true);
    } else {
      setColor("#7A7A7B");
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
