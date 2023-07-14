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
    <>
      <img css={[profileImgCSS, leftCSS]} src={image} alt="profile" />
      <div css={[profileCSS, rightCSS]}>
        <div css={nameCSS}>{name} 님</div>
        <div css={profileDetailCSS}>
          <Badge mbti={mbti} color={"#F8CAFF"} />
          <Badge mbti={badge} color={"#5BE1A9"} />
        </div>
      </div>
    </>
  );
};

export default Profile;

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

const nameCSS = css`
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.SEMIBOLD};
  margin-bottom: 0.4rem;
`;

const leftCSS = css`
  display: flex;
  flex-direction: column;
`;

const rightCSS = css``;
