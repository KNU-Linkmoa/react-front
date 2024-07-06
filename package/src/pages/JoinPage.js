import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/JoinStyle.css";

function JoinPage() {
  const navigate = useNavigate();

  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");

  const [NameValid, setNameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const passwordRegEx =
    /^(?=.*[0-9]{4,})(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [EmailValid, setEmailValid] = useState(false);
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const [PhoneValid, setPhoneValid] = useState(false);
  const phoneRegEx = /^\d{3}\d{3,4}\d{4}$/;

  const HandleInputUserName = (e) => {
    const name = e.target.value;
    setUserName(name);
    if (name.trim() === "" || name.length < 2) {
      setNameValid(false);
    } else {
      setNameValid(true);
    }
  };

  const HandleInputEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    if (emailRegEx.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const HandleInputPassword = (e) => {
    const Password = e.target.value;
    setPassword(Password);
    if (passwordRegEx.test(Password)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  const HandleInputConfirmPassword = (e) => {
    //비밀번호 확인
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
    setPasswordMatch(confirmPassword === Password);
  };

  const HandleInputPhoneNumber = (e) => {
    const phone = e.target.value;
    setPhoneNumber(phone);
    if (phoneRegEx.test(phone)) {
      setPhoneValid(true);
    } else {
      setPhoneValid(false);
    }
  };

  const onClickSubmit = (e) => {
    e.preventDefault();
    if (!UserName || !Email || !Password || !PhoneNumber) {
      alert("모든 필드를 입력하세요.");
      return;
    }
    fetch("http://localhost:8080/auth/sign-up", {
      //원하는 주소 입력
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: UserName,
        email: Email,
        password: Password,
        phoneNumber: PhoneNumber,
      }),
    })
      .then((res) => {
        if (res.ok) {
          alert("회원가입 성공!");
          navigate("/");
        } else {
          throw new Error("네트워크 오류 발생");
        }
      })
      .catch((error) => {
        console.error("오류 발생:", error);
      });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        marginTop: "100px",
      }}
    >
      <section
        style={{
          paddingLeft: "60px",
          paddingRight: "60px",
          width: "100%",
          margin: "0 auto",
          overflow: "visible",
        }}
      >
        <div style={{ width: "100%", borderRadius: "4px" }}>
          <div style={{ width: "100%", maxWidth: "1260px", margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
                onSubmit={onClickSubmit}
              >
                <h1 style={{ textAlign: "center" }}>회원가입</h1>
                <label class="labelStyle">이름</label>
                <input
                  type="text"
                  value={UserName}
                  onChange={HandleInputUserName}
                  placeholder={"이름을 입력하세요."}
                  class="textStyle"
                />

                {UserName && (
                  <div
                    className={NameValid ? "valid-message" : "invalid-message"}
                  >
                    {NameValid
                      ? "이름이 유효합니다."
                      : "이름이 유효하지 않습니다."}
                  </div>
                )}

                <label class="labelStyle">이메일</label>
                <input
                  type="email"
                  onChange={HandleInputEmail}
                  placeholder={"이메일을 입력하세요. "}
                  class="emailStyle"
                />
                {Email && (
                  <div
                    className={EmailValid ? "valid-message" : "invalid-message"}
                  >
                    {EmailValid
                      ? "이메일 형식이 유효합니다."
                      : "이메일 형식이 유효하지 않습니다.이메일 형식이 유효하지 않습니다."}
                  </div>
                )}
                <label class="labelStyle">비밀번호</label>
                <input
                  type="password"
                  value={Password}
                  onChange={HandleInputPassword}
                  placeholder={"비밀번호를 입력하세요. "}
                  class="passwordStyle"
                />
                {Password && (
                  <div
                    className={
                      passwordValid ? "valid-message" : "invalid-message"
                    }
                  >
                    {passwordValid
                      ? "비밀번호 형식이 유효합니다."
                      : "비밀번호는 8자 이상, 하나 이상의 특수문자, 최소 4개의 숫자를 포함해야 합니다."}
                  </div>
                )}
                <label class="labelStyle">비밀번호 확인</label>
                <input
                  type="password"
                  value={ConfirmPassword}
                  onChange={HandleInputConfirmPassword}
                  placeholder={"비밀번호를 확인하세요. "}
                  class="passwordStyle"
                />
                {ConfirmPassword && (
                  <div
                    className={
                      passwordMatch ? "valid-message" : "invalid-message"
                    }
                  >
                    {passwordMatch
                      ? "비밀번호가 일치합니다."
                      : "비밀번호가 일치하지 않습니다."}
                  </div>
                )}

                <label class="labelStyle">전화번호</label>
                <input
                  type="tel"
                  value={PhoneNumber}
                  onChange={HandleInputPhoneNumber}
                  placeholder={"전화번호를 입력하세요. "}
                  class="phoneNumberStyle"
                />
                {PhoneNumber && (
                  <div
                    className={PhoneValid ? "valid-message" : "invalid-message"}
                  >
                    {PhoneValid
                      ? "전화번호 형식이 유효합니다."
                      : "전화번호 형식이 유효하지 않습니다."}
                  </div>
                )}

                <br />
                <button
                  type="submit"
                  onChange={onClickSubmit}
                  className="buttonStyle"
                >
                  회원가입
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default JoinPage;
