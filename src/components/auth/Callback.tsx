import React, { useEffect, useState } from "react";
import { useLogin } from "../../hooks/user/userlogin";
import { useNavigate } from "react-router-dom";
const Callback = () => {
  const [code, setCode] = useState<string | null>(null);
  const [socialLoginType, setSocialLoginType] = useState<string | null>(null);

  const navigate = useNavigate();
  useEffect(() => {
    const getCode = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const authCode = searchParams.get("code");
      const parsedURL = new URL(window.location.href);
      const type = parsedURL.pathname.split("/")[1];

      setCode(authCode);
      setSocialLoginType(type);
    };

    getCode();
  }, []);

  const idToken = code;

  const loginMutation = useLogin();

  useEffect(() => {
    if (idToken && socialLoginType) {
      loginMutation.mutate({ type: socialLoginType, idToken });
    }
  }, [idToken, socialLoginType]);

  useEffect(() => {
    if (loginMutation.isSuccess && loginMutation.data) {
      const data = loginMutation.data;

      if ("accessToken" in data && "refreshToken" in data) {
        navigate("/");
        window.location.reload();
      } else if ("message" in data) {
        navigate("/sign-up");
      }
    }
  }, [loginMutation.isSuccess, loginMutation.data, navigate]);

  return <div></div>;
};

export default Callback;
