import { useState } from "react";
import AppRouter from "components/Router";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Yewitter</footer>
      {/* 자바스크립트함수사용하려면 중괄호 잊지말기 여긴 JSX구역이니까! */}
      {/* 현재 연도를 반환해주는 자바스크립트 함수 */}
    </>
  );
}

export default App;
