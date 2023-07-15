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
import MatchingPage from "./pages/matching/matching";
import DebatePage from "./pages/debate/debate";
import UpdateDebatePage from "./pages/debate/update";
import CreateDebatePage from "./pages/debate/create";
import MbtiTypePage from "./pages/mbtitype/mbtitype";
import ChattingPage from "./pages/chatting/chatting";
import AlarmPage from "./pages/alarm/alarm";
import FavoritesPage from "./pages/favorites/favorites";
import UserPage from "./pages/user/user";
import Layout from "./components/layout/Layout";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/scroll/ScrollToTop";

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
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/board" element={<BoardPage />}>
              <Route path="mbti" element={<MbtiBoardPage />} />
              <Route path="create" element={<CreateBoardPage />} />
              <Route path="update" element={<UpdateBoardPage />} />
            </Route>
            <Route path="/matching" element={<MatchingPage />} />
            <Route path="/debate" element={<DebatePage />}>
              <Route path="create" element={<CreateDebatePage />} />
              <Route path="update" element={<UpdateDebatePage />} />
            </Route>
            <Route path="/mbtitype" element={<MbtiTypePage />} />
            <Route path="/chatting" element={<ChattingPage />} />
            <Route path="/alarm" element={<AlarmPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/user" element={<UserPage />} />
          </Routes>
        </Layout>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
