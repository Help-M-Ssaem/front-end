/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Input from "../input/Input";
import Button from "../button/Button";
import { PhotoIcon } from "../../assets/ChattingIcons";

const CurrentChattingForm = () => {
  const handleChattingSubmit = () => {
    alert("전송");
  };
  return (
    <form css={submitButtonBoxCSS} onSubmit={handleChattingSubmit}>
      <div css={inlineInputCSS}>
        <Input />
        <label css={labelContainerCSS}>
          <PhotoIcon />
          <input
            type="file"
            name="photo"
            id="photo"
            accept="image/*"
            css={fileInputCSS}
          />
        </label>
      </div>
      <Button addCSS={buttonCSS}>등록</Button>
    </form>
  );
};

export default CurrentChattingForm;

const buttonCSS = css`
  margin-left: 0.5rem;
  width: 5rem;
`;

const submitButtonBoxCSS = css`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const inlineInputCSS = css`
  display: flex;
  width: 100%;
  position: relative;
`;

const labelContainerCSS = css`
  display: flex;
  cursor: pointer;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 1rem;
  align-items: center;
`;

const fileInputCSS = css`
  display: none;
`;
