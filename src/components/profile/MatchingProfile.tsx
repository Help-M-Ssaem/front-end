/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Badge from "../badge/Badge";
import FONT from "../../styles/font";
import COLOR from "../../styles/color";
import { RightArrowIcon } from "../../assets/CommonIcons";

interface MatchingprofileProps {
  image: string;
  name: string;
  memberMbti: string;
  targetMbti: string;
}

const MatchingProfile = ({
  image,
  name,
  memberMbti,
  targetMbti,
}: MatchingprofileProps) => {
  return (
    <div css={profileBoxCSS}>
      <img css={profileImgCSS} src={image} alt="profile" />
      <div css={profileCSS}>
        <div css={nameCSS}>{name} 님</div>
        <div css={mbtiBoxCSS}>
          <Badge mbti={memberMbti} />
          <RightArrowIcon />
          <Badge mbti={targetMbti} />
        </div>
      </div>
    </div>
  );
};

export default MatchingProfile;

const profileBoxCSS = css`
  display: flex;
  align-items: center;
`;

const profileImgCSS = css`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  margin-right: 0.8rem;
  object-fit: cover;
`;

const profileCSS = css`
  display: flex;
  flex-direction: column;
`;

const mbtiBoxCSS = css`
  display: flex;
  align-items: center;
`;

const nameCSS = css`
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.SEMIBOLD};
  margin-bottom: 0.4rem;
`;
