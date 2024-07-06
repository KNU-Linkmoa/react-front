import { lazy } from "react";
import { Route, Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("./layouts/FullLayout.js"));
/***** Pages ****/

const Login = lazy(() => import("./pages/LoginPage.js"));
const Join = lazy(() => import("./pages/JoinPage.js"));
const Directory = lazy(() => import("./views/Directory.js"));
const Main = lazy(() => import("./views/main.js"));

/*****Routes******/

// 인증된 사용자인지 확인하는 함수
const isAuthenticated = () => {
  const token = localStorage.getItem("Accesstoken");
  console.log("Accesstoken 파싱 성공 " + token);
  return token ? true : false;
};

// 페이지에 대한 라우트를 보호하는 컴포넌트
const RouteGuard = ({ component }) => {
  return isAuthenticated() ? component : <LoginRequiredPage />;
  //return component;
};

const LoginRequiredPage = () => {
  return (
    <div>
      <h3>로그인이 필요한 서비스입니다.</h3>
      <Login />
    </div>
  );
};

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <RouteGuard component={<Main />} /> },
      { path: "/login", exact: true, element: <Login /> },
      { path: "/join", exact: true, element: <Join /> },
      { path: "/main", exact: true, element: <Main /> },

      { path: "/dir/:id", element: <Directory /> },
    ],
  },
];

export default ThemeRoutes;
