import React, { useState } from "react";
import ListPagination from "./ListPagination";

const List = (): JSX.Element => {
  const [lists, setLists] = useState([] as any | undefined); //백엔드와 통신하여 모두 데이터를 setLists 에 저장해서 사용
  const [limit, setLimit] = useState(10); //한 페이지에 보여줄 데이터의 갯
  const [page, setPage] = useState(1); //데이터 초기값은 1페이지
  const [counts, setCounts] = useState(1); //데이터 총 개수를 setCounts 에 저장해서 사용
  const [blockNum, setBlockNum] = useState(0); //한 페이지에 보여줄 페이지네이션의 개수를 block으로 지정하는 state, 초기값은 0

  return (
    <ListPagination
      limit={limit}
      page={page}
      setPage={setPage}
      blockNum={blockNum}
      setBlockNum={setBlockNum}
      counts={counts}
    />
  );
};

export default List;
