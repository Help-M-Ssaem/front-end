/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import { MBTICOLOR } from "../../styles/color";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ContainerAnimation } from "../../styles/animation";

interface BadgeProps {
  mbti: string;
  imgUrl?: string;
  isSelected?: boolean;
  onClick?: () => void;
}
type MBTIColors = typeof MBTICOLOR;

const Badge = ({ mbti, imgUrl, isSelected, onClick }: BadgeProps) => {
  const [color, setColor] = useState("#7A7A7B");
  const [modalOpen, setModalOpen] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const formattedMbti = mbti && mbti.toUpperCase();
    if (formattedMbti in MBTICOLOR) {
      setColor(MBTICOLOR[formattedMbti as keyof MBTIColors]);
    } else {
      switch (mbti) {
        case "엠비티어른":
          setColor("#F85CA2");
          break;
        case "MBTMI":
          setColor("#FAA454");
          break;
        case "엠비티라노":
          setColor("#00AF76");
          break;
        case "NEWBIE":
          setColor("#80E045");
          break;
        case "FUNFUN":
          setColor("#00B5DC");
          break;
        case "해결 완료":
          setColor("#7A7A7B");
          break;
        default:
          break;
      }
    }
  }, [mbti]);

  const handleBadgeClick = () => {
    if (onClick) {
      onClick();
    }
    setModalOpen(!modalOpen);
  };
  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setModalOpen(false);
  };

  const badgeCSS = css`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    color: ${COLOR.WHITE};
    font-size: ${FONT.SIZE.BODY};
    font-weight: ${FONT.WEIGHT.REGULAR};
    background: ${color};
    padding: 0.2rem 0.5rem;
    border-radius: 0.9rem;
    margin-right: 0.4rem;
    white-space: nowrap;

    ${isSelected &&
    css`
      border: 0.2rem solid ${COLOR.MAIN2};
      align-items: center;
      padding: 0.1rem 0.4rem;
      display: flex;
    `}
  `;

  return (
    <>
      <div ref={backgroundRef} css={[badgeCSS]} onClick={handleBadgeClick}>
        {mbti}
      </div>
      {modalOpen && imgUrl && (
        <div css={modalBackground} onClick={handleBackgroundClick}>
          <motion.div
            css={modalMain}
            initial="hidden"
            animate="visible"
            variants={ContainerAnimation}
          >
            <img src={imgUrl} alt="badge" css={imgCSS} />
          </motion.div>
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
