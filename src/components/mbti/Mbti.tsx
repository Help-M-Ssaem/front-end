/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { EmptyStarIcon, FilledStarIcon } from "../../assets/CommonIcons";
import { css } from "@emotion/react";
import FONT from "../../styles/font";
import COLOR from "../../styles/color";

type MbtiProps = {
  mbti: (string | boolean)[];
};

const Mbti = ({ mbti }: MbtiProps) => {
  const [filled, setFilled] = useState(false);

  const handleClick = () => {
    setFilled(!filled);
  };

  return (
    <div css={mbtiCSS} onClick={handleClick}>
      {mbti}
      {filled ? <FilledStarIcon /> : <EmptyStarIcon />}
    </div>
  );
};

export default Mbti;

const mbtiCSS = css`
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
