/** @jsxImportSource @emotion/react */
import Text from "../../components/text/Text";
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import { useHotBoard } from "../../hooks/main/useHotBoard";

const MainPage = () => {
  const HotBoard = useHotBoard();
  console.log(HotBoard);

  const hotboardlist = [
    {
      id: 1,
      category: "지금의 게시글",
      title: "어제 강남 러쉬에서 만난 대문자 E 직원",
    },
    {
      id: 2,
      category: "지금의 게시글",
      title: "어제 강남 러쉬에서 만난 대문자 E 직원",
    },
    {
      id: 3,
      category: "지금의 게시글",
      title: "어제 강남 러쉬에서 만난 대문자 E 직원",
    },
  ];

  return (
    <>
      <div css={headerCSS}>hot</div>
      {hotboardlist.map}
      <div>
        <Text>HOT 게시글</Text>
        <Text>HOT 토론</Text>
      </div>
    </>
  );
};

export default MainPage;

const headerCSS = css`
  width: calc(100% + 30rem);
  margin-left: -15rem;
  background: ${COLOR.MAIN3};
  padding: 0 15rem;
`;
