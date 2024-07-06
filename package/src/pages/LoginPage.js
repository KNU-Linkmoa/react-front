import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import google from "../image/google.png";
import kakao from "../image/kakao.png";
import naver from "../image/naver.png";
import "../css/LoginStyle.css";
import axios from "axios";

function LoginPage() {
  //상태 변화를 기록하기 위함.
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // useNavigate 훅을 사용

  const handleInputId = (e) => {
    setInputId(e.target.value);
  }; // e : 이벤트 객체 - 이벤트가 발생하면, 이벤트가 발생한 요소의 현재값(사용자가 입력한 값)으로 inputId 상태 업데이트.

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  function saveTokensFromResponse(response) {
    const Accesstoken = response.headers["accesstoken"]; // response.headers.get() 사용
    if (Accesstoken) {
      localStorage.setItem("Accesstoken", Accesstoken);
      console.log("Accesstoken:", Accesstoken);
    } else {
      console.error("응답에서 Accesstoken 헤더를 찾을 수 없습니다.");
    }
  }

  const onClickLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/auth/login",
        {
          email: inputId,
          password: inputPw,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          saveTokensFromResponse(response);
          navigate("/main");
          // 로그인 성공 후 다른 작업 수행
        } else {
          throw new Error("로그인 실패");
        }
      })
      .catch((error) => console.error("로그인 중 에러 발생:", error));
  };

  const onClickRegister = () => {
    navigate("/Join");
  };

  const onNaverLogin = () => {
    window.location.href = "http://localhost:8080/login/oauth2/code/naver";
  };
  const onGoogleLogin = () => {
    window.location.href = "http://localhost:8080/login/oauth2/code/google";
  };

  const handleGoogleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginTop: "200px",
        }}
      >
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={onClickLogin}
        >
          <h1 style={{ textAlign: "center" }}>로그인</h1>
          <label className="labelStyle">Email</label>
          <input
            type="text"
            value={inputId}
            onChange={handleInputId}
            className="textStyle"
            placeholder="이메일을 입력하세요"
          />
          <label className="labelStyle">Password</label>
          <input
            type="password"
            value={inputPw}
            onChange={handleInputPw}
            className="passwordStyle"
            placeholder="비밀번호를 입력하세요"
          />
          <br />
          <button type="submit" className="buttonStyle">
            Login
          </button>

          <button
            type="button"
            onClick={onClickRegister}
            className="buttonStyle"
          >
            회원가입
          </button>
        </form>
      </div>
      <hr />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <a href="https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code">
          <img src={kakao} alt="kakao" width="70" className="imageStyle" />
        </a>
        <a href="https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=gmBsMYDBOlDZr8ruJuQb&scope=name%20email&state=JFVxqf7_F6KjMvojnDNwJCGVYeB5JZrYeT5SDQIY1Rc%3D&redirect_uri=http://localhost:8080/login/oauth2/code/naver">
          <img src={naver} alt="naver" width="70" className="imageStyle" />
        </a>
        <a href="https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&client_id=377262399790-22fej88tjrehtu9krk5q0aa8bv6e5lp6.apps.googleusercontent.com&scope=profile%20email&state=L1x0ypyye_UT5F5HW6OU6UJxIO4VLZEha_mwqqgtjXM%3D&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Flogin%2Foauth2%2Fcode%2Fgoogle&service=lso&o2v=2&theme=mn&flowName=GeneralOAuthFlow">
          <img src={google} alt="google" width="70" className="imageStyle" />
        </a>
      </div>
    </div>
  );
}

export default LoginPage;
