/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Container from "../../components/container/Container";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import { useEffect, useState } from "react";
import AlarmComponent from "../../components/alarm/Alarm";
import { useReadALLAlarm } from "../../hooks/alarm/useReadALLAlarm";
import { useDeleteAllAlarm } from "../../hooks/alarm/useDeletAllAlarm";
import ListPagination from "../../components/Pagination/ListPagination";
import { BigCatLogoIcon } from "../../assets/CommonIcons";
import { mssaemAxios as axios } from "../../apis/axios";
import { AlarmList } from "../../interfaces/alarm";
import { useAlarmPaging } from "../../hooks/alarm/usePageAlarm";

const AlarmPage = () => {
  const allReadMutation = useReadALLAlarm();
  const allDeleteAlarmMutation = useDeleteAllAlarm();
  const [page, setPage] = useState(1);
  const { alarmList, refetch } = useAlarmPaging(page-1)
  const limit = 10;
  const totalPage = alarmList ? alarmList.totalSize : 1;
  const [blockNum, setBlockNum] = useState(0);

  const handleAllReadPost = () => {
    allReadMutation.mutate();
  };
  const handleDelete = () => {
    allDeleteAlarmMutation.mutate();
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    refetch();
  };
  useEffect(() => {
    setPage(page);
    refetch();
  }, [page, refetch]);
  return (
   <Container>
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
    {alarmList && alarmList.result.length > 0 && 
    <div>
      {alarmList &&
        alarmList.result.map((alarm) => (
          <AlarmComponent
            alarm={alarm}
          key={alarm.id}
        />
        ))}
        <ListPagination
          limit={limit}
          page={page}
          setPage={handlePageChange}
          blockNum={blockNum}
          setBlockNum={setBlockNum}
          totalPage={totalPage}
        />
    </div>}
    {alarmList && !(alarmList.result.length > 0) && 
    <div>
      {<div css={noChatCSS}>
        <BigCatLogoIcon />
        <div css={bottomFontSIZE}>알람이 없어요!</div>
      </div>}
    </div>}
   </Container>
  );
};

export default AlarmPage;


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

const noChatCSS = css`
  display: flex;
  width: 100%;
  height: ;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const bottomFontSIZE = css`
  font-size: ${FONT.SIZE.HEROTITLE};
  color: ${COLOR.GRAY2};
`;
