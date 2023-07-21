import React, { useEffect, useState } from "react";
import Kakao from "../../assets/logo/Kakao.svg";

const KakaoLogin = () => {
  const REST_API_KEY = "96fa48ddc32085c2751b6ea5fc90d10b";
  const REDIRECT_URI = "http://localhost:3000/login/KakaoCallback";

  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const [code, setCode] = useState<string | null>(null);

  const loginHandler = () => {
    window.location.href = link;
  };
  useEffect(() => {
    const getCode = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const authCode = searchParams.get("code");
      setCode(authCode);
      console.log(authCode);
    };

    getCode();
  }, []);

  return (
    <div>
      <img src={Kakao} onClick={loginHandler} />
    </div>
  );
};

export default KakaoLogin;
