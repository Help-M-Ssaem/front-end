/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import { MBTICOLOR } from "../../styles/color";
import { useEffect, useRef, useState } from "react";

interface BadgeProps {
  mbti: string;
  imgUrl?: string;
}
type MBTIColors = typeof MBTICOLOR;

const Badge = ({ mbti, imgUrl }: BadgeProps) => {
  const [color, setColor] = useState("#7A7A7B");
  const [changeColor, setChangeColor] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const backgroundRef = useRef<HTMLDivElement>(null);

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
    }
  }, []);

  const formattedMbti = mbti && mbti.length === 4 && mbti.toUpperCase();

  const handleBadgeClick = () => {
    setModalOpen(!modalOpen);
  };
  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setModalOpen(false);
  };

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
    padding: 0.2rem 0.5rem;
    border-radius: 0.9rem;
    margin-right: 0.4rem;
    white-space: nowrap;
  `;

  return (
    <>
      <div
        ref={backgroundRef}
        css={[badgeCSS, imgUrl && cursorCSS]}
        onClick={handleBadgeClick}
      >
        {mbti}
      </div>
      {modalOpen && imgUrl && (
        <div css={modalBackground} onClick={handleBackgroundClick}>
          <div css={modalMain}>
            <img src={imgUrl} alt="badge" css={imgCSS} />
          </div>
        </div>
      )}
    </>
  );
};

export default Badge;

const cursorCSS = css`
  cursor: pointer;
`;

const modalBackground = css`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const modalMain = css`
  position: absolute;
  display: flex;
  width: 20rem;
  height: 30rem;
  border-radius: 1rem;
  flex-direction: column;
`;

const imgCSS = css`
  width: 100%;
  height: 100%;
`;
