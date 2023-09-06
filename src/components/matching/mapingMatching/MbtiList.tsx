/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../../styles/color";
import FONT from "../../../styles/font";

const mbtiList = [
    "ALL",
    "ISTJ",
    "ISFJ",
    "INFJ",
    "INTJ",
    "ISTP",
    "ISFP",
    "INFP",
    "INTP",
    "ESTP",
    "ESFP",
    "ENFP",
    "ENTP",
    "ESTJ",
    "ESFJ",
    "ENFJ",
    "ENTJ",
  ];

  interface MbtiListProps {
    onClick: (mbti: string) => void;
  }

  
const MbtiList: React.FC<MbtiListProps> = ({ onClick }) => {
  return (
    <div css={categoryBoxCSS}>
      {mbtiList.map((mbti) => (
        <div css={categoryCSS} onClick={() => onClick(mbti)}>
          {mbti}
        </div>
      ))}
    </div>
  );
};

export default MbtiList;

const categoryBoxCSS = css`
  display: flex;
  flex-wrap: wrap;
  width: 20rem;

  border: 1px solid ${COLOR.GRAY4};
  border-radius: 1rem;
  padding: 1rem 1rem 1rem 2rem;
  margin-bottom: 1rem;

  position: absolute;
  left: 0;
  top: 2rem;
  background: ${COLOR.WHITE};
  z-index: 1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const categoryCSS = css`
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  color: ${COLOR.GRAY2};
  cursor: pointer;
  padding: 0.5rem 0;
  width: 3.3rem;
`;
