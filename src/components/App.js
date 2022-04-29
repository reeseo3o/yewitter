import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(user); /* 여기서 로그인 상태 isLoggedIn을 변경 */
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true); /* init상태 변경 */
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "initializing..."
      )}
      {/* init상태검사 */}
      <footer>&copy; {new Date().getFullYear()} Yewitter</footer>
      {/* 자바스크립트함수사용하려면 중괄호 잊지말기 여긴 JSX구역이니까! */}
      {/* 현재 연도를 반환해주는 자바스크립트 함수 */}
    </>
  );
}

export default App;
