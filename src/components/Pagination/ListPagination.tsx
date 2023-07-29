/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from "react";
import { css } from "@emotion/react";

import { ListPaginationProps } from "../../interfaces/listpagination";

const ListPagination = ({
  limit,
  page,
  setPage,
  blockNum,
  setBlockNum,
  counts,
}: ListPaginationProps): JSX.Element => {
  const createArr = (n: number) => {
    const iArr: number[] = new Array(n);
    for (let i = 0; i < n; i++) iArr[i] = i + 1;
    return iArr;
  };

  const pageLimit = 10;
  const totalPage: number = Math.ceil(counts / limit);
  const blockArea: number = Number(blockNum * pageLimit);
  const nArr = createArr(Number(totalPage));
  let pArr = nArr?.slice(blockArea, Number(pageLimit) + blockArea);

  const prevPage = () => {
    if (page <= 1) {
      return;
    }
    if (page - 1 <= pageLimit * blockNum) {
      setBlockNum((n: number) => n - 1);
    }
    setPage((n: number) => n - 1);
  };

  const nextPage = () => {
    if (page >= totalPage) {
      return;
    }
    if (pageLimit * Number(blockNum + 1) < Number(page + 1)) {
      setBlockNum((n: number) => n + 1);
    }
    setPage((n: number) => n + 1);
  };
  return (
    <>
      <div className="ListPagenationWrapper" css={WraperCSS}>
        <button
          css={buttonCSS}
          className="moveToPreviousPage"
          onClick={() => {
            prevPage();
          }}
          disabled={page === 1}
        >
          &lt;
        </button>
        <div className="pageBtnWrapper" css={pageBtnCSS}>
          {/* pArr 배열의 각 페이지 버튼을 렌더링합니다. */}
          {pArr?.map((n: number) => (
            <button
              className="pageBtn"
              css={pageBtnCSS}
              key={n}
              onClick={() => {
                setPage(n);
              }}
              aria-current={page === n ? "page" : undefined}
            >
              {n}
            </button>
          ))}
        </div>
        <button
          css={buttonCSS}
          className="moveToNextPage"
          onClick={() => {
            nextPage();
          }}
          disabled={page === totalPage}
        >
          &gt;
        </button>
      </div>
    </>
  );
};

export default ListPagination;

const WraperCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 37px;
  margin: 38px 94px 38px 88px;
`;
const buttonCSS = css`
  color: #5a5a5a;
  background-color: transparent;
  border: none;
  font-size: 25px;
  cursor: pointer;
`;
const pageBtnCSS = css`
  width: 49px;
  height: 49px;
  margin: 0 10px;
  border: none;
  color: black;
  font-size: 20px;
  opacity: 0.2;

  &:hover {
    background-color: #b42954;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disbled] {
    background-color: #e2e2e2;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background-color: #f5d3dd;
    font-weight: bold;
    cursor: revert;
    transform: revert;
    opacity: 1;
  }
`;
