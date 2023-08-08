/** @jsxImportSource @emotion/react */
import { MouseEvent } from "react";
import { css } from "@emotion/react";
<<<<<<< HEAD
import COLOR from "../../../styles/color";
=======
import COLOR from "../../../styles/color"; 
>>>>>>> a26b40dc81d50aca2999cdd802c4f3e7c4b8c32f
import FONT from "../../../styles/font";
import { useState } from "react";
import { Option } from "../../../interfaces/debate";
import { mssaemAxios as axios } from "../../../apis/axios";
interface VoteItemProps extends Option {
<<<<<<< HEAD
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
=======
    PostId: number;
  }
const VoteItem = ({
    id,
    content,
    imgUrl,
    selectedPercent,
    selected,
    PostId,
}: VoteItemProps ) => {
    const [isHovered, setIsHovered] = useState(false);
    const fetchData = async () => {
        try {
          const response = await axios.get(`/discussions/${PostId}`);
          const data = response.data;
          const optionList = data.discussionSimpleInfo.options;
          const isAnyOptionSelected = optionList.some((option: { selected: boolean; }) => option.selected === true);
          return isAnyOptionSelected;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleClick = () => {
        if(!fetchData() && selected!==true){
            axios.post(`/member/discussions/${PostId}/discussion-options/${id}`,selected=true)
              };
    };

    return(
        <div
            css= {[ImgBoxCSS, (selected) && activeItemCSS]}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <div css={imageWrapperCSS2}>
            {imgUrl !== undefined && imgUrl !== null && (imgUrl.endsWith(".png") || imgUrl.endsWith(".jpg"))&& !isHovered ? (
            <div css={imageContainerCSS}>
                <img src={imgUrl} css={imageCSS} alt={content} />
                <span css={titleTextStyle}>{content}</span>
            </div>
            ):(
            <span css={bigTitleTextStyle}>{content}</span>
            )}

            {isHovered && (
                <div css={persentBox}>
                    <span css={percentageTextStyle}>
                        {selectedPercent}
                    </span>
                </div>
            )}
            </div>
        </div>
    )

}

export default VoteItem;


const ImgBoxCSS = css`
  width: 100%; 
>>>>>>> a26b40dc81d50aca2999cdd802c4f3e7c4b8c32f
  height: 100%;
  border-radius: 1.4rem;
  cursor: pointer;
  position: relative;
  border: 1px solid ${COLOR.GRAY4};
  transition: background-color 0.3s, color 0.3s;
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
<<<<<<< HEAD
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 1rem 0 1rem 0;
  min-height: 10rem;
  align-items: center;
  position: relative;
=======
flex: 1;
display: flex;
justify-content: center;
padding: 1rem 0 1rem 0;
min-height: 10rem;
align-items: center;
position: relative;
>>>>>>> a26b40dc81d50aca2999cdd802c4f3e7c4b8c32f
`;

const imageContainerCSS = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

//흑흑 이미지 사이즈가 마음에 들지 않다면 절 바꿔요..
const imageCSS = css`
<<<<<<< HEAD
  width: auto;
  height: auto;
  max-height: 9rem;
  object-fit: contain;
`;

const textCSS = ({ size, weight }: { size: string; weight: number }) => css`
=======
    width: auto; 
    height: auto; 
    max-height: 9rem; 
    object-fit: contain; 
`;

const textCSS = ({ size, weight }: { size: string, weight: number }) => css`
>>>>>>> a26b40dc81d50aca2999cdd802c4f3e7c4b8c32f
  margin-top: 0.5rem;
  font-size: ${size};
  font-weight: ${weight};
`;

const titleTextStyle = textCSS({
<<<<<<< HEAD
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
=======
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
>>>>>>> a26b40dc81d50aca2999cdd802c4f3e7c4b8c32f
`;
const persentBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
<<<<<<< HEAD
=======

>>>>>>> a26b40dc81d50aca2999cdd802c4f3e7c4b8c32f
