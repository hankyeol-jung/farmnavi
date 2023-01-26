import logo from "./images/logo.png";
import userIcon from "./images/user.png";
import arrowBottom from "./images/arrow-bottom.png";

import moment from "moment";
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import "moment/locale/ko";

import { useState } from "react";

function App() {
  const nowTime = moment().format("YYYY-MM-DD HH:mm:ss");
  console.log(nowTime);
  return (
    <div className="App bg-slate-200 w-screen h-screen">
      {/* 헤더메뉴 */}
      <div className="flex justify-between items-center px-6 py-3 shadow-md shadow-[#66666620] bg-white">
        <div className="w-1/3 cursor-pointer">
          <img src={logo} className="w-[12.25rem]"></img>
        </div>
        <div className="w-1/3 flex justify-center items-end">
          <p className="text-2xl text-neutral-600 font-medium mr-3"></p>
          <p className="text-4xl text-neutral-700 font-bold"></p>
        </div>
        <div className="w-1/3 flex justify-end items-center">
          <p className="text-xl text-neutral-700 font-bold mr-3">홍길동님</p>
          <span className="flex items-center cursor-pointer">
            <img src={userIcon} className="w-[3.25rem] mr-3"></img>
            <img src={arrowBottom} className="w-6"></img>
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
