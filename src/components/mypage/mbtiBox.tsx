/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from "react";
import { css } from "@emotion/react";
import { useForm } from "react-hook-form";
import FONT from "../../styles/font";
import COLOR from "../../styles/color";
import { PolygonIcon } from "../../assets/CommonIcons";
import { useNavigate } from "react-router-dom";

const MbtiBox = () => {
  const [invalidInput, setInvalidInput] = useState<string | null>(null);
  const [mbti, setMbti] = useState<string>("");
  const [mbtinum, setMbtinum] = useState<string>("");

  // TODO: InFoInputs 타입 오류 처리
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const mbtiInputs = [
    { name: "mbti_1", values: ["i", "I", "e", "E"] },
    { name: "mbti_2", values: ["s", "S", "n", "N"] },
    { name: "mbti_3", values: ["f", "F", "t", "T"] },
    { name: "mbti_4", values: ["p", "P", "j", "J"] },
  ];

  // 나중에 API 한 번에 쏠수도 있으니 일단
  // TODO: InFoInputs 타입 오류 처리
  const [values, setValues] = useState<any>({
    nickName: "",
    mbtiInputs: {
      mbti_1: mbtiInputs[0].values[3],
      mbti_2: mbtiInputs[1].values[3],
      mbti_3: mbtiInputs[2].values[3],
      mbti_4: mbtiInputs[3].values[3],
    },
  });

  useEffect(() => {
    const mbtiValue = getMBTI();
    const mbtiNum = MBTItoNumbers(mbtiValue);
    const mbtiUpperValue = mbtiValue.toUpperCase();

    setMbti(mbtiUpperValue);
    setMbtinum(mbtiNum);
  }, [mbti, mbtinum]);

  const getMBTI = () => {
    const { mbtiInputs } = values;
    const selectedMBTI = Object.keys(mbtiInputs)
      .map((key) => mbtiInputs[key])
      .join("");

    return selectedMBTI;
  };

  const MBTItoNumbers = (mbtiString: string) => {
    const convertedString = mbtiString
      .split("")
      .map((char) => (char.toUpperCase() === char ? "1" : "0"))
      .join("");

    return convertedString;
  };

  const handlePolygonClick = (name: string) => {
    const mbtiKey = name;
    const inputValue = values.mbtiInputs[mbtiKey];
    const valuesArray = mbtiInputs.find(
      (mbti) => mbti.name === mbtiKey,
    )?.values;
    if (!valuesArray) return;
    const currentIndex = valuesArray.indexOf(inputValue);
    const updatedValue = valuesArray[(currentIndex + 1) % valuesArray.length];

    if (!valuesArray.includes(updatedValue)) {
      setInvalidInput(updatedValue);
    } else {
      setInvalidInput(null);
    }

    setValues((prevValues: any) => ({
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

    setValues((prevValues: any) => ({
      ...prevValues,
      mbtiInputs: {
        ...prevValues.mbtiInputs,
        [name]: inputValue,
      },
    }));
  };

  return (
    <div css={userinfoCSS}>
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
            <div css={arrowContainerCSS}>
              <PolygonIcon
                width={"9"}
                height={"70"}
                onClick={() => handlePolygonClick(mbti.name)}
              />
            </div>
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
    </div>
  );
};
export default MbtiBox;

const userinfoCSS = css`
  display: flex;
  justify-content: center;
  max-width: 100rem;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

const mbtiCSS = css`
  border: 0.1rem solid ${COLOR.GRAY4};
  font-size: ${FONT.SIZE.TITLE3};
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  text-align: center;
`;
const mbtiBox = css`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  text_align: center;
  margin-right: 1rem;
`;

const mbtiContainerCSS = css`
  display: flex;
  align-items: center;
  position: relative;
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
const arrowContainerCSS = css`
  position: absolute;
  left: 70%;
  transform: translateX(-50%);
  top: 33%;
  transform: translateY(-50%);
  padding-right: 0.4rem;
  padding-left: 0.4rem;
`;
