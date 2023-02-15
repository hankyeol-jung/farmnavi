import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useQuery } from "react-query";
import moment from "moment";
import imgSun from "../images/sun.png";
import clouds from "../images/clouds.png";
import manyclouds from "../images/manyclouds.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const key =
  "vsZWuLpwRcENy8q7VDSrgrduHvo8sZyau8MAEP%2FMC%2F%2FVCKZKIcUD6THLXGjmDz8X%2BNgwooBbSdWAn53UixF%2Few%3D%3D";

const nx = 68;
const ny = 100;

function Weather() {
  let ymdNow = moment().format("YYYYMMDD");
  let tomorrow = moment().add(1, "days").format("YYYYMMDD");
  let ttomorrow = moment().add(2, "days").format("YYYYMMDD");
  let basetime = "0500";
  let timeNow = moment().format("HH00");

  let normalUrl = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst`;
  let url =
    normalUrl +
    `?serviceKey=${key}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${ymdNow}&base_time=${basetime}&nx=${nx}&ny=${ny}`;

  let result = useQuery("작명", () =>
    axios.get(url).then((a) => {
      return a.data;
    })
  );

  let normalData = result.data && result.data.response.body.items.item;
  let normalDataLen =
    result.data && result.data.response.body.items.item.length;

  let POPI = 0; //POP 강수확률
  let PTYI = 0; //PTY 강수형태
  let PCPI = 0; //PCP 1시간 강수량
  let REHI = 0; //REH 습도
  let SNOI = 0; //SNO 1시간 신적설
  let SKYI = 0; //SKY 하늘상태
  let TMPI = 0; //TMP 1시간 기온
  let TMNI = 0; //TMN 일 최저기온
  let TMXI = 0; //TMX 일 최고기온
  let UUUI = 0; //UUU 풍속(동서성분)
  let VVVI = 0; //VVV 풍속(남북성분)
  let WAVI = 0; //WAV 파고
  let VECI = 0; //VEC 풍향
  let WSDI = 0; //WSD 풍속

  let tPOPI = 0; //POP 강수확률
  let tPTYI = 0; //PTY 강수형태
  let tPCPI = 0; //PCP 1시간 강수량
  let tREHI = 0; //REH 습도
  let tSNOI = 0; //SNO 1시간 신적설
  let tSKYI = 0; //SKY 하늘상태
  let tTMPI = 0; //TMP 1시간 기온
  let tTMNI = 0; //TMN 일 최저기온
  let tTMXI = 0; //TMX 일 최고기온
  let tUUUI = 0; //UUU 풍속(동서성분)
  let tVVVI = 0; //VVV 풍속(남북성분)
  let tWAVI = 0; //WAV 파고
  let tVECI = 0; //VEC 풍향
  let tWSDI = 0; //WSD 풍속

  let ttPOPI = 0; //POP 강수확률
  let ttPTYI = 0; //PTY 강수형태
  let ttPCPI = 0; //PCP 1시간 강수량
  let ttREHI = 0; //REH 습도
  let ttSNOI = 0; //SNO 1시간 신적설
  let ttSKYI = 0; //SKY 하늘상태
  let ttTMPI = 0; //TMP 1시간 기온
  let ttTMNI = 0; //TMN 일 최저기온
  let ttTMXI = 0; //TMX 일 최고기온
  let ttUUUI = 0; //UUU 풍속(동서성분)
  let ttVVVI = 0; //VVV 풍속(남북성분)
  let ttWAVI = 0; //WAV 파고
  let ttVECI = 0; //VEC 풍향
  let ttWSDI = 0; //WSD 풍속

  let dataForFunc = (aa, bb) => {
    for (let i = 0; i < normalDataLen; i++) {
      if (normalData[i].fcstTime == timeNow && normalData[i].category == aa) {
        // window[bb] = i;
        eval(bb + "=" + i);
        break;
      }
    }
    return (
      result.data && result.data.response.body.items.item[eval(bb)].fcstValue
    );
  };
  let dataTempForFunc = (aa, bb) => {
    for (let i = 0; i < normalDataLen; i++) {
      if (normalData[i].fcstDate == ymdNow && normalData[i].category == aa) {
        // window[bb] = i;
        eval(bb + "=" + i);
        break;
      }
    }
    return (
      result.data && result.data.response.body.items.item[eval(bb)].fcstValue
    );
  };

  let tdataForFunc = (aa, bb, cc) => {
    for (let i = 0; i < normalDataLen; i++) {
      if (
        normalData[i].fcstDate == tomorrow &&
        normalData[i].category == aa &&
        normalData[i].fcstTime == cc
      ) {
        eval(bb + "=" + i);
        break;
      }
    }
    return (
      result.data && result.data.response.body.items.item[eval(bb)].fcstValue
    );
  };
  let ttdataForFunc = (aa, bb, cc) => {
    for (let i = 0; i < normalDataLen; i++) {
      if (
        normalData[i].fcstDate == ttomorrow &&
        normalData[i].category == aa &&
        normalData[i].fcstTime == cc
      ) {
        eval(bb + "=" + i);
        break;
      }
    }
    return (
      result.data && result.data.response.body.items.item[eval(bb)].fcstValue
    );
  };

  tdataForFunc("POP", "tPOPI", "0900"); // 현재 강수확률
  dataForFunc("PTY", "PTYI"); // 현재 강수형태
  dataForFunc("PCP", "PCPI"); // 현재 1시간 강수량
  dataForFunc("REH", "REHI"); // 현재 습도
  dataForFunc("SNO", "SNOI"); // 현재 1시간 신적설
  dataForFunc("SKY", "SKYI"); // 현재 하늘상태
  dataForFunc("TMP", "TMPI"); // 현재 1시간 기온
  dataTempForFunc("TMN", "TMNI"); // 현재 일 최저기온
  dataTempForFunc("TMX", "TMXI"); // 현재 일 최고기온
  dataForFunc("UUU", "UUUI"); // 현재 풍속(동서성분)
  dataForFunc("VVV", "VVVI"); // 현재 풍속(남북성분)
  dataForFunc("WAV", "WAVI"); // 현재 파고
  dataForFunc("VEC", "VECI"); // 현재 풍향
  dataForFunc("WSD", "WSDI"); // 현재 풍속

  let windDirection = Math.floor(parseInt(dataForFunc("VEC", "VECI")));

  function toTextualWindDescription(degree) {
    if (degree > 337.5) return "북";
    if (degree > 292.5) return "북서";
    if (degree > 247.5) return "서";
    if (degree > 202.5) return "남서";
    if (degree > 157.5) return "남";
    if (degree > 122.5) return "남동";
    if (degree > 67.5) return "동";
    if (degree > 22.5) {
      return "북동";
    }
    return "북";
  }

  function toTextualSky(sky) {
    if (sky >= 0 && sky <= 1) return "맑음";
    else if (sky == 3 || sky == 2) return "구름많음";
    else if (sky == 4) return "흐림";
  }

  let [fade, setFade] = useState("");

  useEffect(() => {
    setFade("end");
    return () => {
      setFade("");
    };
  }, []);

  let weatherIcon = (a) => {
    if (a >= 0 && a <= 1) {
      return (
        <img
          className="h-full absolute top-1/2 -translate-y-1/2 left-[40%] -translate-x-1/2"
          src={imgSun}
        ></img>
      );
    } else if (a == 2 || a == 3) {
      return (
        <img
          className="h-full absolute top-1/2 -translate-y-1/2 left-[40%] -translate-x-1/2"
          src={clouds}
        ></img>
      );
    } else if (a == 4) {
      return (
        <img
          className="h-full absolute top-1/2 -translate-y-1/2 left-[40%] -translate-x-1/2"
          src={manyclouds}
        ></img>
      );
    }
  };

  return (
    <div
      className={
        "relative flex w-full transition duration-[800ms] start py-8 px-11 h-full " +
        fade
      }
    >
      <div className=" relative w-[40%] border rounded-xl border-neutral-400 h-full px-10 py-6 mr-6">
        {result.isLoading && (
          <div className="absolute z-20 flex items-center justify-center w-full h-full transition-all -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl top-1/2 left-1/2">
            <svg
              className="spinner"
              width="65px"
              height="65px"
              viewBox="0 0 66 66"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="path"
                fill="none"
                stroke-width="6"
                stroke-linecap="round"
                cx="33"
                cy="33"
                r="30"
              ></circle>
            </svg>
          </div>
        )}
        <div className="flex items-center justify-center w-full h-full ">
          <p className="absolute z-50 text-2xl font-medium top-6 left-10 text-neutral-600 mb-9">
            현재
          </p>
          <div className="w-full">
            <div className="relative w-[80%] h-[160px] mx-auto mb-10">
              {weatherIcon(dataForFunc("SKY", "SKYI"))}
              <p className=" text-[80px] font-bold text-black absolute top-1/2 -translate-y-1/2 left-1/2 translate-x-1/2">
                {dataForFunc("TMP", "TMPI")}°
              </p>
            </div>
            <div className="flex items-center justify-center mb-6">
              <p className=" text-[32px] font-medium text-black">
                어제보다 2.2° 높음
              </p>
              <p className="mx-3 text-2xl font-medium text-neutral-400">/</p>
              <p className=" text-[32px] font-medium text-black">
                {toTextualSky(dataForFunc("SKY", "SKYI"))}
              </p>
            </div>
            <div className="flex items-center justify-center mb-2">
              <div className="flex items-center justify-end mx-2">
                <p className="mr-2 text-lg font-medium text-neutral-500">
                  최저기온
                </p>
                <p className="text-2xl font-bold text-black">
                  {dataTempForFunc("TMN", "TMNI")}°
                </p>
              </div>
              <div className="flex items-center justify-end mx-2">
                <p className="mr-2 text-lg font-medium text-neutral-500">
                  최고기온
                </p>
                <p className="text-2xl font-bold text-black">
                  {dataTempForFunc("TMX", "TMXI")}°
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center mb-2">
              <div className="flex items-end justify-center mx-2">
                <p className="mr-2 text-lg font-medium text-neutral-500">
                  습도
                </p>
                <p className="text-2xl font-bold text-black">
                  {dataForFunc("REH", "REHI")}%
                </p>
              </div>
            </div>
            <div className="grid h-20 grid-cols-4 gap-2 mt-7">
              <div className="border border-[#2AA745] rounded-lg flex flex-col justify-center items-center h-full">
                <p className="text-lg font-medium text-neutral-700">강수확률</p>
                <p className="text-[#2AA745] font-bold text-lg">
                  {dataForFunc("POP", "POPI")}%
                </p>
              </div>
              <div className="border border-[#2AA745] rounded-lg flex flex-col justify-center items-center h-full">
                <p className="text-lg font-medium text-neutral-700">강수량</p>
                <p className="text-[#2AA745] font-bold text-lg">
                  {dataForFunc("PCP", "PCPI")}
                </p>
              </div>
              <div className="border border-[#31ABE2] rounded-lg flex flex-col justify-center items-center h-full">
                <p className="text-lg font-medium text-neutral-700">풍속</p>
                <p className="text-[#31ABE2] font-bold text-lg">
                  {dataForFunc("WSD", "WSDI")}m/s
                </p>
              </div>
              <div className="border border-[#31ABE2] rounded-lg flex flex-col justify-center items-center h-full">
                <p className="text-lg font-medium text-neutral-700">
                  풍향
                  <small className="text-xs ">
                    ({toTextualWindDescription(windDirection)}풍)
                  </small>
                </p>
                <p className="text-[#31ABE2] font-bold text-lg">
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    className={"rotate-[" + windDirection + "deg]"}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[60%] grid grid-cols-2 gap-6">
        <div className="grid h-full grid-rows-2 gap-6 px-10 py-6 border rounded-xl border-neutral-400">
          <div className="relative before:absolute before:w-full before:h-px before:bg-neutral-300 before:bottom-0">
            {result.isLoading && (
              <div className="absolute z-50 flex items-center justify-center w-[105%] h-full transition-all -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl top-1/2 left-1/2">
                <svg
                  className="spinner"
                  width="65px"
                  height="65px"
                  viewBox="0 0 66 66"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="path"
                    fill="none"
                    stroke-width="6"
                    stroke-linecap="round"
                    cx="33"
                    cy="33"
                    r="30"
                  ></circle>
                </svg>
              </div>
            )}
            <p className="mb-6 text-lg font-medium text-center text-neutral-500">
              내일 오전
            </p>
            <div className="relative w-[80%] h-[100px] mx-auto mb-3">
              {weatherIcon(tdataForFunc("SKY", "tSKYI", "0800"))}
              <p className=" text-[40px] font-bold text-black absolute top-1/2 -translate-y-1/2 left-1/2 translate-x-1/2">
                {tdataForFunc("TMP", "tTMPI", "0800")}°
              </p>
            </div>
            <div className="flex items-end justify-center mx-2">
              <p className="mr-2 text-lg font-medium text-neutral-500">습도</p>
              <p className="text-lg font-medium text-black">
                {tdataForFunc("REH", "tREHI", "0800")}%
              </p>
            </div>
            <div className="grid h-20 grid-cols-2 gap-2 mt-2">
              <div className="border border-[#2AA745] rounded-lg flex flex-col justify-center items-center h-full">
                <p className="text-lg font-medium text-neutral-700">강수확률</p>
                <p className="text-[#2AA745] font-bold text-lg">
                  {tdataForFunc("POP", "POPI", "0800")}%
                </p>
              </div>
              <div className="border border-[#2AA745] rounded-lg flex flex-col justify-center items-center h-full">
                <p className="text-lg font-medium text-neutral-700">강수량</p>
                <p className="text-[#2AA745] font-bold text-lg">
                  {tdataForFunc("PCP", "PCPI", "0800")}
                </p>
              </div>
            </div>
          </div>
          <div className="relative ">
            {result.isLoading && (
              <div className="absolute z-50 flex items-center justify-center w-[105%] h-full transition-all -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl top-1/2 left-1/2">
                <svg
                  className="spinner"
                  width="65px"
                  height="65px"
                  viewBox="0 0 66 66"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="path"
                    fill="none"
                    stroke-width="6"
                    stroke-linecap="round"
                    cx="33"
                    cy="33"
                    r="30"
                  ></circle>
                </svg>
              </div>
            )}
            <p className="mb-6 text-lg font-medium text-center text-neutral-500">
              내일 오후
            </p>
            <div className="relative w-[80%] h-[100px] mx-auto mb-3">
              {weatherIcon(tdataForFunc("SKY", "tSKYI", "1400"))}
              <p className=" text-[40px] font-bold text-black absolute top-1/2 -translate-y-1/2 left-1/2 translate-x-1/2">
                {tdataForFunc("TMP", "tTMPI", "1600")}°
              </p>
            </div>
            <div className="flex items-end justify-center mx-2">
              <p className="mr-2 text-lg font-medium text-neutral-500">습도</p>
              <p className="text-lg font-medium text-black">
                {tdataForFunc("REH", "tREHI", "1600")}%
              </p>
            </div>
            <div className="grid h-20 grid-cols-2 gap-2 mt-2">
              <div className="border border-[#2AA745] rounded-lg flex flex-col justify-center items-center h-full">
                <p className="text-lg font-medium text-neutral-700">강수확률</p>
                <p className="text-[#2AA745] font-bold text-lg">
                  {tdataForFunc("POP", "POPI", "1600")}%
                </p>
              </div>
              <div className="border border-[#2AA745] rounded-lg flex flex-col justify-center items-center h-full">
                <p className="text-lg font-medium text-neutral-700">강수량</p>
                <p className="text-[#2AA745] font-bold text-lg">
                  {tdataForFunc("PCP", "PCPI", "1600")}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid h-full grid-rows-2 gap-6 px-10 py-6 border rounded-xl border-neutral-400">
          <div className="relative before:absolute before:w-full before:h-px before:bg-neutral-300 before:bottom-0">
            {result.isLoading && (
              <div className="absolute z-50 flex items-center justify-center w-[105%] h-full transition-all -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl top-1/2 left-1/2">
                <svg
                  className="spinner"
                  width="65px"
                  height="65px"
                  viewBox="0 0 66 66"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="path"
                    fill="none"
                    stroke-width="6"
                    stroke-linecap="round"
                    cx="33"
                    cy="33"
                    r="30"
                  ></circle>
                </svg>
              </div>
            )}
            <p className="mb-6 text-lg font-medium text-center text-neutral-500">
              모레 오전
            </p>
            <div className="relative w-[80%] h-[100px] mx-auto mb-3">
              {weatherIcon(ttdataForFunc("SKY", "ttSKYI", "0800"))}
              <p className=" text-[40px] font-bold text-black absolute top-1/2 -translate-y-1/2 left-1/2 translate-x-1/2">
                {ttdataForFunc("TMP", "ttTMPI", "0800")}°
              </p>
            </div>
            <div className="flex items-end justify-center mx-2">
              <p className="mr-2 text-lg font-medium text-neutral-500">습도</p>
              <p className="text-lg font-medium text-black">
                {ttdataForFunc("REH", "ttREHI", "0800")}%
              </p>
            </div>
            <div className="grid h-20 grid-cols-2 gap-2 mt-2">
              <div className="border border-[#2AA745] rounded-lg flex flex-col justify-center items-center h-full">
                <p className="text-lg font-medium text-neutral-700">강수확률</p>
                <p className="text-[#2AA745] font-bold text-lg">
                  {ttdataForFunc("POP", "POPI", "0800")}%
                </p>
              </div>
              <div className="border border-[#2AA745] rounded-lg flex flex-col justify-center items-center h-full">
                <p className="text-lg font-medium text-neutral-700">강수량</p>
                <p className="text-[#2AA745] font-bold text-lg">
                  {ttdataForFunc("PCP", "PCPI", "0800")}
                </p>
              </div>
            </div>
          </div>
          <div className="relative ">
            {result.isLoading && (
              <div className="absolute z-50 flex items-center justify-center w-[105%] h-full transition-all -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl top-1/2 left-1/2">
                <svg
                  className="spinner"
                  width="65px"
                  height="65px"
                  viewBox="0 0 66 66"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="path"
                    fill="none"
                    stroke-width="6"
                    stroke-linecap="round"
                    cx="33"
                    cy="33"
                    r="30"
                  ></circle>
                </svg>
              </div>
            )}
            <p className="mb-6 text-lg font-medium text-center text-neutral-500">
              모레 오후
            </p>
            <div className="relative w-[80%] h-[100px] mx-auto mb-3">
              {weatherIcon(ttdataForFunc("SKY", "ttSKYI", "1400"))}
              <p className=" text-[40px] font-bold text-black absolute top-1/2 -translate-y-1/2 left-1/2 translate-x-1/2">
                {ttdataForFunc("TMP", "ttTMPI", "1600")}°
              </p>
            </div>
            <div className="flex items-end justify-center mx-2">
              <p className="mr-2 text-lg font-medium text-neutral-500">습도</p>
              <p className="text-lg font-medium text-black">
                {ttdataForFunc("REH", "ttREHI", "1600")}%
              </p>
            </div>
            <div className="grid h-20 grid-cols-2 gap-2 mt-2">
              <div className="border border-[#2AA745] rounded-lg flex flex-col justify-center items-center h-full">
                <p className="text-lg font-medium text-neutral-700">강수확률</p>
                <p className="text-[#2AA745] font-bold text-lg">
                  {ttdataForFunc("POP", "POPI", "1600")}%
                </p>
              </div>
              <div className="border border-[#2AA745] rounded-lg flex flex-col justify-center items-center h-full">
                <p className="text-lg font-medium text-neutral-700">강수량</p>
                <p className="text-[#2AA745] font-bold text-lg">
                  {ttdataForFunc("PCP", "PCPI", "1600")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
