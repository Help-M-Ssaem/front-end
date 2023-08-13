/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { EmptyStarIcon, YelloFilledStarIcon } from "../../assets/CommonIcons";
import { useRecoilState } from "recoil";
import { mbtiState } from "../../states/board";
import { useCategoryBookmarkUpdate } from "../../hooks/board/category/useCategoryBookmarkUpdate";

interface FavoritesProps {
  mbti: string;
  bookmark: boolean;
}


const FavoritesComponent = ({ mbti, bookmark }: FavoritesProps) => {
  const navigate = useNavigate();
  const [filled, setFilled] = useState(false);
  const [mbtiSelected, setMbtiSelected] = useRecoilState(mbtiState);
  const categoryBookmarkMutation = useCategoryBookmarkUpdate(mbti);

  const handleStarClick = () => {
    setFilled(!filled);
    categoryBookmarkMutation.mutate();
  };
  
  const handleMbtiClick = (mbti: string) => {
    navigate("/board/mbti");
    setMbtiSelected(mbti);
    // return setMbtiSelected(mbti);
  };

  return (
    <>
    { bookmark &&
    <div css={boardBoxCSS}>
      <div css ={haderCSS}
       onClick={() => handleMbtiClick(mbti)}>
        <div css={titleCSS}
          // onClick={() => handleMbtiClick(mbti)}
        >
          {mbti}게시판
        </div>
        <div css={readDetailCSS}>
          <div css={marginRightCSS}>
          {bookmark ? (
            <YelloFilledStarIcon onClick={handleStarClick} />
            ) : (
            <EmptyStarIcon onClick={handleStarClick} />
          )}
      </div>
        </div>
      </div>
    </div>
    }
    </>
  );
};

const boardBoxCSS = css`
  display: flex;
  border-radius: 1.2rem;
  border: 1px solid ${COLOR.MAIN};
  flex-direction: column;
  margin-top: 0.4rem;
  background: ${COLOR.WHITE};
  box-shadow: 0.1rem 0.3rem 0.1rem rgba(0, 0, 0, 0.1);
`;

const haderCSS = css`
  justify-content: space-between;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 1rem;
`;

const titleCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  width: 100%;
  height: 100%;
`;

const marginRightCSS = css`
  margin-right: 1rem;
`;

const readDetailCSS = css`
  display: flex;
`;

export default FavoritesComponent;
