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
import { Routes, Route, Link } from "react-router-dom";

function App() {
  let timeFirst = moment().format("a");

  let menuIcons = [
    <FontAwesomeIcon icon={faSeedling} />,
    <FontAwesomeIcon icon={faWater} />,
    <span class="material-icons text-3xl">emoji_nature</span>,
    <FontAwesomeIcon icon={faPenToSquare} />,
    <FontAwesomeIcon icon={faBuildingWheat} />,
    <FontAwesomeIcon icon={faTrowel} />,
    <FontAwesomeIcon icon={faMusic} />,
    <FontAwesomeIcon icon={faCloud} />,
  ];
  let menuTitle = [
    "환경",
    "배지",
    "수정벌",
    "컨설팅",
    "농업기술센터",
    "농자재",
    "음악",
    "날씨",
  ];

  return (
    <div className="App bg-slate-200 w-screen h-screen">
      {/* 헤더메뉴 */}
      <div className="flex justify-between items-center px-6 py-3 shadow-md shadow-[#66666620] bg-white">
        <div className="w-1/3 cursor-pointer">
          <img src={logo} className="w-[12.25rem]"></img>
        </div>
        <div className="w-1/3 flex justify-center items-end">
          <p className="text-2xl text-neutral-600 font-medium mr-3">
            {timeFirst == "am" ? "오전" : "오후"}
          </p>
          <p className="text-4xl text-neutral-700 font-bold">
            <Clock format="hh:mm" ticking={true}></Clock>
          </p>
        </div>
        <div className="w-1/3 flex justify-end items-center">
          <p className="text-xl text-neutral-700 font-bold mr-3">홍길동님</p>
          <span className="flex items-center cursor-pointer">
            <img src={userIcon} className="w-[3.25rem] mr-3"></img>
            <img src={arrowBottom} className="w-6"></img>
          </span>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<div>ddddd</div>} />
      </Routes>

      {/* 네비게이션 메뉴 */}
      <div className="bg-white grid grid-cols-8 h-[108px] bottom-0 fixed w-screen">
        {menuIcons.map(function (icon, i) {
          return (
            <span className="flex flex-col justify-center items-center cursor-pointer relative before:w-[2px] before:h-12 before:bg-neutral-300 before:absolute before:right-0 before:top-1/2 before:-translate-y-1/2 before:translate-x-1/2 last-of-type:before:hidden">
              <div className="text-2xl text-gray-600 mb-2 w-10 h-10 flex justify-center items-center">
                {icon}
              </div>
              <p className="text-xl font-medium text-gray-600">
                {menuTitle[i]}
              </p>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default App;
