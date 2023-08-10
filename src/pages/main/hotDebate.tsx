/** @jsxImportSource @emotion/react */
import Text from "../../components/text/Text";
import PageDebate from "../../components/debate/pageMapingDebate/PageDebate";
import { css } from "@emotion/react";

const HotDebatePage = () => {
  return (
    <>
      <Text addCSS={textCSS}>HOT 토론글</Text>
      <PageDebate pathMov={"hotDiscusstion"} />
    </>
  );
};

const textCSS = css`
  margin: 1rem 0;
`;

export default HotDebatePage;
