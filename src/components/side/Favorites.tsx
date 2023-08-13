/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Container from "../../components/container/Container";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import { useCategoryBookmark } from "../../hooks/board/category/useCategoryBookmark";
import FavoritesComponent from "../../components/alarm/Favorites";

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
  const { categoryBookmark } = useCategoryBookmark();
  return (
   <Container>
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
                    break;
                  }
                }
              }
              return <FavoritesComponent key={index} mbti={mbti} bookmark={isBookmarked} />;
            })}
      </div>
    </div>
   </Container>
  );
};

export default FavoritesMenu;


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


