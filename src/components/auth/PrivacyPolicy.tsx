/** @jsxImportSource @emotion/react */
import ReactMarkdown from "react-markdown";
import { css, Global } from "@emotion/react";
import remarkGfm from "remark-gfm";
import PolicyList from "./CommunityPolicyText";
import Container from "../container/Container";
import FONT from "../../styles/font";
import font from "../../styles/font";
import PolicyPrivacy from "./PrivacyPolicyText";
import CommunityPolicy from "./CommunityPolicyText";
const privacyPolicy = () => {
  return (
    <div css={communityCss} className="policy">
      <Container>
        <h1 css={titleCSS}>개인 정보 취급 방침</h1>
        {PolicyList[1]}
        <ReactMarkdown children={CommunityPolicy[1]} />
      </Container>
    </div>
  );
};
export default privacyPolicy;
const communityCss = css`
  margin: auto 0;
  padding: 2rem;
`;
const titleCSS = css`
  text-align: center;
  font-size: ${FONT.SIZE.BIGTITLE};
  font-bold: ${FONT.WEIGHT.BOLD};
  padding-top: 1.5rem;
  padding-bottom: 2rem;
`;
