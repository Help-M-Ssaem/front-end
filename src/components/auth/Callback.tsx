import React, { useEffect, useState } from "react";
import { useLogin } from "../../hooks/user/userlogin";

const Callback = () => {
  const [code, setCode] = useState<string | null>(null);
  const [socialLoginType, setSocialLoginType] = useState<string | null>(null);

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

  return <div></div>;
};

export default Callback;
