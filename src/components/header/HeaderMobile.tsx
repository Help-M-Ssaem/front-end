/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { LogoIcon } from "../../assets/HeaderIcons";
import { SearchIcon } from "../../assets/CommonIcons";
import { useNavigate, useLocation } from "react-router-dom";
import COLOR from "../../styles/color";
import FONT from "../../styles/font";
import Button from "../button/Button";
import useMemberInfo from "../../hooks/user/useMemberInfo";
import { useState } from "react";
import AlarmMenu from "../side/Alarm";
import FavoritesMenu from "../side/Favorites";
import Profile from "../profile/Profile";
import { useEffect, useRef } from "react";
import { useAlarmList } from "../../hooks/alarm/useGetAlarm";
import Catlogo from "../../assets/logo/CatLogo.svg";
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useMemberInfo();

  const { alarmList } = useAlarmList(0, 10);
  const newAlarm = alarmList?.result.some((alarm) => !alarm.state);
  const [alarmOpen, setAlarmOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);

  const handleAlarm = () => {
    setAlarmOpen((prevIsOpen) => !prevIsOpen);
  };
  const handleFavoritesOpen = () => {
    setFavoritesOpen((prevIsOpen) => !prevIsOpen);
  };
  const handleCloseAll = () => {
    alarmOpen && setAlarmOpen(false);
    favoritesOpen && setFavoritesOpen(false);
  };
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleSearchClick = () => {
    navigate("/search");
  };
  const homeRouteList = ["/", "/hotBoard", "/hotDebate"];
  const menuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setAlarmOpen(false);
        setFavoritesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <header css={headerCSS} onClick={handleCloseAll} ref={menuRef}>
      <div css={headerTopCSS}>
        <ul css={[listCSS, right]}>
          <img src={Catlogo} css={CatCss} />
          <li
            onClick={() => navigate("/chatting")}
            className={
              location.pathname.startsWith("/chatting") ? "active" : ""
            }
          >
            채팅
          </li>
          <li
            onClick={handleAlarm}
            className={alarmOpen ? "active" : ""}
            css={AlarmPotintCSS}
          >
            알람
            {newAlarm && <div css={[newAlarmCSS]}>!</div>}
          </li>
          {/* {newAlarm && 
            <div css = {[newAlarmCSS]}>!</div>} */}
          {alarmOpen && (
            <div css={AlarmContainerCSS}>
              <AlarmMenu />
            </div>
          )}
          <li
            onClick={handleFavoritesOpen}
            className={favoritesOpen ? "active" : ""}
            css={AlarmPotintCSS}
          >
            즐겨찾기
          </li>
          {favoritesOpen && (
            <div css={FavoritesContainerCSS}>
              <FavoritesMenu />
            </div>
          )}
          <li onClick={handleSearchClick}>
            <SearchIcon />
          </li>
        </ul>
      </div>
      <hr css={lineCSS} />
      <div css={headerBottomCSS}>
        <ul css={[listCSS, left]}>
          <li
            onClick={() => navigate("/")}
            className={
              homeRouteList.includes(location.pathname) ? "active" : ""
            }
          >
            Home
          </li>
          <li
            onClick={() => navigate("/board/mbti")}
            className={location.pathname.startsWith("/board") ? "active" : ""}
          >
            게시판
          </li>
          <li
            onClick={() => navigate("/match/matching")}
            className={location.pathname.startsWith("/match") ? "active" : ""}
          >
            M쌤 매칭
          </li>
          <li
            onClick={() => navigate("/debate/postlist")}
            className={location.pathname.startsWith("/debate") ? "active" : ""}
          >
            MBTI 과몰입 토론
          </li>
        </ul>
      </div>
    </header>
  );
};
export default Header;

const headerCSS = css`
  width: 100%;
  height: 8rem;
  // min-width: 1280px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
  padding: 0 15rem;
  background: ${COLOR.WHITE};
  box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.1);

  position: fixed;
  left: 0;
  right: 0;
  z-index: 999;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0.5rem;
    height: 6rem;
  }
`;
const CatCss = css`
  width: 35px;
  margin-right: 3rem;
`;

const lineCSS = css`
  width: 100%;
  margin: 1rem 0;
  border: 0.5px solid ${COLOR.GRAY4};

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
    // margin-left: -1rem;
    border: 0.5px solid ${COLOR.GRAY5};
    margin: 0rem 0 0rem -1rem -1rem;
  }
`;

const headerTopCSS = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const headerBottomCSS = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 0.2rem;
`;

const listCSS = css`
  display: flex;
  align-items: center;
  font-size: ${FONT.SIZE.HEADLINE};
  font-weight: ${FONT.WEIGHT.REGULAR};
  @media (max-width: 768px) {
    padding-left: 1rem;
  }

  li {
    cursor: pointer;
    position: relative;
  }

  li:hover {
    color: ${COLOR.MAIN1};
  }

  li.active {
    color: ${COLOR.MAIN1};
  }

  li.active:after {
    height: 3.5px;
    opacity: 1;
    transform: translateY(0.7rem);
  }

  li:after {
    position: absolute;
    top: 80%;
    left: 0;
    width: 100%;
    height: 3.5px;
    background: ${COLOR.MAIN1};
    content: "";
    opacity: 0;
    transition: height 0.3s, opacity 0.3s, transform 0.3s;
    transform: translateY(0.5rem);
  }

  li:hover:after {
    height: 3.5px;
    opacity: 1;
    transform: translateY(0.7rem);

    @media (max-width: 768px) {
      height: 2px;
    }
  }
`;

const left = css`
  li {
    margin-right: 1.7rem;
    @media (max-width: 768px) {
      margin-right: 1.7rem;
    }
  }
`;

const right = css`
  li {
    margin-left: 1.7rem;

    @media (max-width: 768px) {
      margin-left: 1.7rem;
    }
  }
`;

const buttonCSS = css`
  font-size: ${FONT.SIZE.HEADLINE};

  @media (max-width: 400px) {
    font-size: ${FONT.SIZE.BODY};
  }
`;

const AlarmPotintCSS = css`
  position: relative;
`;

const AlarmContainerCSS = css`
  position: absolute;
  top: 110%;
  right: 20;
  width: 20%;
  z-index: 11;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
const newAlarmCSS = css`
  position: absolute;
  top: -80%;
  right: -45%;
  width: 5%;
  z-index: 11;

  width: 1rem;
  height: 1rem;
  background-color: ${COLOR.MAIN1};
  border-radius: 50%;
  color: white;
  font-size: 0.7rem;
  text-align: center;
  line-height: 1rem;

  &::before {
    content: "";
    position: absolute;
    bottom: -0.4rem;
    left: 30%;
    transform: rotate(30deg) translateX(-50%);
    width: 0;
    height: 0;
    border-left: 0.2rem solid transparent;
    border-right: 0.2rem solid transparent;
    border-top: 0.5rem solid ${COLOR.MAIN1};
  }
`;

const FavoritesContainerCSS = css`
  position: absolute;
  top: 110%;
  right: 10;
  width: 100%;
  z-index: 11;
`;
