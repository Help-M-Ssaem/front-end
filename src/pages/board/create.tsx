/** @jsxImportSource @emotion/react */
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import Container from "../../components/container/Container";
import { useRecoilValue } from "recoil";
import { mbtiState } from "../../states/board";
import { useState } from "react";
import FONT from "../../styles/font";

const CreateBoardPage = () => {
  const mbti = useRecoilValue(mbtiState);
  const [title, setTitle] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div css={editorContainerCSS}>
      <Container background="#FFFFFF" style={{ padding: "2.5rem" }}>
        <div css={titleCSS}>{mbti} 게시판</div>
        <div css={contentCSS}>제목을 입력해주세요.</div>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          css={inputCSS}
        />
        <div css={contentCSS}>내용을 입력해주세요.</div>
        <Editor
          initialValue="hello react editor world!"
          previewStyle="vertical"
          height="30rem"
          initialEditType="wysiwyg"
          useCommandShortcut={true}
        />
      </Container>
    </div>
  );
};

export default CreateBoardPage;

const editorContainerCSS = css`
  width: calc(100% + 30rem);
  margin-left: -15rem;
  background: ${COLOR.MAIN3};
  padding: 1.5rem 15rem;
`;

const titleCSS = css`
  font-size: ${FONT.SIZE.TITLE1};
  font-weight: ${FONT.WEIGHT.BOLD};
  color: ${COLOR.MAINDARK};
  margin-bottom: 1rem;
`;

const contentCSS = css`
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  color: ${COLOR.GRAY2};
  margin-bottom: 0.5rem;
`;

const inputCSS = css`
  width: 100%;
  height: 2.5rem;
  border: 1.5px solid ${COLOR.GRAY4};
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;
