/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from "react";
import { css } from "@emotion/react";

import { ListPaginationProps } from "../../interfaces/listpagination";
import FONT from "../../styles/font";
import COLOR from "../../styles/color";

const ListPagination = ({
  limit,
  page, //현재 페이지 번호
  setPage, //현제 페이지 번호 업데이트 하는 함수
  blockNum, //현재 블록 번호
  setBlockNum, //현재 블록 번호 업데이트 하는 함수
  totalPage, // 총 페이지의 수
}: ListPaginationProps): JSX.Element => {
  const createArr = (n: number) => {
    const iArr: number[] = new Array(n);
    for (let i = 0; i < n; i++) iArr[i] = i + 1;
    return iArr;
  };

  const pageLimit = limit;
  const blockArea: number = blockNum * pageLimit;
  const nArr = createArr(totalPage);
  const pArr = nArr.slice(blockArea, blockArea + pageLimit);

  const scrollRef = useRef();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

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
    if (
      page % pageLimit === 0 &&
      blockNum < Math.ceil(totalPage / pageLimit) - 1
    ) {
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
          이전
        </button>
        <div className="pageBtnWrapper" css={pageBtnWrapperCSS}>
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
          다음
        </button>
      </div>
    </>
  );
};

export default ListPagination;

const WraperCSS = css`
  padding-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const buttonCSS = css`
  margin: 0 3rem;
  color: ${COLOR.GRAY2};
  background-color: transparent;
  border: 0.1rem solid transparent;
  cursor: pointer;
  font-size: ${FONT.SIZE.TITLE3};
`;

const pageBtnWrapperCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;
  hegiht: 2rem;
  justify-content: space-between;
`;
const pageBtnCSS = css`
  border: 0.1rem solid transparent;
  color: ${COLOR.GRAY2};
  font-size: ${FONT.SIZE.TITLE3};
  display: flex;
  align-items: center;
  padding: 0 0.3rem;
  width: 2rem;
  height: 2rem;
  justify-content: center;

  &[aria-current] {
    cursor: pointer;
    color: black;
    border: 0.1rem solid ${COLOR.MAIN2};
    background-color: ${COLOR.MAIN4};
    border-radius: 0.3rem;
  }

  :hover {
    cursor: pointer;
    color: black;
    background-color: ${COLOR.MAIN4};
    border-radius: 0.3rem;
    transition: opacity 0.3s, transform 0.3s;
  }
`;
