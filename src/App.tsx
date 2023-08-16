import { Global } from "@emotion/react";
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/main/main";
import LoginPage from "./pages/auth/login";
import SigninPage from "./pages/auth/signin";
import Search from "./pages/search/search";
import SearchResult from "./pages/search/result";
import MoreBoardResult from "./pages/search/moreBoardResult";
import MoreDebateResult from "./pages/search/moreDebateResult";
import MoreMatchingResult from "./pages/search/moreMatchingResult";

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
import Layout from "./components/layout/Layout";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/scroll/ScrollToTop";
import UserInfo from "./pages/auth/UserInfo";
import HotBoardPage from "./pages/main/hotBoard";
import HotDebatePage from "./pages/main/hotDebate";
import Callback from "./components/auth/Callback";

import MyPage from "./pages/usePage/mypage";
import MyPageUpdate from "./pages/usePage/update";
import DetailMatchingPage from "./pages/matching/detail";
import PrivacyPolicy from "./components/auth/PrivacyPolicy";
import CommunityPolicy from "./components/auth/CommunityPolicy";
import UserPage from "./pages/usePage/UserPage";
import ProfilePage from "./pages/usePage/ProfilePage";

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
            <Route path="/sign-up" element={<SigninPage />} />
            <Route path="/sign-up/member" element={<UserInfo />} />
            <Route path="/profile" element={<ProfilePage />} >
              <Route path="myprofile" element={<MyPage />} />
              <Route path="user/:id" element={<UserPage />} />
            </Route>
            <Route path="/mypage/update" element={<MyPageUpdate />} />
            <Route path="/search" element={<Search />} />
            <Route path="/search/result" element={<SearchResult />} />
            <Route path="/search/moreBoard" element={<MoreBoardResult />} />
            <Route path="/search/moreDebate" element={<MoreDebateResult />} />
            <Route
              path="/search/moreMatching"
              element={<MoreMatchingResult />}
            />
            <Route path="/policy/privacy" element={<PrivacyPolicy />} />
            <Route path="/policy/community" element={<CommunityPolicy />} />

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

            <Route path="/chatting" element={<ChattingPage />} />
            <Route path="/alarm" element={<AlarmPage />} />
          </Routes>
        </Layout>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
