/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import Mssaem from "../../components/matching/Mssaem";
import WorryList from "../../components/matching/mapingMatching/WorryList";
import { useMainTheacher } from "../../hooks/main/useMainTeacher";

const MatchingPage = () => {
  const { mainTeacher } = useMainTheacher();

  return (
    <>
      <div css={headerCSS}>
        <div css={mbtiTitleCSS}>인기 M쌤</div>
        <div css={mssaemListCSS}>
          {mainTeacher &&
            mainTeacher.map((mssaem) => (
              <Mssaem mssaem={mssaem} key={mssaem.id} />
            ))}
        </div>
      </div>
      <WorryList pathMove={"waiting"} SaW={"M쌤 매칭을 기다리는 고민"} postId={-1}/>

      <WorryList pathMove={"solved"} SaW={"해결 완료된 고민"} postId={-1}/>
    </>
  );
};

export default MatchingPage;

const headerCSS = css`
  width: calc(100% + 30rem);
  margin-left: -15rem;
  background: ${COLOR.MAIN3};
  padding: 2rem 15rem;
`;

const mssaemListCSS = css`
  display: flex;
`;

const mbtiTitleCSS = css`
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
  color: ${COLOR.MAIN2};
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${COLOR.MAIN};
`;
