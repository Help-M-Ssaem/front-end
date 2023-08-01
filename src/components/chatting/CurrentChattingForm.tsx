/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Input from "../input/Input";
import Button from "../button/Button";

const CurrentChattingForm = () => {
  const imageSrc =
    "https://cdn.icon-icons.com/icons2/2483/PNG/512/image_file_icon_149928.png";

  const handleChattingSubmit = () => {
    alert("전송");
  };
  return (
    <form css={submitButtonBoxCSS} onSubmit={handleChattingSubmit}>
      <Input css={inlineInputCSS} />
      <label css={labelContainerCSS}>
        <img
          src={imageSrc}
          alt="사진 추가"
          style={{ marginRight: "0.5rem", width: "20px", height: "20px" }}
        />
        <input
          type="file"
          name="photo"
          id="photo"
          accept="image/*"
          style={{ display: "none" }}
        />
      </label>
      <Button style={{ marginLeft: "0.5rem", width: "5rem" }}>등록</Button>
    </form>
  );
};

export default CurrentChattingForm;

const submitButtonBoxCSS = css`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const inlineInputCSS = css`
  position: relative;
`;
const labelContainerCSS = css`
  display: flex;
  cursor: pointer;
  position: absolute;
  right: 1rem;
  align-items: center;
`;
