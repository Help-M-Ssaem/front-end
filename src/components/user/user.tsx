/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from "react";
import { css } from "@emotion/react";
import { useForm } from "react-hook-form";
import FONT from "../../styles/font";
import COLOR from "../../styles/color";
import { PolygonIcon } from "../../assets/CommonIcons";

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

  return (
    <div css={userinfoCSS}>
      <form css={formCSS}>
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

const formCSS = css`
  padding-top: 3rem;
  width: 100%;
  max-width: 30rem;
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
