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

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useMemberInfo();

  const { alarmList } = useAlarmList(0, 10);
  const newAlarm = alarmList?.result.some(alarm => !alarm.state);
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
  const menuRef = useRef<HTMLDivElement | null>(null);  useEffect(() => {
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
        <LogoIcon onClick={() => navigate("/")} />
        {!user ? (
          <Button onClick={handleLoginClick} addCSS={buttonCSS}>
            로그인하고 이용하기
          </Button>
        ) : (
          <Profile
            id={user.id}
            image={user.profileImgUrl}
            name={user.nickName}
            mbti={user.mbti}
            badge={user.badge}
          />
        )}
      </div>
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
        <ul css={[listCSS, right]}>
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
            css = {AlarmPotintCSS}
          >
            알람
          </li>
          {newAlarm && 
            <div css = {[newAlarmCSS]}>!</div>}
          {alarmOpen && 
            <div css={AlarmContainerCSS}><AlarmMenu/></div>}
          <li
            onClick={handleFavoritesOpen}
            className={favoritesOpen ? "active" : ""}
            css = {AlarmPotintCSS}
          >
            즐겨찾기
          </li>
          {favoritesOpen && 
            <div css={FavoritesContainerCSS}><FavoritesMenu/></div>}
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
  height: 9rem;
  min-width: 1280px;

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
`;

const headerTopCSS = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0 0.8rem 0;
`;

const headerBottomCSS = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2rem;
`;

const listCSS = css`
  display: flex;
  align-items: center;
  font-size: ${FONT.SIZE.TITLE3};
  font-weight: ${FONT.WEIGHT.REGULAR};

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

const buttonCSS = css`
  font-size: ${FONT.SIZE.HEADLINE};
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
`;
const newAlarmCSS = css`
  position: absolute;
  top: 65%;
  right: 18.4%;
  width: 10%;
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
    content: '';
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
width: 20%;
z-index: 11;
`;


