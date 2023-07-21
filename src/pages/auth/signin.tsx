/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import Checkbox from "../../components/checkbox/checkbox";
import SelectAllCheckbox from "../../components/checkbox/SelectAllcheckbox";
import FONT from "../../styles/font";
import { css } from "@emotion/react";
import Container from "../../components/container/Container";
import Button from "../../components/button/Button";
import COLOR from "../../styles/color";
import { useNavigate } from "react-router-dom";
const dummyData = [
  {
    id: 1,
    vital: true,
    desc: "[필수] 이용 약관",
    content:
      "이용약관1.회원 가입 시 이름, 생년월일, 휴대전화번호 등의 정보를 허위로 기재해서는 안 됩니다. \
     회원 계정에 등록된 정보는 항상 정확한 최신 정보가 유지될 수 있도록 관리해 주세요. \
     자신의 계정을 다른 사람에게 판매, 양도, 대여 또는 담보로 제공하거나 다른 사람에게 그 사용을 허락해서는 안 됩니다.\
     아울러 자신의 계정이 아닌 타인의 계정을 무단으로 사용해서는 안 됩니다. 이에 관한 상세한 내용은 계정 운영 정책을 참고해 주시기 바랍니다.",
  },
  {
    id: 2,
    vital: false,
    desc: "[선택] 이용 약관",
    content:
      "이용약관2,회원 가입 시 이름, 생년월일, 휴대전화번호 등의 정보를 허위로 기재해서는 안 됩니다. \
    회원 계정에 등록된 정보는 항상 정확한 최신 정보가 유지될 수 있도록 관리해 주세요. \
    자신의 계정을 다른 사람에게 판매, 양도, 대여 또는 담보로 제공하거나 다른 사람에게 그 사용을 허락해서는 안 됩니다.\
    아울러 자신의 계정이 아닌 타인의 계정을 무단으로 사용해서는 안 됩니다. 이에 관한 상세한 내용은 계정 운영 정책을 참고해 주시기 바랍니다.",
  },
];

const SigninPage = () => {
  const [checkedItems, setCheckedItems] = useState(dummyData.map(() => false));

  const areAllRequiredChecked = checkedItems
    .filter((item, index) => dummyData[index].vital)
    .every((item) => item);

  const isSelectAllChecked = checkedItems.every((item) => item);

  const isAnyChecked = checkedItems.some((item) => item);

  const isButtonEnabled =
    areAllRequiredChecked || isSelectAllChecked || isAnyChecked;

  const navigate = useNavigate();

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = checked;

    setCheckedItems(updatedCheckedItems);
  };

  const handleSelectAllChange = (checked: boolean) => {
    const updatedCheckedItems = dummyData.map(() => checked);

    setCheckedItems(updatedCheckedItems);
  };

  const handleNext = () => {
    if (areAllRequiredChecked) {
      navigate("/main");
    }
  };
  return (
    <div css={sigininCSS}>
      <h1 css={titleCSS}>이용 약관 </h1>
      <form css={policyCSS}>
        {dummyData.map((item, index) => (
          <div css={checkboxCSS}>
            <Checkbox
              key={item.id}
              checked={checkedItems[index]}
              onChange={(checked) => handleCheckboxChange(index, checked)}
              desc={item.desc}
            >
              <div css={containerCSS}>{item.content}</div>
            </Checkbox>
          </div>
        ))}

        <SelectAllCheckbox
          checked={areAllRequiredChecked}
          onChange={handleSelectAllChange}
          disabled={false}
          checkboxes={checkedItems}
        />
        <div css={buttonContainer}>
          <button
            disabled={!areAllRequiredChecked}
            css={join}
            onClick={() => handleNext()}
          >
            다음
          </button>
        </div>
      </form>
    </div>
  );
};

export default SigninPage;

const sigininCSS = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  max-width: 100rem;
`;

const titleCSS = css`
  font-size: ${FONT.SIZE.TITLE1};
  font-weight: ${FONT.WEIGHT.BOLD};
  margin-right: 0.5rem;
  padding-top: 2rem;
`;

const checkboxCSS = css`
  display: flex;
  margin: 1rem;
  margin-bottom: 2rem;
  padding-top: 1rem;
  max-width: 30rem;
`;

const join = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 3rem;
  color: ${COLOR.WHITE};
  background: #a7a7a7;

  font-size: ${FONT.SIZE.BODY};
  font-weight: ${FONT.WEIGHT.BOLD};

  border-radius: 0.8rem;

  :hover {
    background-color: #ad71ea;
  }

  &:not(:disabled) {
    background-color: #ad71ea;
    cursor: pointer;
  }
`;

const buttonContainer = css`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;
const policyCSS = css`
  width: 30rem;
  }
`;

const containerCSS = css`
  // margin-top: 1rem;
  border: 4px solid ${COLOR.GRAY5};
  border-radius: 1.2rem;
  padding: 1rem;
`;
