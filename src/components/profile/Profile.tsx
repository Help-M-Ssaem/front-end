/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Badge from "../badge/Badge";
import FONT from "../../styles/font";
import COLOR from "../../styles/color";
import { useNavigate } from "react-router";
import useMemberInfo from "../../hooks/user/useMemberInfo";

interface profileProps {
  id: number;
  image: string;
  name: string;
  mbti: string;
  badge: string;
  createdAt?: string;
}

const Profile = ({ id, image, name, mbti, badge, createdAt }: profileProps) => {
  const navigate = useNavigate();
  const { user } = useMemberInfo();

  const handleProfileClick = () => {
    if (user && user.id === id) {
      navigate(`/profile/myprofile`);
    } else {
      navigate(`/profile/user/${id}`);
    }
  };

  return (
    <div css={profileBoxCSS} onClick={handleProfileClick}>
      <img css={profileImgCSS} src={image} alt="profile" />
      <div css={profileCSS}>
        <div css={detailCSS}>
          <div css={nameCSS}>{name} 님</div>
          <div css={createdAtCSS}>{createdAt}</div>
        </div>
        <div css={profileDetailCSS}>
          <Badge mbti={mbti} color={"#F8CAFF"} />
          {badge && <Badge mbti={badge} color={"#5BE1A9"} />}
        </div>
      </div>
    </div>
  );
};

export default Profile;

const profileBoxCSS = css`
  display: flex;
  align-items: center;
  cursor: pointer;
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

const detailCSS = css`
  display: flex;
  align-items: center;
`;

const nameCSS = css`
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.SEMIBOLD};
  margin-bottom: 0.4rem;
  margin-right: 0.4rem;
`;

const createdAtCSS = css`
  font-size: ${FONT.SIZE.FOOTNOTE};
  color: ${COLOR.GRAY2};
  margin-bottom: 0.1rem;
`;
