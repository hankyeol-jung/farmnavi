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
import { Routes, Route, Link, useLocation, HashRouter } from "react-router-dom";

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

function App() {
  useEffect(() => {
    if (!localStorage.getItem("watched")) {
      localStorage.setItem("watched", JSON.stringify([]));
    }
    // if (!sessionStorage.getItem("log")) {
    //   sessionStorage.setItem("log", JSON.stringify([]));
    // }
  }, []);

  let [test, setTest] = useState(
    menuContents.map((m, i) =>
      window.location.hash == "#/" + m.enname ? true : false
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
  let [environmentalForecastingData] = useState([
    {
      state: "보통",
      time: "12시 00분",
      title: "첫 적합한 증산 진입",
      totalTime: "0시간 40분",
      yesterdayTime: "2시간 10분",
    },
    {
      state: "경고",
      time: "12시 40분",
      title: "첫 많은 증산 진입",
      totalTime: "0시간 40분",
      yesterdayTime: "2시간 10분",
    },
    {
      state: "위험",
      time: "14시 30분",
      title: "첫 심각한 증산 진입",
      totalTime: "0시간 40분",
      yesterdayTime: "2시간 10분",
    },
    {
      state: "위험",
      time: "15시 30분",
      title: "배지 수분율 최저 25% 예상",
      totalTime: "0시간 40분",
      yesterdayTime: "2시간 10분",
    },
    {
      state: "위험",
      time: "15시 52분",
      title: "금일 최고온도 35.6°C 예상",
      totalTime: "0시간 40분",
      yesterdayTime: "2시간 10분",
    },
    {
      state: "보통",
      time: "12시 00분",
      title: "첫 적합한 증산 진입",
      totalTime: "0시간 40분",
      yesterdayTime: "2시간 10분",
    },
    {
      state: "경고",
      time: "12시 40분",
      title: "첫 많은 증산 진입",
      totalTime: "0시간 40분",
      yesterdayTime: "2시간 10분",
    },
    {
      state: "위험",
      time: "14시 30분",
      title: "첫 심각한 증산 진입",
      totalTime: "0시간 40분",
      yesterdayTime: "2시간 10분",
    },
    {
      state: "위험",
      time: "15시 30분",
      title: "배지 수분율 최저 25% 예상",
      totalTime: "0시간 40분",
      yesterdayTime: "2시간 10분",
    },
    {
      state: "위험",
      time: "15시 52분",
      title: "금일 최고온도 35.6°C 예상",
      totalTime: "0시간 40분",
      yesterdayTime: "2시간 10분",
    },
  ]);
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

    environmentalForecastingData.map((e, i) => {
      observer.observe(reveals[i]);
    });
  };

  let timeFirst = moment().format("a");

  return (
    <>
      {!sessionStorage.getItem("log") ? (
        <Login />
      ) : (
        <div className="w-screen h-screen App bg-slate-200">
          {/* 헤더메뉴 */}
          <div className="flex justify-between items-center px-6 py-3 shadow-md shadow-[#66666620] bg-white">
            <div className="w-1/3 cursor-pointer">
              <Link
                to={"/"}
                className="w-[12.25rem]"
                onClick={() => {
                  let copy = [...test];
                  test.map((a, i) => (copy[i] = false));
                  copy[0] = true;
                  setTest(copy);
                }}
              >
                <img src={logo} className="w-[12.25rem]"></img>
              </Link>
            </div>
            <div className="flex items-end justify-center w-1/3">
              <p className="mr-3 text-2xl font-medium text-neutral-600">
                {timeFirst == "am" ? "오전" : "오후"}
              </p>
              <p className="text-4xl font-bold text-neutral-700">
                <Clock format="hh:mm" ticking={true}></Clock>
              </p>
            </div>
            <div className="flex items-center justify-end w-1/3">
              <p className="mr-3 text-xl font-bold text-neutral-700">
                홍길동님
              </p>
              <span className="flex items-center cursor-pointer">
                <img src={userIcon} className="w-[3.25rem] mr-3"></img>
                <img src={arrowBottom} className="w-6"></img>
              </span>
            </div>
          </div>

          <div className="grid h-[calc(100%_-_108px_-_76px)] grid-cols-4 px-6 pb-8 gap-7 pt-7 ">
            <div className="relative h-full col-span-3 bg-white">
              <Routes>
                <Route path="/" element={menuContents[0].file} />
                {menuContents.map((m, i) => (
                  <Route path={"/" + m.enname} element={m.file} />
                ))}
              </Routes>
            </div>

            {/* 농장환경예측 */}
            <div className="relative h-full bg-white">
              <div className="absolute z-40 top-0 left-0 flex flex-col justify-between w-full h-[200px] border-b px-6 py-8 border-b-neutral-300">
                <p className="mr-6 text-[28px] font-bold text-black break-keep">
                  {moment().format("MM[월] DD[일]")} 농장 환경 예측
                </p>
                <div className="flex items-end justify-between">
                  <p className="mr-1 text-xl font-medium text-neutral-500 break-keep">
                    예측 적용시, 환경 점수
                  </p>
                  <div className="flex items-end justify-end">
                    <p className="flex justify-end mr-2 text-5xl font-medium text-black ">
                      <b className=" font-bold text-[#28a745] underline underline-[#28A745] underline-offset-4 mr-2">
                        100
                      </b>
                      점
                    </p>
                    <p className="text-xl font-medium text-neutral-600">예측</p>
                  </div>
                </div>
              </div>
              <div className="z-30 absolute top-0 w-full h-[30px] bg-gradient-to-b to-[#ffffff05] from-white mt-[200px]"></div>
              <div
                ref={environmentalForecastingRef}
                className=" h-[calc(100%_-_200px_-_76px)] absolute bottom-[76px] w-full overflow-scroll scroll-smooth"
                onScroll={() => {
                  reveal2();
                }}
              >
                <div className="absolute w-full pl-6 pr-8">
                  {environmentalForecastingData.map((e, i) => {
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
              <div className="z-30 absolute bottom-0 w-full h-[60px] bg-gradient-to-t to-[#ffffff05] from-white mb-[60px]"></div>
              {/* 스크롤무브 버튼 */}
              <div className=" z-30 bottom-0 absolute w-full h-[60px] bg-white text-center flex justify-center items-center">
                <span className="w-12 h-12 mx-3 text-5xl cursor-pointer text-neutral-400">
                  <FontAwesomeIcon
                    icon={faCaretUp}
                    onClick={environmentalForecastingRefUp}
                    className="mt-1"
                  />
                </span>
                <span className="w-12 h-12 mx-3 text-5xl cursor-pointer text-neutral-400">
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    onClick={environmentalForecastingRefDown}
                  />
                </span>
              </div>
            </div>
          </div>

          <NavigationMenu test={test} setTest={setTest} />
        </div>
      )}
    </>
  );
}

// 로그인 컴포넌트
function Login(props) {
  let result = useQuery("작명", () =>
    axios
      .get(
        "https://raw.githubusercontent.com/hankyeol-jung/farmnavi/main/src/json/user-information.json"
      )
      .then((a) => {
        return a.data;
      })
  );

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

  const handleSubmit = (values) => {
    let userValue = JSON.stringify(values, null, 2);
    console.log(userValue);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center pb-[120px] w-screen h-screen">
        {result.data && result.data.userId}
        <div className=" w-[500px]  h-[100px] flex justify-center items-center rounded-[50px]">
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
        <Link to={"/"} className="w-[328px] block mx-auto mb-[120px]">
          <img src={logo} className="w-full" />
        </Link>
        <Formik
          initialValues={{ userId: "", userPassword: "" }}
          validate={validate}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="flex items-center justify-between w-[600px] h-16">
              <p className="text-4xl font-medium text-neutral-800">ID</p>
              <Field
                type="text"
                name="userId"
                placeholder="ID를 입력하세요."
                className="border border-neutral-400 w-[80%] h-full px-3 text-3xl rounded-lg"
              />
            </div>
            <div className="block ml-[120px] mt-3 text-[#DC3545] text-lg">
              <ErrorMessage name="userId" />
            </div>
            <div className="flex items-center justify-between w-[600px] h-16 mt-6">
              <p className="text-4xl font-medium text-neutral-800">PW</p>
              <Field
                type="password"
                name="userPassword"
                placeholder="비밀번호를 입력하세요."
                className="border border-neutral-400 w-[80%] h-full px-3 text-3xl rounded-lg"
              />
            </div>
            <div className="block ml-[120px] mt-3 text-[#DC3545] text-lg">
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
  useEffect(() => {
    if (window.location.path == "#/" || window.location.path == undefined) {
      let copy = [...props.test];
      copy[0] = true;
      props.setTest(copy);
    }
  }, []);

  return (
    <div className="bg-white grid grid-cols-8 h-[108px] bottom-0 fixed w-screen">
      {menuContents.map((m, i) => (
        <Link
          key={m.enname + i}
          to={"/" + m.enname}
          className=" flex justify-center items-center cursor-pointer relative before:w-[2px] before:h-12 before:bg-neutral-300 before:absolute before:right-0 before:top-1/2 before:-translate-y-1/2 before:translate-x-1/2 last-of-type:before:hidden"
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
                  : "w-0 before:border-[0px]"
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
  // let [state, setState] = useState("before:bg-[#28a745]");

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
          " w-full py-6 pl-6 h-[143px] flex justify-between flex-col before:w-3 before:h-[94px] before:absolute relative before:left-0 before:top-1/2 before:-translate-y-1/2 "
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

export default App;
