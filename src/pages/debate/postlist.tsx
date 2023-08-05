/** @jsxImportSource @emotion/react */
import DebateComponent from "../../components/debate/debate";
import { css } from "@emotion/react";
import { useNavigate } from "react-router";
import FONT from "../../styles/font";
import Container from "../../components/container/Container";
import { Debate } from "../../interfaces/debate";
import { useDebateList } from "../../hooks/debate/useDebateList";
import COLOR from "../../styles/color";

const PostListDebatePage = () => {
  const navigate = useNavigate();
  const { debateList } = useDebateList(0, 6);
  return (
    <Container addCSS={containerCSS}>
      <div css={headerCSS}>
        <div css={titleBoxCSS}>MBTI 과몰입 토론</div>
      </div>

      <div>
        {debateList &&
          debateList.result.map((debate: Debate, index) => (
            <DebateComponent
              debate={debate}
              key={debate.id}
              onClick={() => navigate(`/debate/${debate.id}`)}
              index={index}
            />
          ))}
      </div>
    </Container>
  );
};

export default PostListDebatePage;

const containerCSS = css`
  background: ${COLOR.WHITE};
`;

const headerCSS = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% + 30rem);
  margin-left: -15rem;
  padding: 0 15rem;
  margin-bottom: 1rem;
`;

const titleBoxCSS = css`
  align-items: center;
  margin: 1rem 0;
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.BOLD};
`;
