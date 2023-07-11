/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Outlet, useNavigate } from "react-router";
import COLOR from "../../styles/color";
import { useRecoilState } from "recoil";
import { boardNavbarState } from "../../states/navbar";
import { FilledStarIcon } from "../../constants/CommonIcons";

const BoardPage = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useRecoilState(boardNavbarState);

  const handleItemClick = (path: string) => {
    setSelectedItem(path);
    navigate(path);
  };

  return (
    <>
      <div css={headerCSS}>
        <div css={buttonBoxCSS}>
          <div
            css={buttonCSS}
            onClick={() => handleItemClick("mbti")}
            className={selectedItem === "mbti" ? "active" : ""}
          >
            MBTI 별 게시판
          </div>
          <div
            css={buttonCSS}
            onClick={() => handleItemClick("free")}
            className={selectedItem === "free" ? "active" : ""}
          >
            자유 게시판
          </div>
        </div>
      </div>
      <div css={titleBoxCSS}>
        <div css={titleCSS}>전체 게시판</div>
        <FilledStarIcon />
      </div>
      <Outlet />
    </>
  );
};

export default BoardPage;

const headerCSS = css`
  width: calc(100% + 30rem);
  margin-left: -15rem;
  background: ${COLOR.MAIN3};
  padding: 1.7rem 15rem;
`;

const buttonBoxCSS = css`
  display: flex;
  border-bottom: 1px solid ${COLOR.MAIN};
`;

const buttonCSS = css`
  width: 100%;
  text-align: center;
  padding-bottom: 1.7rem;
  font-weight: bold;
  color: ${COLOR.GRAY2};
  position: relative;

  &:hover,
  &.active {
    cursor: pointer;
    color: ${COLOR.MAIN2};
    border-bottom: 3px solid ${COLOR.MAIN};
  }
`;

const titleBoxCSS = css`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`;

const titleCSS = css`
  font-size: 0.9rem;
  font-weight: bold;
  margin-right: 0.5rem;
`;
