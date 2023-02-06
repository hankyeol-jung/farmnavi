import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useRef, useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import Recommend from "../json/recommend.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import React from "react";

function Environment() {
  let [timeValue, setTimeValue] = useState(1);

  let scrollRef = useRef(0);

  let scrollRefUp = () => {
    scrollRef.current.scrollTop = scrollRef.current.scrollTop - 200;
  };
  let scrollRefDown = () => {
    scrollRef.current.scrollTop = scrollRef.current.scrollTop + 200;
  };

  let [growthDay, setGrowthDay] = useState([
    "9/27",
    "9/28",
    "9/29",
    "9/30",
    "10/1",
    "10/2 예측",
  ]);

  let averageTemperature = [
    { label: "2주평균", value: 26.2 },
    { label: "1주평균", value: 25.5 },
    { label: "어제", value: 24.2 },
    { label: "오늘(예측)", value: 24.8 },
    { label: "내일(예측)", value: 24.3 },
  ];
  let morningTemperature = [
    { label: "2주평균", value: 26.2 },
    { label: "1주평균", value: 25.5 },
    { label: "어제", value: 24.2 },
    { label: "오늘(예측)", value: 24.8 },
    { label: "내일(예측)", value: 24.3 },
  ];
  let dayAndNight = [
    { label: "2주평균", value: 26.2 },
    { label: "1주평균", value: 25.5 },
    { label: "어제", value: 24.2 },
    { label: "오늘(예측)", value: 24.8 },
    { label: "내일(예측)", value: 24.3 },
  ];

  let lastScrollY = 0;

  // 스크롤애니메이션 함수
  let reveal = () => {
    let reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((e) => {
      e.forEach((box) => {
        if (box.isIntersecting) {
          box.target.classList.remove("opacity-0");
          box.target.classList.remove("scale-[0.7]");
        } else {
          box.target.classList.add("opacity-0");
          box.target.classList.add("scale-[0.7]");
        }
      });
    });

    for (let i = 0; i < reveals.length; i++) {
      observer.observe(reveals[i]);
    }
  };

  let [fade, setFade] = useState("");

  useEffect(() => {
    setFade("end");
    return () => {
      setFade("");
    };
  }, []);

  return (
    <div className={"transition duration-[800ms] start " + fade}>
      <div className="absolute z-40 top-0 left-0 flex items-center justify-between w-full h-[106px] border-b px-11 border-b-neutral-300">
        <div className="flex items-center">
          <p className="mr-6 text-4xl font-bold text-black ">홍길동 농장 A동</p>
          <span className="px-5 py-1 text-xl font-bold text-black bg-[#ffc107] rounded-xl">
            내부가 조금 건조해요
          </span>
        </div>
        <div className="flex items-center">
          <p className=" text-[28px] font-medium mr-5 text-neutral-500 ">
            오늘의 환경점수
          </p>
          <p className=" text-[32px] font-medium text-black ">
            <b className=" text-[40px] font-bold text-[#28a745]">61</b>점
          </p>
        </div>
      </div>

      <div className="z-30 absolute top-0 w-full h-[60px] bg-gradient-to-b to-[#ffffff05] from-white mt-[100px]"></div>

      <div
        className="absolute bottom-[60px] w-full h-[calc(100%_-_106px_-_60px)] overflow-scroll scroll-smooth"
        ref={scrollRef}
        onScroll={() => {
          reveal();
        }}
      >
        <div className="absolute w-full pt-8 px-11 text-neutral-400">
          <div className="transition duration-1000 reveal">
            <div className="flex items-center justify-between h-[8.75rem] mb-6 ">
              <TemperatureHumidity
                borderColor="border-[#FEC104]"
                nowTemperature="29.3" //현재온도
                nowHumidity="48.8" //현재습도
                suggestionTemperature="28.5" //추천온도
                suggestionHumidity="52.5" //추천습도
              ></TemperatureHumidity>
              <SuitableTranspiration
                title="적합한 증산 진입 예상"
                time="02시간 50분 후"
                width="w-[20rem]"
                margin="mx-6"
              />
              <SuitableTranspiration
                title="적합한 증산활동 시간"
                time="오늘 02시간 10분 예측"
                width="w-[25rem]"
              />
            </div>
          </div>

          <div className="transition duration-1000 reveal ">
            <div className="w-full px-6 py-4 mb-6 border rounded-xl border-neutral-400 ">
              <div className="grid grid-cols-3 gap-5 mb-5">
                <TimeViewButton
                  functionValue={1}
                  timeValue={timeValue}
                  setTimeValue={setTimeValue}
                  title={"1분 간격 보기"}
                />
                <TimeViewButton
                  functionValue={10}
                  timeValue={timeValue}
                  setTimeValue={setTimeValue}
                  title={"10분 간격 보기"}
                />
                <TimeViewButton
                  functionValue={60}
                  timeValue={timeValue}
                  setTimeValue={setTimeValue}
                  title={"1시간 간격 보기"}
                />
              </div>
              <div className="h-[300px] w-full">
                <SuggestionBarChart timeValue={timeValue} />
              </div>
            </div>
          </div>
          <div className="transition duration-1000 reveal">
            <div className=" mb-6 after:absolute after:w-px after:h-[90px] after:bg-gray-400 after:left-2/3 after:top-1/2 after:-translate-y-1/2 before:absolute before:w-px before:h-[90px] before:bg-gray-400 before:left-1/3 before:top-1/2 before:-translate-y-1/2 relative grid grid-cols-3 gap-10 h-[8.75rem] w-full border rounded-xl border-neutral-400 px-6 py-4">
              <Suggestion
                title="관수 권장"
                today="10:32"
                yesterday="09:30"
                tomorrow="10:12"
              />
              <Suggestion
                title="환기 권장"
                today="10:32"
                yesterday="09:30"
                tomorrow="10:12"
              />
              <Suggestion
                title="진입 권장"
                today="10:32"
                yesterday="09:30"
                tomorrow="10:12"
              />
            </div>
          </div>
          <div className="transition duration-1000 reveal">
            <div className="w-full px-6 py-4 mb-6 border rounded-xl border-neutral-400 ">
              <p className="text-2xl font-medium text-neutral-500">
                환경에 의한 초세/생장 추이
              </p>
              <div className=" z-10 before:-z-10 before:absolute before:w-full before:h-px before:top-[calc(50%_+_5px)] before:-translate-y-1/2 before:bg-neutral-400 h-[240px] w-full relative">
                <p className=" -z-10 absolute top-[calc(50%_-_20px)] text-neutral-500 text-base">
                  영양
                </p>
                <div className=" -z-10 absolute flex flex-col items-center justify-between h-full text-base -translate-x-1/2 left-1/2 text-[#28A745]">
                  <p>초세강함</p>
                  <div className="w-px h-[75%] bg-neutral-400"></div>
                  <p>초세약함</p>
                </div>
                <GrowthLineChart />
              </div>
            </div>
          </div>

          <div className="transition duration-1000 reveal">
            <TemperatureGraph
              title="24시간 평균온도(°C)"
              advice={"24시간 평균온도를 낮추세요!"}
              temperatureGraphData={averageTemperature}
            />
          </div>
          <div className="transition duration-1000 reveal">
            <TemperatureGraph
              title="이른아침 온도상승(°C/시간당)"
              advice={"오전 7시 ~ 9시 경에 온도를 서서히 높이세요!"}
              temperatureGraphData={morningTemperature}
            />
          </div>
          <div className="transition duration-1000 reveal">
            <TemperatureGraph
              title="주야간온도편차(°C)"
              advice={"주야간 온도편차를 줄이세요!"}
              temperatureGraphData={dayAndNight}
            />
          </div>
        </div>
      </div>

      <div className="z-30 absolute bottom-0 w-full h-[60px] bg-gradient-to-t to-[#ffffff05] from-white mb-[60px]"></div>
      {/* 스크롤무브 버튼 */}
      <div className=" z-30 bottom-0 absolute w-full h-[60px] bg-white text-center flex justify-center items-center">
        <span className="w-12 h-12 mx-3 text-5xl cursor-pointer text-neutral-400">
          <FontAwesomeIcon
            icon={faCaretUp}
            onClick={scrollRefUp}
            className="mt-1"
          />
        </span>
        <span className="w-12 h-12 mx-3 text-5xl cursor-pointer text-neutral-400">
          <FontAwesomeIcon icon={faCaretDown} onClick={scrollRefDown} />
        </span>
      </div>
    </div>
  );
}

// 온도 그래프 컴포넌트
function TemperatureGraph(props) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  let temperatureGraphData = props.temperatureGraphData;

  let labelsLabel = temperatureGraphData.map((l, i) => {
    return l.label;
  });

  let graphData = [26.2, 25.5, 24.2, 24.8, 24.3];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      hover: { mode: null },
    },
    pointRadius: 10,
    pointBackgroundColor: "#ffffff",
    pointBorderColor: "#2EABE2",
    pointBorderWidth: 3,
    maintainAspectRatio: false,
    lineTension: 0.5,
    scales: {
      y: {
        display: false,
        ticks: {
          display: false,
          beginAtZero: true, // 0부터 시작하게 합니다.
        },
        grid: {
          drawTicks: false,
          display: false,
        },
      },
      x: {
        visible: false,
        ticks: {
          display: false,
        },
        grid: {
          drawTicks: false,
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
  };

  // console.log(labels.label);

  const data = {
    labels: labelsLabel,
    datasets: [
      {
        label: graphData,
        data: graphData,
        borderColor: "#2EABE2",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className=" flex items-center h-[300px] justify-between w-full p-6 mb-6 border rounded-xl border-neutral-400 ">
      <div className="w-[334px] h-full flex flex-col justify-between mr-5">
        <div>
          <p className="text-xl font-bold text-neutral-500">{props.title}</p>
        </div>
        <div className="px-10 bg-[#2EABE2] w-full h-[152px] text-white text-2xl font-bold rounded-2xl flex justify-center items-center text-center">
          <p className=" break-keep">{props.advice}</p>
        </div>
      </div>
      <div className="z-10 w-[70%] h-full bg-[#31ABE220] rounded-2xl relative">
        <div className="absolute flex flex-col justify-between w-full h-full py-3 text-base font-medium -z-10 text-neutral-600 ">
          <div className="grid h-full grid-cols-5">
            {temperatureGraphData.map((l, i) => {
              return (
                <div
                  key={i}
                  className="before:last:w-0 relative before:w-px before:right-0 before:top-1/2 before:-translate-y-1/2 before:absolute before:h-[150px] before:bg-neutral-400 h-full"
                >
                  <div className="flex flex-col items-center justify-between h-full">
                    <p className="block text-center ">{l.label}</p>
                    <p className="text-center">{l.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full h-full px-[8.5%] py-12 mx-auto">
          <Line options={options} data={data} />
        </div>
      </div>
    </div>
  );
}

// 1분&10분&1시간 간격 보기 버튼
function TimeViewButton(props) {
  return (
    <span
      className={
        "px-4 py-2 text-xl text-center rounded-full cursor-pointer transition " +
        `${
          props.timeValue == props.functionValue
            ? "bg-[#2EABE2] text-white font-bold"
            : "bg-slate-200 text-black font-medium"
        }`
      }
      onClick={() => {
        props.setTimeValue(props.functionValue);
      }}
    >
      {props.title}
    </span>
  );
}

// 환경에 의한 초세/생장 추이 그래프
function GrowthLineChart(props) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  let graphData = [3, 13, 6, 18, 4, 8];

  let borderColor = graphData.map((g, i) => {
    if (g > 10) {
      return "#FEC104";
    } else if (g == 10) {
      return "#28A745";
    } else {
      return "#DC3545";
    }
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    pointRadius: 10,
    pointBackgroundColor: "#ffffff",
    pointBorderColor: borderColor,
    pointBorderWidth: 3,
    maintainAspectRatio: false,
    lineTension: 0.5,
    scales: {
      y: {
        display: false,
        max: 20.0,
        ticks: {
          display: false,
          beginAtZero: true, // 0부터 시작하게 합니다.
          stepSize: 10, // 10 씩 증가하도록 설정합니다.
        },
        grid: {
          drawTicks: false,
          display: false,
        },
      },
      x: {
        visible: false,
        grid: {
          drawTicks: false,
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
  };

  const data = {
    labels: ["9/27", "9/28", "9/29", "9/30", "10/1", "10/2 예측"],
    datasets: [
      {
        label: "생식",
        data: graphData,
        borderColor: "#DDDDDD",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}

// 관수 & 환기 & 진입 오늘/내일 그래프 컴포넌트
function SuggestionBarChart(props) {
  let [recommend, setRecommend] = useState(Recommend);

  // 배열 총 개수
  let maxValue = recommend.length;

  let recommendTest = [];
  // 10분 단위로 출력
  function timeChoice(num) {
    for (let i = 0; i < maxValue; i++) {
      if (i % num == 0) {
        recommendTest.push(recommend[i]);
      }
    }
  }

  timeChoice(props.timeValue);

  let recommendColor = recommendTest.map((recommend, i) => {
    const { x, ...copy } = recommend;
    if (copy.y <= 1) {
      return "#0069D9";
    } else if (1 < copy.y && copy.y <= 3) {
      return "#58AAFF";
    } else if (3 < copy.y && copy.y <= 6) {
      return "#28A745";
    } else if (6 < copy.y && copy.y <= 13) {
      return "#FFD75E";
    }
  });

  const data = {
    datasets: [
      {
        backgroundColor: recommendColor,
        data: recommendTest,
        borderWidth: 0,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        max: 20.0,
        ticks: {
          beginAtZero: true, // 0부터 시작하게 합니다.
          stepSize: 10, // 10 씩 증가하도록 설정합니다.
        },
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          drawTicks: false,
        },
      },
    },
  };

  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  return <Bar data={data} options={options} />;
}

// 관수 & 환기 & 진입 권장 컴포넌트
function Suggestion(props) {
  return (
    <div className="flex flex-col justify-between h-full mx-auto w-[15.625rem]">
      <p className="text-xl font-medium text-neutral-500">{props.title}</p>
      <div>
        <p className="mb-1 text-2xl font-medium text-black">
          오늘 {props.today} (어제 {props.yesterday})
        </p>
        <span className="px-4 py-1 bg-[#2eabe2] rounded-full text-xl font-medium text-white">
          내일 {props.tomorrow} 예측
        </span>
      </div>
    </div>
  );
}

// 적합한 증산 컴포넌트
function TemperatureHumidity(props) {
  return (
    <div
      className={
        "px-6 py-4 border-4 rounded-xl h-full grid grid-cols-5 w-[40%] " +
        props.borderColor
      }
    >
      <div className="flex flex-col justify-between col-span-2">
        <p className="text-lg font-medium text-neutral-700 ">현재</p>
        <div className="flex items-center justify-between">
          <p className="text-xl font-medium text-neutral-500 ">온도</p>
          <p className="text-2xl font-bold text-black ">
            {props.nowTemperature}°C
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xl font-medium text-neutral-500 ">습도</p>
          <p className="text-2xl font-bold text-black ">{props.nowHumidity}%</p>
        </div>
      </div>
      <span className="w-px h-16 mx-auto mt-auto bg-slate-200"></span>
      <div className="flex flex-col justify-between col-span-2">
        <p className="text-lg font-medium text-neutral-700 ">추천</p>
        <div className="flex items-center justify-between">
          <p className="text-xl font-medium text-neutral-500 ">온도</p>
          <p className="text-2xl font-bold text-black ">
            {props.suggestionTemperature}°C
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xl font-medium text-neutral-500 ">습도</p>
          <p className="text-2xl font-bold text-black ">
            {props.suggestionHumidity}%
          </p>
        </div>
      </div>
    </div>
  );
}

// 적합한 증산 컴포넌트
function SuitableTranspiration(props) {
  return (
    <div
      className={
        "flex flex-col justify-between h-full px-6 py-4 border rounded-xl border-neutral-400 " +
        props.width +
        " " +
        props.margin
      }
    >
      <p className="text-xl font-medium text-neutral-500">{props.title}</p>
      <p className=" text-[32px] font-bold text-black text-right">
        {props.time}
      </p>
    </div>
  );
}

export default Environment;
