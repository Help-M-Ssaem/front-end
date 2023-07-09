/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { LogoIcon } from "../../constants/HeaderIcons";
import { SearchIcon } from "../../constants/CommonIcons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import COLOR from "../../styles/color";

const Header = () => {
  const navigate = useNavigate();
  const [LoginOpen, setLoginOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState("");

  const handleLoginClick = () => {
    navigate("/login"); // 로그인 기능 만들어지면 수정
    setLoginOpen(!LoginOpen);
  };

  const handleItemClick = (path: string) => {
    setSelectedItem(path);
    navigate(path);
  };

  const handleSearchClick = () => {
    // 버튼 기능 디자인 만들어지면 수정
  };

  return (
    <header css={headerCSS}>
      <div css={headerTopCSS}>
        <LogoIcon onClick={() => navigate("/")} />
        {LoginOpen && (
          <button css={buttonCSS} onClick={handleLoginClick}>
            로그인하고 이용하기
          </button>
        )}
      </div>
      <div css={headerBottomCSS}>
        <ul css={[listCSS, left]}>
          <li
            onClick={() => handleItemClick("/")}
            className={selectedItem === "/" ? "active" : ""}
          >
            Home
          </li>
          <li
            onClick={() => handleItemClick("/board")}
            className={selectedItem === "/board" ? "active" : ""}
          >
            게시판
          </li>
          <li
            onClick={() => handleItemClick("/matching")}
            className={selectedItem === "/matching" ? "active" : ""}
          >
            M쌤 매칭
          </li>
          <li
            onClick={() => handleItemClick("/debate")}
            className={selectedItem === "/debate" ? "active" : ""}
          >
            MBTI 과몰입 토론
          </li>
          <li
            onClick={() => handleItemClick("/mbtitype")}
            className={selectedItem === "/mbtitype" ? "active" : ""}
          >
            MBTI 유형
          </li>
        </ul>
        <ul css={[listCSS, right]}>
          <li
            onClick={() => handleItemClick("/chatting")}
            className={selectedItem === "/chatting" ? "active" : ""}
          >
            채팅
          </li>
          <li
            onClick={() => handleItemClick("/alarm")}
            className={selectedItem === "/alarm" ? "active" : ""}
          >
            알람
          </li>
          <li
            onClick={() => handleItemClick("/favorites")}
            className={selectedItem === "/favorites" ? "active" : ""}
          >
            즐겨찾기
          </li>
          <li onClick={handleSearchClick}>
            <SearchIcon />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;

const headerCSS = css`
  width: 100%;
  min-width: 1280px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
  padding: 0 15rem;

  position: fixed;
  left: 0;
  right: 0;
`;

const headerTopCSS = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0 1.5rem 0;
`;

const headerBottomCSS = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2rem;
`;

const buttonCSS = css`
  border: none;
  background-color: ${COLOR.MAIN2};
  color: ${COLOR.WHITE};
  border-radius: 3rem;
  padding: 0.7rem 1.2rem;
  font-weight: bold;
  font-size: 0.9rem;
`;

const listCSS = css`
  display: flex;
  align-items: center;

  li {
    cursor: pointer;
    position: relative;
  }

  li:hover {
    color: ${COLOR.MAIN2};
  }

  li.active {
    color: ${COLOR.MAIN2};
  }

  li.active:after {
    height: 4px;
    opacity: 1;
    transform: translateY(1rem);
  }

  li:after {
    position: absolute;
    top: 80%;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${COLOR.MAIN2};
    content: "";
    opacity: 0;
    transition: height 0.3s, opacity 0.3s, transform 0.3s;
    transform: translateY(0.8rem);
  }

  li:hover:after {
    height: 4px;
    opacity: 1;
    transform: translateY(1rem);
  }
`;

const left = css`
  li {
    margin-right: 1.7rem;
  }
`;

const right = css`
  li {
    margin-left: 1.7rem;
  }
`;
