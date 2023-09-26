/** @jsxImportSource @emotion/react */
import ReactMarkdown from "react-markdown";
import { css } from "@emotion/react";
import PolicyList from "./CommunityPolicyText";
import Container from "../container/Container";
import FONT from "../../styles/font";
import CommunityPolicy from "./CommunityPolicyText";

const communityPolicy = () => {
  return (
    <div css={communityCSS} className="policy">
      <Container>
        <h1 css={titleCSS}>커뮤니티 이용 약관</h1>
        <ReactMarkdown css={contentCSS} children={CommunityPolicy} />
      </Container>
    </div>
  );
};
export default communityPolicy;

const communityCSS = css`
  padding-top: 8rem;
  @media screen and (max-width: 768px) {
    padding: 8rem 1rem 0 1rem;
  }
`;

const contentCSS = css`
  margin: unset;
  padding: unset;
  border: unset;
  font-size: unset;
  font: unset;
  vertical-align: unset;
`;
const titleCSS = css`
  text-align: center;
  font-size: ${FONT.SIZE.BIGTITLE};
  font-weight: ${FONT.WEIGHT.BOLD};
  padding-top: 1.5rem;
  padding-bottom: 2rem;
`;
