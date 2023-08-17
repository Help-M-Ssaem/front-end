/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useCallback } from "react";
import Container from "../../components/container/Container";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import AlarmComponent from "../../components/alarm/Alarm";
import { useReadALLAlarm } from "../../hooks/alarm/useReadALLAlarm";
import { useDeleteAllAlarm } from "../../hooks/alarm/useDeletAllAlarm";
import { useInfiniteAlarmList } from "../../hooks/alarm/useInfiniteAlarmList";
import { CatLogoIcon } from "../../assets/CommonIcons";

const AlarmMenu = () => {
  const allReadMutation = useReadALLAlarm();
  const allDeleteAlarmMutation = useDeleteAllAlarm();
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteAlarmList();

  const handleAllReadPost = () => {
    allReadMutation.mutate();
  };
  const handleDelete = () => {
    allDeleteAlarmMutation.mutate();
  };
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const target = e.currentTarget;
    const bottom = target.scrollHeight - target.scrollTop === target.clientHeight;
    if (bottom && data?.pages && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, data?.pages, isFetchingNextPage]);
  
  return (
   <Container addCSS={containerCSS}>
    <div css={AlarmHeaderBoxCSS}>
      <div>전체알림 </div>
      <div css={AlarmControlCSS}>
        <div css={ReadCSS}
          onClick={handleAllReadPost}
        >전체 읽음</div>
        <>|</>
        <div css={DeleteCSS}
          onClick={handleDelete}
        >전체 삭제</div>
      </div>
    </div>

    <div onScroll={handleScroll} css={scrollContainerCSS}>
      {data &&
        data.pages.map((page, pageIndex) => (
          <div key={pageIndex}>
            {page.result.map((alarm) => (
            <AlarmComponent alarm={alarm} key={alarm.id} />
            ))}
          </div>
        ))}
      {/* {(data&&Array.isArray(data.pages))&& (
        <div css={noChatCSS}>
          <CatLogoIcon />
          <div css={bottomFontSIZE}>알람이 없어요!</div>
        </div>
        )} */}

    </div>
   </Container>
  );
};

export default AlarmMenu;

const containerCSS = css`
  box-shadow: 0rem 0.3rem 0.4rem rgba(0, 0, 0, 0.2);
`;
const AlarmHeaderBoxCSS = css`
  display: flex;
  justify-content: space-between;
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  color: ${COLOR.GRAY2};
  padding-bottom: 1rem;
  border-bottom: 1px solid ${COLOR.MAIN};
`;

const AlarmControlCSS = css`
  display: flex;
`;

const ReadCSS = css`
  margin-right: 0.5rem;
  cursor: pointer;
`;

const DeleteCSS = css`
  margin-left: 0.5rem;
  cursor: pointer;
`;

const scrollContainerCSS = css`
  max-height: 25rem;
  overflow-y: auto;
  padding-right: 0.7rem;
  padding-bottom: 1rem;

  ::-webkit-scrollbar {
    width: 0.5rem;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${COLOR.GRAY3};
    border-radius: 1.2rem;
  }
`;

const noChatCSS = css`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const bottomFontSIZE = css`
  padding-bottom: 0.5rem;
  font-size: ${FONT.SIZE.HEADLINE};
  color: ${COLOR.GRAY2};
`;
