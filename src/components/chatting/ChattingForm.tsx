/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PhotoIcon } from "../../assets/ChattingIcons";
import Button from "../button/Button";
import Input from "../input/Input";
import { useRecoilState } from "recoil";
import { inputMessageState } from "../../states/chatting";

export const ChattingForm = () => {
  const [inputMessage, setInputMessage] = useRecoilState(inputMessageState);

  const handleChattingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div css={dateBottom}>
      <form css={submitButtonBoxCSS} onSubmit={handleChattingSubmit}>
        <div css={inlineInputCSS}>
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
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
    </div>
  );
};

const dateBottom = css`
  display: flex;
  width: 100%;
  height: 4rem;
  padding: 0.8rem 2rem 0.8rem 2rem;
`;

const buttonCSS = css`
  margin-left: 0.5rem;
  width: 5rem;
  height: 100%;
  white-space: nowrap;
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
  height: 100%;
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
