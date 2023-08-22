/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../../styles/color"; 
import FONT from "../../../styles/font";
import { useState } from "react";
import { Option } from "../../../interfaces/debate";
import { useSelectedItem } from "../../../hooks/debate/useVoteItem";
import { useNavigate } from "react-router-dom";

interface VoteItemProps extends Option {
    PostId: number;
    optionSelected : boolean;
  }
const VoteItem = ({
    id,
    content,
    imgUrl,
    selectedPercent,
    selected,
    PostId,
    optionSelected,
}: VoteItemProps ) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const selectedMutation = useSelectedItem(PostId, id);
    const token = localStorage.getItem("accessToken");
    const handleClick = () => {
        if(!token){
            window.alert("로그인 후 이용할 수 있습니다.");
            navigate(`/login`);
            return ;
        }
        selectedMutation.mutate();
    }
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return(
        <div
            css= {[ImgBoxCSS, (selected) &&activeItemCSS, (!optionSelected) && ImgBoxColorCSS]}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={!optionSelected ? handleClick : undefined}
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
  height: 100%;
  border-radius: 1.4rem;
  cursor: pointer;
  position: relative;
  border: 1px solid ${COLOR.GRAY4};
  transition: background-color 0.3s, color 0.3s;
  color: ${COLOR.BLACK};
`;

const ImgBoxColorCSS = css`
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
    object-fit: cover; 
`;

const textCSS = ({ size, weight }: { size: string, weight: number }) => css`
  font-size: ${size};
  font-weight: ${weight};
  padding: 1rem;
  align-items: center;
  justify-content: center;
  display: flex;
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

