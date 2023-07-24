import { Global } from "@emotion/react";
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/main/main";
import LoginPage from "./pages/auth/login";
import SigninPage from "./pages/auth/signin";
import BoardPage from "./pages/board/board";
import MbtiBoardPage from "./pages/board/mbti";
import CreateBoardPage from "./pages/board/create";
import UpdateBoardPage from "./pages/board/update";
import DebatePage from "./pages/debate/debate";
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
import MatchPage from "./pages/matching/match";
import MatchingPage from "./pages/matching/matching";
import CreateMatchingPage from "./pages/matching/create";
import UpdateMatchingPage from "./pages/matching/update";
import Callback from "./components/auth/Callback";

declare global {
  interface Window {
    Kakao: any;
    naver: any;
  }
}
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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/kakao/login" element={<Callback />} />
            <Route path="/naver/login" element={<Callback />} />
            <Route path="/google/login" element={<Callback />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signin/user" element={<UserInfo />} />
            <Route path="/signin/user" element={<UserInfo />} />
            <Route path="/board" element={<BoardPage />}>
              <Route path="mbti" element={<MbtiBoardPage />} />
              <Route path="create" element={<CreateBoardPage />} />
              <Route path="update" element={<UpdateBoardPage />} />
            </Route>
            <Route path="/match" element={<MatchPage />}>
              <Route path="matching" element={<MatchingPage />} />
              <Route path="create" element={<CreateMatchingPage />} />
              <Route path="update" element={<UpdateMatchingPage />} />
            </Route>
            <Route path="/debate" element={<DebatePage />}>
              <Route path="create" element={<CreateDebatePage />} />
              <Route path="update" element={<UpdateDebatePage />} />
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
