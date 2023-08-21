/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Container from "../../components/container/Container";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import { useCategoryBookmark } from "../../hooks/board/category/useCategoryBookmark";
import FavoritesComponent from "../../components/alarm/Favorites";
import { CatLogoIcon } from "../../assets/CommonIcons";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { mbtiState } from "../../states/board";

const mbtiList = [
  "ISTJ",
  "ISFJ",
  "INFJ",
  "INTJ",
  "ISTP",
  "ISFP",
  "INFP",
  "INTP",
  "ESTP",
  "ESFP",
  "ENFP",
  "ENTP",
  "ESTJ",
  "ESFJ",
  "ENFJ",
  "ENTJ",
];
const  FavoritesMenu = () => {
  const navigate = useNavigate();
  const [mbtiSelected, setMbtiSelected] = useRecoilState(mbtiState);
  const { categoryBookmark } = useCategoryBookmark();
  let markedCount = 0;
  const handleMbtiClick = () => {
    navigate("/board/mbti");
    setMbtiSelected("전체");
  };
  return (
   <Container addCSS={containerCSS}>
    <div css={AlarmHeaderBoxCSS}>
      <div>나의 즐겨찾기</div>
    </div>
    <div>
      <div css={scrollContainerCSS}>
        
      {mbtiList.map((mbti, index) => {
        let isBookmarked = false;
          if (categoryBookmark && Array.isArray(categoryBookmark)) {
            for (const bookmark of categoryBookmark) {
              if (bookmark.mbti[0] === mbti) {
                isBookmarked = true;
                markedCount +=1;
                break;
                }
              }
            }
          return <FavoritesComponent key={index} mbti={mbti} bookmark={isBookmarked} />;
      })}
      {markedCount === 0 && (
      <div css={noChatCSS}>
        <CatLogoIcon />
        <div css={bottomFontSIZE} onClick={handleMbtiClick}>즐겨찾기 등록하러 가기</div>
      </div>
    )}
      </div>
    </div>
   </Container>
  );
};

export default FavoritesMenu;

const containerCSS = css`
  box-shadow: 0rem 0.3rem 0.4rem rgba(0, 0, 0, 0.2);
`;

const AlarmHeaderBoxCSS = css`
  display: flex;
  justify-content: space-between;
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  color: ${COLOR.GRAY2};
  padding-bottom: 1rem;
  border-bottom: 1px solid ${COLOR.MAIN};
`;

const scrollContainerCSS = css`
  max-height: 25rem;
  overflow-y: auto;
  padding-right: 0.7rem;
  padding-bottom: 1rem;

  ::-webkit-scrollbar {
    width: 0.5rem;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${COLOR.GRAY3};
    border-radius: 1.2rem;
  }
`;
const noChatCSS = css`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const bottomFontSIZE = css`
  padding-bottom: 0.5rem;
  font-size: ${FONT.SIZE.HEADLINE};
  color: ${COLOR.GRAY2};
  cursor: pointer;
`;

