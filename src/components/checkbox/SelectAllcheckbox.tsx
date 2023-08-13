/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React, { ChangeEvent, Children, useState } from "react";
import Checkbox from "./checkbox";

interface SelectAllCheckboxProps {
  children?: React.ReactNode;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  checkboxes?: boolean[];
  setCheckboxes?: Array<React.Dispatch<React.SetStateAction<boolean>>>;
  checked?: boolean;
}

const SelectAllCheckbox = ({
  disabled = false,
  onChange,
  checkboxes,
  children,
  setCheckboxes,
}: SelectAllCheckboxProps) => {
  const handleSelectAllChange = (isChecked: boolean) => {
    if (setCheckboxes) {
      setCheckboxes.forEach((setCheckbox) => setCheckbox(isChecked));
    }
    if (onChange) {
      onChange(isChecked);
    }
  };

  const handleCheckboxChange = (index: number, isChecked: boolean) => {
    if (checkboxes && setCheckboxes) {
      const updatedCheckboxes = [...checkboxes];
      updatedCheckboxes[index] = isChecked;
      setCheckboxes[index](isChecked);
      const allChecked = updatedCheckboxes.every((checkbox) => checkbox);
      if (onChange) {
        onChange(allChecked);
      }
    }
  };
  const allChecked = checkboxes?.every((checkbox) => checkbox) ?? false;

  return (
    <div css={checkboxLabelStyles}>
      <Checkbox
        checked={allChecked}
        onChange={handleSelectAllChange}
        disabled={disabled}
        desc="전체 동의"
      >
        {children}
      </Checkbox>
    </div>
  );
};

const checkboxLabelStyles = css`
  align-items: center;
  margin-left: 1rem;
  margin-bottom: 1rem;
  font-size: 16px;
`;
export default SelectAllCheckbox;
