/** @jsxImportSource @emotion/react */
import { MouseEvent } from "react";
import { css } from "@emotion/react";
import COLOR from "../../../styles/color";
import FONT from "../../../styles/font";
import { useState } from "react";
import { Option } from "../../../interfaces/debate";
import { mssaemAxios as axios } from "../../../apis/axios";
interface VoteItemProps extends Option {
  PostId: number;
}
const VoteItem = ({
  id,
  content,
  imgUrl,
  selectedPercent,
  selected,
  PostId,
}: VoteItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    if (selected !== true) {
      axios.post(
        `/member/discussions/${PostId}/discussion-options/${id}`,
        (selected = true),
      );
    }
  };

  return (
    <div
      css={[ImgBoxCSS, selected && activeItemCSS]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div css={imageWrapperCSS2}>
        {imgUrl !== undefined &&
        imgUrl !== null &&
        (imgUrl.endsWith(".png") || imgUrl.endsWith(".jpg")) &&
        !isHovered ? (
          <div css={imageContainerCSS}>
            <img src={imgUrl} css={imageCSS} alt={content} />
            <span css={titleTextStyle}>{content}</span>
          </div>
        ) : (
          <span css={bigTitleTextStyle}>{content}</span>
        )}

        {isHovered && (
          <div css={persentBox}>
            <span css={percentageTextStyle}>{selectedPercent}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoteItem;

const ImgBoxCSS = css`
  width: 100%;
  height: 100%;
  border-radius: 1.4rem;
  cursor: pointer;
  position: relative;
  border: 1px solid ${COLOR.GRAY4};

  color: ${COLOR.BLACK};

  &:hover {
    background-color: ${COLOR.MAIN2};
    color: ${COLOR.WHITE};
  }
`;

const activeItemCSS = css`
  background-color: ${COLOR.MAIN2};
  color: ${COLOR.WHITE};
`;

const imageWrapperCSS2 = css`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 1rem 0 1rem 0;
  min-height: 10rem;
  align-items: center;
  position: relative;
`;

const imageContainerCSS = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

//흑흑 이미지 사이즈가 마음에 들지 않다면 절 바꿔요..
const imageCSS = css`
  width: auto;
  height: auto;
  max-height: 9rem;
  object-fit: contain;
`;

const textCSS = ({ size, weight }: { size: string; weight: number }) => css`
  margin-top: 0.5rem;
  font-size: ${size};
  font-weight: ${weight};
`;

const titleTextStyle = textCSS({
  size: FONT.SIZE.TITLE3,
  weight: FONT.WEIGHT.REGULAR,
});

const bigTitleTextStyle = textCSS({
  size: FONT.SIZE.BIGTITLE,
  weight: FONT.WEIGHT.REGULAR,
});

const percentageTextStyle = css`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: ${FONT.SIZE.TITLE2};
  font-weight: ${FONT.WEIGHT.REGULAR};
  z-index: 20;
`;
const persentBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
