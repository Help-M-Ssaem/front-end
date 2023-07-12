/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Outlet, useNavigate } from "react-router";
import COLOR from "../../styles/color";
import { useRecoilState } from "recoil";
import { boardNavbarState } from "../../states/navbar";
import { FilledStarIcon } from "../../constants/CommonIcons";
import FONT from "../../styles/font";
import Mbti from "../../components/mbti/Mbti";

const BoardPage = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useRecoilState(boardNavbarState);

  const mbtiList = [
    ["ISTJ", false],
    ["ISFJ", false],
    ["INFJ", false],
    ["INTJ", false],
    ["ISTP", false],
    ["ISFP", false],
    ["INFP", false],
    ["INTP", false],
    ["ESTP", false],
    ["ESFP", false],
    ["ENFP", false],
    ["ENTP", false],
    ["ESTJ", false],
    ["ESFJ", false],
    ["ENFJ", false],
    ["ENTJ", false],
  ];

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
        <div css={mbtiContainerCSS}>
          {mbtiList.map((mbti) => (
            <Mbti mbti={mbti} />
          ))}
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

  position: relative;
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  color: ${COLOR.GRAY2};

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
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  margin-right: 0.5rem;
`;

const mbtiContainerCSS = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  padding: 2rem;
`;
