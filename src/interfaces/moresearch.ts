import { Board } from "./board";
import { Debate } from "./debate";
import { Matching } from "./matching";

export interface SearchBoardList {
  page: number;
  totalSize: number;
  result: Board[];
}

export interface SearchDebateList {
  page: number;
  totalSize: number;
  result: Debate[];
}

export interface SearchMatchingList {
  page: number;
  totalSize: number;
  result: Matching[];
}
