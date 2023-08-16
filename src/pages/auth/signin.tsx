/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import Checkbox from "../../components/checkbox/checkbox";
import SelectAllCheckbox from "../../components/checkbox/SelectAllcheckbox";
import FONT from "../../styles/font";
import { css } from "@emotion/react";
import COLOR from "../../styles/color";
import { useNavigate } from "react-router-dom";
import CommunityPolicyText from "../../components/auth/CommunityPolicyText";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import PolicyPrivacyText from "../../components/auth/PrivacyPolicyText";
const agreementList = [
  {
    id: 1,
    vital: true,
    desc: "[필수] 이용 약관",
    content: CommunityPolicyText,
  },

  {
    id: 2,
    vital: true,
    desc: "[필수] 개인 정보 취급 방침",
    content: PolicyPrivacyText,
  },
  {
    id: 3,
    vital: true,
    desc: "[필수] 만 14세 이상 본인입니다",
    content: "",
  },
];
const SigninPage = () => {
  const [checkedItems, setCheckedItems] = useState(
    agreementList.map(() => false),
  );

  const areAllRequiredChecked = checkedItems
    .filter((item, index) => agreementList[index].vital)
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
    const updatedCheckedItems = agreementList.map(() => checked);

    setCheckedItems(updatedCheckedItems);
  };

  const handleNext = () => {
    if (areAllRequiredChecked) {
      navigate("/sign-up/member");
    }
  };
  return (
    <div css={sigininCSS}>
      <h1 css={titleCSS}>이용 약관 </h1>
      <form css={policyCSS}>
        {agreementList.map((item, index) => (
          <div css={checkboxCSS}>
            <Checkbox
              key={item.id}
              checked={checkedItems[index]}
              onChange={(checked) => handleCheckboxChange(index, checked)}
              desc={item.desc}
            >
              {item.id !== 3 ? (
                <ReactMarkdown
                  css={containerCSS}
                  children={item.content.toString()}
                />
              ) : null}
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
  font: unset;
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
  font: unset;
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
  border: 4px solid ${COLOR.GRAY5};
  border-radius: 1.2rem;
  padding: 1rem;
  overflow: scroll;
  height: 10rem;
`;
