/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Badge from "../badge/Badge";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import { HotTeacher } from "../../interfaces/worry";

interface MssaemProps {
  mssaem: HotTeacher;
}

const Mssaem: React.FC<MssaemProps> = ({ mssaem }) => {
  return (
    <div css={mssaemCSS}>
      <img css={profileCSS} src={mssaem.profileImgUrl} alt={"profile"} />
      <div css={nameCSS}>{mssaem.nickName} 님</div>
      <div css={badgeBoxCSS}>
        <Badge mbti={mssaem.mbti} />
        {mssaem.badge &&<Badge mbti={mssaem.badge} color={"#5BE1A9"} />}
      </div>
      <div css={titleCSS}>{mssaem.introduction}</div>
    </div>
  );
};

export default Mssaem;

const mssaemCSS = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
`;

const profileCSS = css`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  margin: 2rem 0 1rem 0;
`;

const nameCSS = css`
  color: ${COLOR.MAINDARK};
  font-size: ${FONT.SIZE.TITLE1};
  font-weight: ${FONT.WEIGHT.BOLD};
  margin-bottom: 0.4rem;
`;

const badgeBoxCSS = css`
  display: flex;
  margin-bottom: 1rem;
`;

const titleCSS = css`
  color: ${COLOR.GRAY1};
  font-size: ${FONT.SIZE.BODY};
  font-weight: ${FONT.WEIGHT.REGULAR};
`;
