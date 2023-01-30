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
} from "@fortawesome/free-solid-svg-icons";
import { faForumbee } from "@fortawesome/free-brands-svg-icons";
import moment from "moment";
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import "moment/locale/ko";
import Clock from "react-live-clock";
import { useState, useRef, useEffect, useBoolean } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import Environment from "./page/Environment.js";
import Badge from "./page/Badge.js";
import FertilizedBee from "./page/FertilizedBee.js";
import Consulting from "./page/Consulting.js";
import AgriculturalTechnologyCenter from "./page/AgriculturalTechnologyCenter.js";
import AgriculturalMaterials from "./page/AgriculturalMaterials.js";
import Music from "./page/Music.js";
import Weather from "./page/Weather.js";

function App() {
  let timeFirst = moment().format("a");

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

  let [test, setTest] = useState(
    menuContents.map((m, i) =>
      window.location.pathname == "/" + m.enname ? true : false
    )
  );

  console.log(test);

  return (
    <div className="w-screen h-screen App bg-slate-200">
      {/* 헤더메뉴 */}
      <div className="flex justify-between items-center px-6 py-3 shadow-md shadow-[#66666620] bg-white">
        <div className="w-1/3 cursor-pointer">
          <img src={logo} className="w-[12.25rem]"></img>
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
          <p className="mr-3 text-xl font-bold text-neutral-700">홍길동님</p>
          <span className="flex items-center cursor-pointer">
            <img src={userIcon} className="w-[3.25rem] mr-3"></img>
            <img src={arrowBottom} className="w-6"></img>
          </span>
        </div>
      </div>

      <Routes>
        {menuContents.map((m, i) => (
          <Route path={"/" + m.enname} element={m.file} />
        ))}
      </Routes>

      {/* 네비게이션 메뉴 */}
      <div className="bg-white grid grid-cols-8 h-[108px] bottom-0 fixed w-screen">
        {menuContents.map((m, i) => (
          <Link
            key={m.enname + i}
            to={"/" + m.enname}
            className=" flex justify-center items-center cursor-pointer relative before:w-[2px] before:h-12 before:bg-neutral-300 before:absolute before:right-0 before:top-1/2 before:-translate-y-1/2 before:translate-x-1/2 last-of-type:before:hidden"
            onClick={() => {
              let copy = [...test];

              test.map((a, i) => (copy[i] = false));

              copy[i] = true;

              setTest(copy);
            }}
          >
            <span
              className={
                `${
                  test[i] == true
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
                  `${test[i] == true ? "text-[#2eabe2]" : "text-gray-600"}`
                }
              >
                {m.icon}
              </div>
              <p
                className={
                  "text-xl font-medium transition " +
                  `${test[i] == true ? "text-[#2eabe2]" : "text-gray-600"}`
                }
              >
                {m.koname}
              </p>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default App;
