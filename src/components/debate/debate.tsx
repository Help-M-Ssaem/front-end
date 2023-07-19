/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Option, DebateProps } from "../../interfaces/debate";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import Badge from "../badge/Badge";
import { useState } from "react";

const DebateComponent = ({ debate }: DebateProps) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(debate.selectedOptionIndex);
  const [voted, setVoted] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const vote = (index:number) => {
    if (voted) {
      return;
    }

    const updatedOptions = options.map((option, i) =>
      i === index ? { ...option, voteCount: option.voteCount + 1 } : option
    );

    setOptions(updatedOptions);
    setSelectedOptionIndex(index);
    setVoted(true);
    setTotalCount(totalCount + 1);
  };

  const handleItemClick = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    event.preventDefault();
    vote(index)

  };
  return (
    <div css={debateBoxCSS}>
      <div css={leftCSS}>
        <div css={dateTop}>
            <div css={profileBoxCSS}>
          <img
            css={[profileImgCSS, leftCSS]}
            src={debate.profile}
            alt="profile"
          />
          <div css={[profileCSS, rightCSS]}>
            <div css={nameCSS}>{debate.name} 님</div>
            <div css={profileDetailCSS}>
              <Badge mbti={debate.mbti} color={"#F8CAFF"} />
              <Badge mbti={debate.badge} color={"#5BE1A9"} />
            </div>
          </div>
        </div>

        <div css={marginRightCSS}>{debate.createdAt}</div>
      </div>

      <div css={titleCSS}>{debate.title}</div>
      <div css={contentCSS}>{debate.content}</div>
      <div css={imageContentCSS}>
      {debate.selectedOptions.map((image: Option, index: number) => {
          const isActive = selectedOptionIndex === index && voted;
          const isVotedOption = index === debate.selectedOptionIndex && debate.voted
          return (
            <div
              css={[imageWrapperCSS, listCSS, (isActive || isVotedOption)&& activeItemCSS]}
              onClick={(event) => (!debate.voted)&& handleItemClick(event, index)}>

            <div css={imageWrapperCSS2} key={index}>
              {typeof image.imageContentURL === "string" ? (
              <div css={imageContainerCSS}>
                {/* 이미지 url로 따와서 사용시에-> 임시로 쓰는거 */}
              <img src={image.imageContentURL} css={imageCSS} alt={image.textContent} />
              <span css={textCSS({ size: FONT.SIZE.TITLE3, weight: FONT.WEIGHT.REGULAR })}>
                {image.textContent}
              </span>
              </div>)
              : <span 
              css={textCSS({ size: FONT.SIZE.BIGTITLE, weight: FONT.WEIGHT.REGULAR })}>
                {image.textContent}</span>}
            </div>
            {(voted||debate.voted) && (
                  <div css ={persentBox}>
                  <span  css={[
                    textCSS({ size: FONT.SIZE.TITLE2, weight: FONT.WEIGHT.REGULAR }),
                    (isActive || isVotedOption) ? { color: COLOR.WHITE } : { color: COLOR.BLACK },
                  ]}
                  >
                    {debate.totalVotes > 0
            ? `${((image.voteCount / debate.totalVotes) * 100).toFixed(1)}%`
            : ""}
                  </span>
                  </div>
                )}
          </div>
          );
          })}
          </div>
          
          <div css={detailCSS}>
            <div>{debate.totalVotes}명이 참여중</div>
            <div>댓글 {debate.comment}</div>
          </div>
      </div>
      <div css={bottomLineCSS}>&nbsp;</div>
    </div>
  );
};

const debateBoxCSS = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  margin: 0 0 4rem 0;
  background: ${COLOR.MAIN3};
  border-radius: 1.4rem;

  position: relative;
`;

const bottomLineCSS = css`
  content: "";
  display: block;
  position: absolute;
  bottom: -1.5rem;
  left: 0;
  width: 100%;
  height: 1px;
  background: ${COLOR.GRAY4};
`;

const leftCSS = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1; 
`;

const dateTop = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const rightCSS = css``;

const nameCSS = css`
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.SEMIBOLD};
  margin-bottom: 0.4rem;
`;

const titleCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  margin-bottom: 0.4rem;
`;

const contentCSS = css`
  margin-bottom: 1rem;
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.REGULAR};
`;

const imageContentCSS = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  justify-content: center;
  place-items: center
  grid-auto-rows: minmax(0, auto);
`;

const imageWrapperCSS = css`
  cursor: pointer;
  background-color: ${COLOR.WHITE};
  width: 100%; 
  height: 100%;
  border-radius: 1.4rem;
  border: 1px solid ${COLOR.GRAY4};
`;

const listCSS = css`
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: ${COLOR.MAIN2};
  }
`;

const activeItemCSS = css`
  background-color: ${COLOR.MAIN2};
`;

const imageWrapperCSS2 = css`
flex: 1;
display: flex;
justify-content: center;
padding: 1rem 0 1rem 0;
`;

const imageContainerCSS = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//흑흑 이미지 사이즈가 마음에 들지 않다면 절 바꿔요..
const imageCSS = css`
width: auto; 
height: auto; 
max-height: 9rem; 
object-fit: contain; 
`;

const textCSS = ({ size, weight }: { size: string, weight: number }) => css`
  margin-top: 0.5rem;
  font-size: ${size};
  font-weight: ${weight};
`;

const marginRightCSS = css`
  margin-bottom: 2.6rem;
  margin-left: auto;
  font-size: 0.9rem;
  color: ${COLOR.GRAY2};
  font-size: ${FONT.SIZE.FOOTNOTE};
  font-weight: ${FONT.WEIGHT.REGULAR};
`;

const profileBoxCSS = css`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
`;

const profileImgCSS = css`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  margin-right: 1rem;
`;

const profileCSS = css`
  display: flex;
  flex-direction: column;
`;

const profileDetailCSS = css`
  display: flex;
`;

const detailCSS = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: ${COLOR.GRAY2};
  font-size: ${FONT.SIZE.FOOTNOTE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  margin-top: 1rem;
  margin-right: 1rem;
  margin-left: 1rem;

`;

const persentBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.7rem;
`;

export default DebateComponent;
