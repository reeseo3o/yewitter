/* 절대경로로 설정하게해둬서,설치한 패키지 이름과 파일의 이름이 같으면 오류나니 주의*/
import firebase from "firebase/compat/app";
import "firebase/compat/auth"; /* 인증모듈 사용하기위해 불러옴 */
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService =
  firebase.auth(); /* 로그인을 위한 firebase(auth)는 다른 파일에서 참조해야하니 내보내기 */
/* 모듈 단위로 임포트 하는 이유 - 파이어베이스와 같은 노드 패키지에는 보통 여러 기능이 들어 있어 파일의 크기가 큼. 그래서 패키지 전체 내용 임포트시 프로그램 무거워지고 사용안하는 기능까지 부르게 됨. 보통 패키지를 모듈 단위로 나눠 필요한 모듈만 임포트하여 사용. 만약 패키지 전체 임포트한다면 크롬에서 콘솔 경고로 패키지를 모듈 단위로 임포트하라고 경고메시지 뜸 */
export const dbService = firebase.firestore();
