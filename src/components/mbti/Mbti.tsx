/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { EmptyStarIcon, FilledStarIcon } from "../../assets/CommonIcons";
import { css } from "@emotion/react";
import FONT from "../../styles/font";
import COLOR from "../../styles/color";
import { useRecoilState } from "recoil";
import { mbtiState } from "../../states/board";

type MbtiProps = {
  mbti: string;
};

const Mbti = ({ mbti }: MbtiProps) => {
  const [filled, setFilled] = useState(false);
  const [mbtiSelected, setMbtiSelected] = useRecoilState(mbtiState);

  const handleStarClick = () => {
    setFilled(!filled);
  };

  const handleMbtiClick = (mbti: string) => {
    setMbtiSelected(mbti);
  };

  return (
    <div css={mbtiBoxCSS}>
      <div
        css={mbtiCSS}
        onClick={() => handleMbtiClick(mbti)}
        className={mbtiSelected === mbti ? "active" : ""}
      >
        {mbti}
      </div>
      {filled ? (
        <FilledStarIcon onClick={handleStarClick} />
      ) : (
        <EmptyStarIcon onClick={handleStarClick} />
      )}
    </div>
  );
};

export default Mbti;

const mbtiBoxCSS = css`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  color: ${COLOR.GRAY2};

  width: 24%;
  cursor: pointer;
  padding: 0.5rem 1rem;
`;

const mbtiCSS = css`
  &:hover,
  &.active {
    color: ${COLOR.MAINDARK};
    font-weight: ${FONT.WEIGHT.MEDIUM};
    text-decoration: underline;
    transition: 0.3s;
  }
`;
