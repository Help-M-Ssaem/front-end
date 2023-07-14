/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Badge from "../badge/Badge";
import FONT from "../../styles/font";

type profileProps = {
  image: string;
  name: string;
  mbti: string;
  badge: string;
};

const Profile = ({ image, name, mbti, badge }: profileProps) => {
  return (
    <div css={profileBoxCSS}>
      <img css={profileImgCSS} src={image} alt="profile" />
      <div css={profileCSS}>
        <div css={nameCSS}>{name} 님</div>
        <div css={profileDetailCSS}>
          <Badge mbti={mbti} color={"#F8CAFF"} />
          <Badge mbti={badge} color={"#5BE1A9"} />
        </div>
      </div>
    </div>
  );
};

export default Profile;

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

const profileDetailCSS = css`
  display: flex;
`;

const nameCSS = css`
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.SEMIBOLD};
  margin-bottom: 0.4rem;
`;
