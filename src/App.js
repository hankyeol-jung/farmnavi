import * as React from "react";
import logo from "./images/logo.png";
import userIcon from "./images/user.png";
import arrowBottom from "./images/arrow-bottom.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSeedling,
  faWater,
  faPenToSquare,
  faBuildingWheat,
  faTrowel,
  faMusic,
  faCloud,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { faForumbee } from "@fortawesome/free-brands-svg-icons";
import moment from "moment";

// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import "moment/locale/ko";
import Clock from "react-live-clock";

import { useState, useRef, useEffect, useBoolean, useCallback } from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
  HashRouter,
  useNavigate,
} from "react-router-dom";
import useInterval from "./useinterval";

import Environment from "./page/Environment.js";
import Badge from "./page/Badge.js";
import FertilizedBee from "./page/FertilizedBee.js";
import Consulting from "./page/Consulting.js";
import AgriculturalTechnologyCenter from "./page/AgriculturalTechnologyCenter.js";
import AgriculturalMaterials from "./page/AgriculturalMaterials.js";
import Music from "./page/Music.js";
import Weather from "./page/Weather.js";
import Typing, { TypingMultiline } from "react-kr-typing-anim";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { playChange } from "./store.js";
import ReactPlayer from "react-player";

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};
window.addEventListener("resize", appHeight);
appHeight();

let menuContents = [
  {
    enname: "environment",
    icon: <FontAwesomeIcon icon={faSeedling} />,
    koname: "환경",
    file: <Environment />,
  },
  {
    enname: "badge",
    icon: <FontAwesomeIcon icon={faWater} />,
    koname: "배지",
    file: <Badge />,
  },
  {
    enname: "fertilized-bee",
    icon: <FontAwesomeIcon icon={faForumbee} />,
    koname: "수정벌",
    file: <FertilizedBee />,
  },
  {
    enname: "consulting",
    icon: <FontAwesomeIcon icon={faPenToSquare} />,
    koname: "컨설팅",
    file: <Consulting />,
  },
  {
    enname: "agricultural-technology-center",
    icon: <FontAwesomeIcon icon={faBuildingWheat} />,
    koname: "농업기술센터",
    file: <AgriculturalTechnologyCenter />,
  },
  {
    enname: "agricultural-materials",
    icon: <FontAwesomeIcon icon={faTrowel} />,
    koname: "농자재",
    file: <AgriculturalMaterials />,
  },
  {
    enname: "music",
    icon: <FontAwesomeIcon icon={faMusic} />,
    koname: "음악",
    file: <Music />,
  },
  {
    enname: "weather",
    icon: <FontAwesomeIcon icon={faCloud} />,
    koname: "날씨",
    file: <Weather />,
  },
];

const userUrl =
  "https://raw.githubusercontent.com/hankyeol-jung/farmnavi/main/src/json/user-information.json";

function App(tab) {
  const location = useLocation();
  let sessionLog = sessionStorage.getItem("log");
  sessionLog = JSON.parse(sessionLog);
  let logState = sessionStorage.getItem("log");
  logState = JSON.parse(logState);
  let userData = sessionStorage.getItem("userData");
  userData = JSON.parse(userData);

  let result = useQuery("data", () =>
    axios.get(userUrl).then((a) => {
      return a.data;
    })
  );

  let data = () => {
    let index = 0;
    for (let i = 0; i < (result.data && result.data.length); i++) {
      if (result.data[i].userId == sessionLog.userId) {
        index = i;
        break;
      }
    }
    return result.data[index];
  };

  let navigate = useNavigate();

  let dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("watched")) {
      localStorage.setItem("watched", JSON.stringify([]));
    }
    if (!localStorage.getItem("regist")) {
      localStorage.setItem("regist", JSON.stringify([]));
    }
    if (!sessionStorage.getItem("log")) {
      sessionStorage.setItem(
        "log",
        JSON.stringify([{ userId: "", userPassword: "" }])
      );
    }
    if (!sessionStorage.getItem("logState")) {
      sessionStorage.setItem("logState", JSON.stringify(false));
    }
    if (!sessionStorage.getItem("userData")) {
      sessionStorage.setItem("userData", JSON.stringify([]));
    }
    if (logState == false || logState == null) {
      navigate("/login");
    }
  }, [tab]);

  useEffect(() => {
    if (logState == true) {
      sessionStorage.setItem("userData", JSON.stringify(result.data && data()));
    }
  }, [result.data]);

  let [test, setTest] = useState(
    menuContents.map((m, i) =>
      location.pathname == "/" + m.enname ? true : false
    )
  );

  let environmentalForecastingRef = useRef(0);
  let environmentalForecastingRefUp = (text) => {
    environmentalForecastingRef.current.scrollTop =
      environmentalForecastingRef.current.scrollTop - 144;
  };
  let environmentalForecastingRefDown = (text) => {
    environmentalForecastingRef.current.scrollTop =
      environmentalForecastingRef.current.scrollTop + 144;
  };

  let reveal2 = () => {
    let reveals = document.querySelectorAll(".reveal2");

    const observer = new IntersectionObserver((e) => {
      e.forEach((box) => {
        if (box.isIntersecting) {
          box.target.classList.remove("opacity-0");
          box.target.classList.remove("scale-[0.5]");
        } else {
          box.target.classList.add("opacity-0");
          box.target.classList.add("scale-[0.5]");
        }
      });
    });

    result.data &&
      data().FarmEnvironmentPrediction.contents.map((e, i) => {
        observer.observe(reveals[i]);
      });
  };

  let timeFirst = moment().format("a");

  const playing = useSelector((state) => state.playing);
  const playList = useSelector((state) => state.playList);
  const playNum = useSelector((state) => state.playNum);
  const playVolume = useSelector((state) => state.playVolume);

  let locationReload = () => {
    let copy = [...test];
    copy.map((c, i) => {
      copy[i] = false;
    });
    copy[0] = true;
    setTest(copy);
  };

  useEffect(() => {
    if (location.pathname == "/") {
      locationReload();
    }
  }, [locationReload]);

  return (
    <>
      <div className="w-full h-full App bg-slate-200">
        <MusicPlayer
          url={
            "/music/" +
            playList[playNum].music +
            " - " +
            playList[playNum].name +
            "." +
            playList[playNum].extension
          }
          playing={playing}
          playVolume={playVolume}
        />
        {logState == false ? null : (
          // 헤더메뉴
          <Header
            setTest={setTest}
            timeFirst={timeFirst}
            navigate={navigate}
            data={data}
            result={result}
            locationReload={locationReload}
            test={test}
          />
        )}

        <div
          className={`${
            logState == false
              ? ""
              : "grid h-[calc(100%_-_6.75rem_-_4.75rem)] grid-cols-4 px-6 pb-8 gap-7 pt-7 "
          }`}
        >
          <div
            className={`${
              logState == false ? "" : "relative h-full col-span-3 bg-white"
            }`}
          >
            <Routes>
              <Route path="/" element={menuContents[0].file} />
              {menuContents.map((m, i) => (
                <Route
                  path={"/" + m.enname}
                  element={m.file}
                  playing={playing}
                />
              ))}
              <Route
                path="/login"
                element={
                  <Login
                    result={result}
                    data={data}
                    navigate={navigate}
                    logState={logState}
                  />
                }
              />
            </Routes>
          </div>
          {logState == false ? null : (
            // 농장환경예측
            <FarmEnvironmentPrediction
              environmentalForecastingRef={environmentalForecastingRef}
              environmentalForecastingRefUp={environmentalForecastingRefUp}
              environmentalForecastingRefDown={environmentalForecastingRefDown}
              reveal2={reveal2}
              result={result}
              data={data}
            />
          )}
        </div>
        {logState == false ? null : (
          <NavigationMenu test={test} setTest={setTest} location={location} />
        )}
      </div>
    </>
  );
}

// 농장환경예측 컴포넌트
function FarmEnvironmentPrediction(props) {
  let scoreLength =
    props.result.data && props.data().FarmEnvironmentPrediction.score.length;

  let [scoreIndex, setScoreIndex] = useState(0);
  useInterval(() => {
    setScoreIndex(scoreIndex + 1);
    if (scoreIndex >= scoreLength - 1) setScoreIndex(0);
  }, 60000);

  return (
    <div className="relative h-full bg-white">
      <div className="absolute z-40 top-0 left-0 flex flex-col justify-between w-full h-[12.5rem] border-b px-6 py-8 border-b-neutral-300">
        <p className="mr-6 text-[1.75rem] font-bold text-black break-keep">
          {moment().format("MM[월] DD[일]")} 농장 환경 예측
        </p>
        <div className="flex items-end justify-between">
          <p className="mr-1 text-xl font-medium text-neutral-500 break-keep">
            예측 적용시, 환경 점수
          </p>
          <div className="flex items-end justify-end">
            <p className="flex justify-end mr-2 text-5xl font-medium text-black ">
              <b className=" font-bold text-[#28a745] underline underline-[#28A745] underline-offset-4 mr-2">
                {props.result.data &&
                  props.data().FarmEnvironmentPrediction.score[scoreIndex]}
              </b>
              점
            </p>
            <p className="text-xl font-medium text-neutral-600 break-keep">
              예측
            </p>
          </div>
        </div>
      </div>
      <div className="z-30 absolute top-0 w-full h-[1.875rem] bg-gradient-to-b to-[#ffffff05] from-white mt-[12.5rem]"></div>
      <div
        ref={props.environmentalForecastingRef}
        className=" h-[calc(100%_-_12.5rem_-_4.75rem)] absolute bottom-[4.75rem] w-full overflow-scroll scroll-smooth"
        onScroll={() => {
          props.reveal2();
        }}
      >
        <div className="absolute w-full pl-6 pr-8">
          {props.result.data &&
            props.data().FarmEnvironmentPrediction.contents.map((e, i) => {
              return (
                <EnvironmentalForecasting
                  time={e.time}
                  title={e.title}
                  totalTime={e.totalTime}
                  yesterdayTime={e.yesterdayTime}
                  state={e.state}
                  key={i}
                />
              );
            })}
        </div>
      </div>
      <div className="z-30 absolute bottom-0 w-full h-[3.75rem] bg-gradient-to-t to-[#ffffff05] from-white mb-[3.75rem]"></div>
      {/* 스크롤무브 버튼 */}
      <div className=" z-30 bottom-0 absolute w-full h-[3.75rem] bg-white text-center flex justify-center items-center">
        <span className="w-12 h-12 mx-3 text-5xl cursor-pointer text-neutral-400">
          <FontAwesomeIcon
            icon={faCaretUp}
            onClick={props.environmentalForecastingRefUp}
            className="mt-1"
          />
        </span>
        <span className="w-12 h-12 mx-3 text-5xl cursor-pointer text-neutral-400">
          <FontAwesomeIcon
            icon={faCaretDown}
            onClick={props.environmentalForecastingRefDown}
          />
        </span>
      </div>
    </div>
  );
}

// 헤더 컴포넌트
function Header(props) {
  return (
    <div className="flex justify-between items-center px-6 py-3 shadow-md shadow-[#66666620] bg-white">
      <div className="w-1/3 cursor-pointer">
        <Link to={"/"} className="w-[12.25rem]">
          <h1
            className="w-full"
            onClick={() => {
              props.locationReload();
            }}
          >
            <img src={logo} className="w-[12.25rem]"></img>
          </h1>
        </Link>
      </div>
      <div className="flex items-end justify-center w-1/3">
        <p className="mr-3 text-2xl font-medium text-neutral-600">
          {props.timeFirst == "am" ? "오전" : "오후"}
        </p>
        <p className="text-4xl font-bold text-neutral-700">
          <Clock format="hh:mm" ticking={true}></Clock>
        </p>
      </div>
      <div className="flex items-center justify-end w-1/3">
        <p className="mr-3 text-xl font-bold text-neutral-700">
          {props.result.data && props.data().name}님
        </p>
        <span
          className="flex items-center cursor-pointer"
          onClick={() => {
            sessionStorage.setItem("log", JSON.stringify([]));
            sessionStorage.setItem("logState", false);
            sessionStorage.setItem("userData", JSON.stringify([]));
            props.navigate("/login");
          }}
        >
          <img src={userIcon} className="w-[3.25rem] mr-3"></img>
          <img src={arrowBottom} className="w-6"></img>
        </span>
      </div>
    </div>
  );
}

// 로그인 컴포넌트
function Login(props) {
  let sessionLog = sessionStorage.getItem("log");
  sessionLog = JSON.parse(sessionLog);

  const validate = (values) => {
    const errors = {};

    if (!values.userId) {
      errors.userId = "아이디를 입력하세요.";
    }
    if (!values.userPassword) {
      errors.userPassword = "비밀번호를 입력하세요.";
    }

    return errors;
  };

  let navigate = useNavigate();

  let [logState, setLogState] = useState(false);

  let handleSubmit = (values) => {
    let userValue = JSON.stringify(values, null, 2);
    sessionStorage.setItem("log", userValue);
    setLogState(true);
  };

  let data = () => {
    let index = 0;
    for (let i = 0; i < (props.result.data && props.result.data.length); i++) {
      if (props.result.data[i].userId == sessionLog.userId) {
        index = i;
        break;
      }
    }
    return props.result.data[index];
  };

  useEffect(() => {
    props.result.data && data();
    if (logState == true) {
      let index = 0;
      for (
        let i = 0;
        i < (props.result.data && props.result.data.length);
        i++
      ) {
        if (
          (props.result.data && props.result.data[i].userId) ==
            sessionLog.userId &&
          (props.result.data && props.result.data[i].userPassword) ==
            sessionLog.userPassword
        ) {
          index = i;
          break;
        }
      }
      if (
        (props.result.data && props.result.data[index].userId) ==
          sessionLog.userId &&
        (props.result.data && props.result.data[index].userPassword) ==
          sessionLog.userPassword
      ) {
        setLogState(false);
        sessionStorage.setItem("logState", true);
        sessionStorage.setItem(
          "userData",
          JSON.stringify(props.result.data && data())
        );
        return navigate("/");
      } else {
        setLogState(false);
        return alert("아이디 또는 비밀번호를 확인해주세요.");
      }
    }
  }, [logState]);

  return (
    <>
      <div className="flex flex-col items-center justify-center pb-[7.5rem] w-screen h-screen fixed top-0 left-0 bg-white z-50">
        <div className=" w-[31.25rem]  h-[6.25rem] flex justify-center items-center rounded-[3.125rem]">
          <Typing
            Tag="div"
            preDelay={0}
            postDelay={0}
            cursor
            fixedWidth
            className="text-2xl font-bold text-gray-500 "
          >
            오늘 하루도 힘내세요! ^^
          </Typing>
        </div>
        <Link to={"/"} className="w-[20.5rem] block mx-auto mb-[7.5rem]">
          <img src={logo} className="w-full" />
        </Link>
        <Formik
          initialValues={{ userId: "", userPassword: "" }}
          validate={validate}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="flex items-center justify-between w-[37.5rem] h-16">
              <p className="text-4xl font-medium text-neutral-800">ID</p>
              <Field
                type="text"
                name="userId"
                placeholder="ID를 입력하세요."
                className="border border-neutral-400 w-[80%] h-full px-3 text-3xl rounded-lg"
              />
            </div>
            <div className="block ml-[7.5rem] mt-3 text-[#DC3545] text-lg">
              <ErrorMessage name="userId" />
            </div>
            <div className="flex items-center justify-between w-[37.5rem] h-16 mt-6">
              <p className="text-4xl font-medium text-neutral-800">PW</p>
              <Field
                type="password"
                name="userPassword"
                placeholder="비밀번호를 입력하세요."
                className="border border-neutral-400 w-[80%] h-full px-3 text-3xl rounded-lg"
              />
            </div>
            <div className="block ml-[7.5rem] mt-3 text-[#DC3545] text-lg">
              <ErrorMessage name="userPassword" />
            </div>
            <button
              className="block bg-[#2EABE2] text-white font-bold text-4xl text-center mt-12 w-[100%] mx-auto py-5 rounded-xl cursor-pointer"
              type="submit"
            >
              로그인
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}

// 네비게이션 메뉴 컴포넌트
function NavigationMenu(props) {
  return (
    <div className="bg-white grid grid-cols-8 h-[6.75rem] bottom-0 fixed w-screen">
      {menuContents.map((m, i) => (
        <Link
          key={m.enname + i}
          to={"/" + m.enname}
          className=" flex justify-center items-center cursor-pointer relative before:w-[0.125rem] before:h-12 before:bg-neutral-300 before:absolute before:right-0 before:top-1/2 before:-translate-y-1/2 before:translate-x-1/2 last-of-type:before:hidden"
          onClick={() => {
            let copy = [...props.test];

            props.test.map((a, i) => (copy[i] = false));

            copy[i] = true;

            props.setTest(copy);
          }}
        >
          <span
            className={
              `${
                props.test[i] == true
                  ? "w-40 before:border-[0.75rem]"
                  : "w-0 before:border-[0rem]"
              }` +
              " before:transition-[0.5s] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0 before:border-b-transparent before:border-t-[#2eabe2] before:border-r-transparent before:border-l-transparent h-1 bg-[#2eabe2] transition-[0.5s] absolute top-0"
            }
          ></span>
          <span className="flex flex-col items-center justify-center">
            <div
              className={
                "text-2xl mb-2 w-10 h-10 flex justify-center items-center transition " +
                `${props.test[i] == true ? "text-[#2eabe2]" : "text-gray-600"}`
              }
            >
              {m.icon}
            </div>
            <p
              className={
                "text-xl font-medium transition " +
                `${
                  props.test[i] == true || (props.test[i] == true) == true
                    ? "text-[#2eabe2]"
                    : "text-gray-600"
                }`
              }
            >
              {m.koname}
            </p>
          </span>
        </Link>
      ))}
    </div>
  );
}

// 환경 예측 컴포넌트
function EnvironmentalForecasting(props) {
  let stateColor = () => {
    if (props.state == "보통") {
      return "before:bg-[#28a745]";
    } else if (props.state == "경고") {
      return "before:bg-[#FFC107]";
    } else if (props.state == "위험") {
      return "before:bg-[#DC3545]";
    }
  };

  return (
    <div
      key={props.i}
      className="transition border-b border-gray-500 duration-[1000ms] reveal2 last:border-none"
    >
      <div
        className={
          stateColor() +
          " w-full py-6 pl-6 h-[8.9375rem] flex justify-between flex-col before:w-3 before:h-[5.875rem] before:absolute relative before:left-0 before:top-1/2 before:-translate-y-1/2 "
        }
      >
        <div className="flex items-center justify-between w-full">
          <p className="text-xl font-medium text-neutral-500 break-keep">
            {props.time}
          </p>
          <p className="text-2xl font-medium text-right text-neutral-900 break-keep">
            {props.title}
          </p>
        </div>
        <div>
          <p className="text-base font-medium text-right text-neutral-500 break-keep">
            금입 총 {props.totalTime} 예상 (어제 {props.yesterdayTime})
          </p>
        </div>
      </div>
    </div>
  );
}

function MusicPlayer(props) {
  return (
    <div className="hidden">
      <ReactPlayer
        url={props.url}
        playing={props.playing}
        volume={props.playVolume}
      />
    </div>
  );
}

export default App;
