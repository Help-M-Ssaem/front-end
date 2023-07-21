/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from "react";
import { css } from "@emotion/react";
import { useForm } from "react-hook-form";
import FONT from "../../styles/font";
import COLOR from "../../styles/color";
import { PolygonIcon } from "../../assets/CommonIcons";
import { useNickName } from "../../hooks/user/userInfo";
import { useNavigate } from "react-router-dom";

interface InFoInputs {
  nickName: string;
  mbtiInputs: {
    [mbtiKey: string]: string;
  };
}

const UserInfo = () => {
  const [mouseClicked, setMouseClicked] = useState(false);
  const [invalidInput, setInvalidInput] = useState<string | null>(null);
  const [nickName, setnickName] = useState("");
  const [result, setResult] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InFoInputs>();

  const mbtiInputs = [
    { name: "mbti_1", values: ["i", "I", "e", "E"] },
    { name: "mbti_2", values: ["s", "S", "n", "N"] },
    { name: "mbti_3", values: ["f", "F", "t", "T"] },
    { name: "mbti_4", values: ["p", "P", "j", "J"] },
  ];

  // 나중에 API 한 번에 쏠수도 있으니 일단
  const [values, setValues] = useState<InFoInputs>({
    nickName: "",
    mbtiInputs: {
      mbti_1: mbtiInputs[0].values[3],
      mbti_2: mbtiInputs[1].values[3],
      mbti_3: mbtiInputs[2].values[3],
      mbti_4: mbtiInputs[3].values[3],
    },
  });

  const handlePolygonClick = (name: string) => {
    const mbtiKey = name;
    const inputValue = values.mbtiInputs[mbtiKey];
    const valuesArray = mbtiInputs.find(
      (mbti) => mbti.name === mbtiKey,
    )?.values;
    console.log(valuesArray);
    if (!valuesArray) return;
    const currentIndex = valuesArray.indexOf(inputValue);
    const updatedValue = valuesArray[(currentIndex + 1) % valuesArray.length];

    if (!valuesArray.includes(updatedValue)) {
      setInvalidInput(updatedValue);
    } else {
      setInvalidInput(null);
    }

    setValues((prevValues) => ({
      ...prevValues,
      mbtiInputs: {
        ...prevValues.mbtiInputs,
        [mbtiKey]: updatedValue,
      },
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string,
  ) => {
    const inputValue = e.target.value;
    const valuesArray = mbtiInputs.find((mbti) => mbti.name === name)?.values;
    if (!valuesArray) return;

    if (!valuesArray.includes(inputValue)) {
      setInvalidInput(inputValue);
    } else {
      setInvalidInput(null);
    }

    setValues((prevValues) => ({
      ...prevValues,
      mbtiInputs: {
        ...prevValues.mbtiInputs,
        [name]: inputValue,
      },
    }));
  };

  //닉네임부분

  const inputRef = useRef<HTMLInputElement | null>(null);
  const checkNickNameMutation = useNickName();

  useEffect(() => {
    console.log("nickName:", nickName);
  }, [nickName]);

  const checkDuplicateNickName = async (nickName: string) => {
    try {
      const result = await (
        await checkNickNameMutation.mutateAsync(nickName)
      ).used;
      console.log(result);
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
    }
  };

  return (
    <div css={userinfoCSS}>
      <h1 css={titleCSS}>유저 정보 입력</h1>
      <form css={formCSS}>
        <div
          onClick={() => setMouseClicked(true)}
          css={nickNameCSS({ result })}
        >
          <label css={labelCSS} id="nickBox">
            M쌤에서 사용할 닉네임을 입력해주세요.
            <input
              {...register("nickName")}
              placeholder="닉네임"
              ref={inputRef}
              onChange={handleNickNameChange}
            />
          </label>
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

        <label css={labelCSS}>당신의 MBTI는 무엇인가요?</label>
        <div css={mbtiBox}>
          {mbtiInputs.map((mbti, index) => (
            <div key={mbti.name} css={mbtiContainerCSS}>
              <input
                type="text"
                css={mbtiCSS}
                {...register(`mbtiInputs.${mbti.name}`)}
                value={values.mbtiInputs[mbti.name]}
                onChange={(e) => handleInputChange(e, mbti.name)}
              />
              <PolygonIcon onClick={() => handlePolygonClick(mbti.name)} />
            </div>
          ))}
        </div>
        {invalidInput &&
          (!mbtiInputs[0].values.includes(invalidInput) ||
            !mbtiInputs[1].values.includes(invalidInput) ||
            !mbtiInputs[2].values.includes(invalidInput) ||
            !mbtiInputs[3].values.includes(invalidInput)) && (
            <div css={warningContainerCSS}>
              <p css={warningMessageCSS}>
                "{invalidInput}"은(는) 유효한 MBTI 요소가 아닙니다.
              </p>
            </div>
          )}
        <input
          type="submit"
          value="회원가입"
          css={buttonCSS}
          onClick={() => navigate("/")}
        />
      </form>
    </div>
  );
};
export default UserInfo;

const userinfoCSS = css`
  display: flex;
  justify-content: center;
  max-width: 100rem;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
`;
const titleCSS = css`
  font-size: ${FONT.SIZE.TITLE1};
  font-weight: ${FONT.WEIGHT.BOLD};
  margin-right: 0.5rem;
  padding-top: 2rem;
`;

const formCSS = css`
  padding-top: 3rem;
  width: 100%;
  max-width: 30rem;
`;
const nickNameCSS = (props: any) => css`
  margin-bottom: 2rem;

  input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    border-radius: 1rem;
    border: 0.2rem solid ${props.result === true ? "red" : COLOR.GRAY4};
    padding: 0.7rem 1rem;
    font-size: ${FONT.SIZE.TITLE3};
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    text-align: left;
  }
`;

const NickNameContainer = css`
  position: relative;
  height: 1.5rem;
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
const labelCSS = css`
  color: ${COLOR.GRAY2};
`;

const mbtiCSS = css`
  border: 0.2rem solid ${COLOR.GRAY4};
  padding: 0.7rem 1rem;
  font-size: ${FONT.SIZE.TITLE1};
  width: 3.5rem;
  height: 3.7rem;
  border-radius: 0.8rem;
  margin-top: 1rem;
  text-align: center;
`;
const mbtiBox = css`
  display: flex;
  gap: 3rem;
  align-items: center;

  text_align: center;
`;

const buttonCSS = css`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 3rem;
  color: ${COLOR.WHITE};
  background: #a7a7a7;

  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.REGULAR};

  border-radius: 0.8rem;
  border: 0.1rem solid;

  :hover {
    background-color: ${COLOR.GRAY1};
    transition: 0.7s;
    cursor: pointer;
  }
`;

const mbtiContainerCSS = css`
  align-items: center;
  position: relative;
  align-items: center;
  text_align: center;
`;

const warningMessageCSS = css`
  padding-top: 1rem;
  color: red;
`;

const warningContainerCSS = css`
  margin-bottom: 1rem;
  position: absolute;
`;
