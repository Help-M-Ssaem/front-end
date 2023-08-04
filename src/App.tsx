import { Global } from "@emotion/react";
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/main/main";
import LoginPage from "./pages/auth/login";
import SigninPage from "./pages/auth/signin";
import SearchBar from "./pages/search/search";

import BoardPage from "./pages/board/board";
import MbtiBoardPage from "./pages/board/mbti";
import DetailBoardPage from "./pages/board/detail";
import CreateBoardPage from "./pages/board/create";
import UpdateBoardPage from "./pages/board/update";

import MatchPage from "./pages/matching/match";
import MatchingPage from "./pages/matching/matching";
import CreateMatchingPage from "./pages/matching/create";
import UpdateMatchingPage from "./pages/matching/update";

import DebatePage from "./pages/debate/debate";
import PostListDebatePage from "./pages/debate/postlist";
import DetailDebatePage from "./pages/debate/detail";
import UpdateDebatePage from "./pages/debate/update";
import CreateDebatePage from "./pages/debate/create";

import MbtiTypePage from "./pages/mbtitype/mbtitype";
import ChattingPage from "./pages/chatting/chatting";
import AlarmPage from "./pages/alarm/alarm";
import FavoritesPage from "./pages/favorites/favorites";
import Layout from "./components/layout/Layout";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/scroll/ScrollToTop";
import UserInfo from "./pages/auth/UserInfo";
import HotBoardPage from "./pages/main/hotBoard";
import HotDebatePage from "./pages/main/hotDebate";
import Callback from "./components/auth/Callback";

import MyPage from "./pages/mypage/mypage";
import DetailMatchingPage from "./pages/matching/detail";

function App() {
  return (
    <>
      <Global styles={GlobalStyle} />
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Layout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/hotBoard" element={<HotBoardPage />} />
            <Route path="/hotDebate" element={<HotDebatePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/kakao/login" element={<Callback />} />
            <Route path="/naver/login" element={<Callback />} />
            <Route path="/google/login" element={<Callback />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signin/user" element={<UserInfo />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/search" element={<SearchBar />} />

            <Route path="/board" element={<BoardPage />}>
              <Route path="mbti" element={<MbtiBoardPage />} />
              <Route path=":id" element={<DetailBoardPage />} />
              <Route path="create" element={<CreateBoardPage />} />
              <Route path=":id/update" element={<UpdateBoardPage />} />
            </Route>

            <Route path="/match" element={<MatchPage />}>
              <Route path="matching" element={<MatchingPage />} />
              <Route path=":id" element={<DetailMatchingPage />} />
              <Route path="create" element={<CreateMatchingPage />} />
              <Route path=":id/update" element={<UpdateMatchingPage />} />
            </Route>

            <Route path="/debate" element={<DebatePage />}>
              <Route path="postlist" element={<PostListDebatePage />} />
              <Route path=":id" element={<DetailDebatePage />} />
              <Route path="create" element={<CreateDebatePage />} />
              <Route path=":id/update" element={<UpdateDebatePage />} />
            </Route>

            <Route path="/mbtitype" element={<MbtiTypePage />} />
            <Route path="/chatting" element={<ChattingPage />} />
            <Route path="/alarm" element={<AlarmPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </Layout>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
