/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from "react";
import { css } from "@emotion/react";
import { useForm } from "react-hook-form";
import FONT from "../../styles/font";
import COLOR from "../../styles/color";
import { PolygonIcon } from "../../assets/CommonIcons";
import { useNickName } from "../../hooks/user/userNickname";
import { usePostUserInfo } from "../../hooks/user/signup";
import { useNavigate } from "react-router-dom";

const NameBox = ({
  name,
  onChange,
}: {
  name: string | undefined;
  onChange: (newNickName: string) => void;
}) => {
  const [invalidInput, setInvalidInput] = useState<string | null>(null);
  const [nickName, setnickName] = useState("");
  const [result, setResult] = useState<boolean | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const checkNickNameMutation = useNickName();

  const checkDuplicateNickName = async (nickName: string) => {
    try {
      const result = await (
        await checkNickNameMutation.mutateAsync(nickName)
      ).used;
      setResult(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue.trim() === "") {
      setResult(null);
    } else {
      setnickName(inputValue);
      checkDuplicateNickName(inputValue);
      onChange(inputValue);
    }
  };

  return (
    <div css={userinfoCSS}>
      <div css={nickNameCSS({ result })}>
        <input
          placeholder={name}
          ref={inputRef}
          onChange={handleNickNameChange}
        />

        <div css={NickNameContainer}>
          {result !== null && (
            <div css={NickNameMsg}>
              <p className={`msg ${result ? "error" : "success"}`}>
                {result
                  ? "이미 사용 중인 닉네임입니다."
                  : "사용 가능한 닉네임입니다."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NameBox;
const userinfoCSS = css`
  justify-content: center;
  max-width: 100rem;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const nickNameCSS = (props: { result: boolean | null }) => css`
  input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    border-radius: 0.5rem;
    border: 0.1rem solid
      ${props.result === true
        ? "red"
        : props.result === false
        ? "green"
        : props.result === null
        ? "#D4D3D3"
        : "#D4D3D3"};
    padding: 0.7rem 1rem;
    font-size: ${FONT.SIZE.TITLE3};
    margin-top: 1rem;
    text-align: left;
  }
`;

const NickNameContainer = css`
  position: relative;
  //   height: 0.5rem;
`;

const NickNameMsg = css`
  position: absolute;
  width: 100%;
  height: 100%;
  left:0.5rem;
  font-size: ${FONT.SIZE.FOOTNOTE};
  font-weight : ${FONT.WEIGHT.MEDIUM}
  display: flex;

  .success {
    color: green;
  }
  .error {
    color: red;
  }
`;
