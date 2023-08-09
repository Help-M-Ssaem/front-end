/** @jsxImportSource @emotion/react */
import React, { ChangeEvent, useState } from "react";
import { css } from "@emotion/react";
import FONT from "../../styles/font";
import COLOR from "../../styles/color";
import { CheckIcon as CustomCheckIcon } from "../../assets/CommonIcons";
import { color } from "framer-motion";

interface CheckboxProps {
  children: React.ReactNode;
  disabled?: boolean;
  checked: boolean;
  desc: string;
  onChange: (checked: boolean) => void;
}

const Checkbox = ({
  children,
  disabled = false,
  checked,
  desc,
  onChange,
}: CheckboxProps) => {
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    onChange(checked);
  };

  return (
    <label css={checkboxLabelStyles}>
      <input
        type="checkbox"
        id="check1"
        disabled={disabled}
        checked={checked}
        onChange={handleCheckboxChange}
      />

      <span className={`checkmark `}>
        <CustomCheckIcon className="custom-ico" checked={!checked} />
      </span>
      {desc}
      {children}
    </label>
  );
};

const checkboxLabelStyles = css`
  align-items: center;

  margin-bottom: 0.5rem;
  font-size: 16px;
  color: ${COLOR.GRAY2};
  cursor: pointer;
  input[type="checkbox"] {
    display: none;
  }

  .checkmark {
    display: inline-block;
    width: 25px;
    top: 0.2rem;
    // height: 30px;
    position: relative;
    margin-bottom: 0.5rem;
  }
`;

export default Checkbox;
