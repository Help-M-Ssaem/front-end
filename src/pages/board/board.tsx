import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { mbtiState } from "../../states/board";

const Board = () => {
  const setMbtiSelected = useSetRecoilState(mbtiState);

  useEffect(() => {
    // setMbtiSelected("전체");
  }, []);

  return <Outlet />;
};

export default Board;
