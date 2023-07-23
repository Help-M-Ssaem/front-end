/** @jsxImportSource @emotion/react */
import Container from "../../components/container/Container";
import HotBoardComponent from "../../components/main/HotBoard";
import { useHotBoardMore } from "../../hooks/main/useHotBoardMore";
import Text from "../../components/text/Text";
import { css } from "@emotion/react";
import COLOR from "../../styles/color";

const HotBoardPage = () => {
  const { hotBoardMore } = useHotBoardMore(1, 6);

  return (
    <>
      <Text>HOT 게시글</Text>
      <Container>
        {hotBoardMore &&
          Array.isArray(hotBoardMore.result) &&
          hotBoardMore.result.map((hotBoard) => (
            <HotBoardComponent
              hotBoard={hotBoard}
              key={hotBoard.id}
              addCSS={hotBoardCSS}
            />
          ))}
      </Container>
    </>
  );
};

export default HotBoardPage;

const hotBoardCSS = css`
  width: 100%;
  border-radius: 0;
  border-top: 1px solid ${COLOR.MAIN};
  margin-bottom: 0;
`;
