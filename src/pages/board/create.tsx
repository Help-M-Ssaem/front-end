/** @jsxImportSource @emotion/react */
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { css } from "@emotion/react";
import COLOR from "../../styles/color";

const CreateBoardPage = () => {
  return (
    <div css={EditorContainer}>
      <Editor
        initialValue="hello react editor world!"
        previewStyle="vertical"
        height="30rem"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
      />
    </div>
  );
};

export default CreateBoardPage;

const EditorContainer = css`
  width: calc(100% + 30rem);
  margin-left: -15rem;
  background: ${COLOR.MAIN3};
  padding: 1.5rem 15rem;
`;
