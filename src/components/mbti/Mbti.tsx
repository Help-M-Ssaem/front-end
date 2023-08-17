/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { EmptyStarIcon, FilledStarIcon } from "../../assets/CommonIcons";
import { css } from "@emotion/react";
import FONT from "../../styles/font";
import COLOR from "../../styles/color";
import { useRecoilState } from "recoil";
import { mbtiState } from "../../states/board";
import { useCategoryBookmarkUpdate } from "../../hooks/board/category/useCategoryBookmarkUpdate";
import { useCategoryCount } from "../../hooks/board/category/useCategoryCount";

interface MbtiProps {
  mbti: string;
  bookmark: boolean;
}

const Mbti = ({ mbti, bookmark }: MbtiProps) => {
  const [filled, setFilled] = useState(false);
  const [mbtiSelected, setMbtiSelected] = useRecoilState(mbtiState);
  const categoryBookmarkMutation = useCategoryBookmarkUpdate(mbti);
  const { categoryCount } = useCategoryCount();

  const handleStarClick = () => {
    setFilled(!filled);
    categoryBookmarkMutation.mutate();
  };
  const handleMbtiClick = (mbti: string) => {
    setMbtiSelected(mbti);
  };

  const count = categoryCount && categoryCount[mbti.toLowerCase()];

  return (
    <div css={mbtiBoxCSS}>
      <div
        css={mbtiCSS}
        onClick={() => handleMbtiClick(mbti)}
        className={mbtiSelected === mbti ? "active" : ""}
      >
        <div css={mbtiTextCSS}>{mbti}</div>
        <div>({count ? count : 0})</div>
      </div>
      <div css={starCSS}>
        {bookmark ? (
          <FilledStarIcon onClick={handleStarClick} />
        ) : (
          <EmptyStarIcon onClick={handleStarClick} />
        )}
      </div>
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
  padding: 0.5rem 3rem;
  white-space: nowrap;
`;

const mbtiCSS = css`
  display: flex;
  align-items: center;
  width: 100%;
  &:hover,
  &.active {
    color: ${COLOR.MAINDARK};
    font-weight: ${FONT.WEIGHT.MEDIUM};
    text-decoration: underline;
    transition: 0.3s;
  }
`;

const mbtiTextCSS = css`
  width: 2.4rem;
`;

const starCSS = css`
  display: flex;
  align-items: center;
`;
