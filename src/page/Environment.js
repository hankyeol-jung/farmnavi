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
import {
  faCaretDown,
  faCaretUp,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import useInterval from "../useinterval";

const userUrl =
  "https://raw.githubusercontent.com/hankyeol-jung/farmnavi/main/src/json/user-information.json";

function Environment(tab) {
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

  let [guidedState, setGuidedState] = useState(0);

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

  let sessionLog = sessionStorage.getItem("log");
  sessionLog = JSON.parse(sessionLog);

  let navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (
        sessionLog.userId == undefined &&
        sessionLog.userPassword == undefined
      ) {
        navigate("/login");
      }
    }, [100]);
  }, [tab]);

  let scoreLength = result.data && data().environment.score.length;

  let [scoreIndex, setScoreIndex] = useState(0);
  useInterval(() => {
    setScoreIndex(scoreIndex + 1);
    if (scoreIndex >= scoreLength - 1) setScoreIndex(0);
  }, 60000);

  return (
    <div className={"transition duration-[800ms] start " + fade}>
      <div className="absolute z-40 top-0 left-0 flex items-center justify-between w-full h-[6.625rem] border-b px-11 border-b-neutral-300">
        <div className="flex items-center">
          <p className="mr-6 text-4xl font-bold text-black ">
            {result.data && data().name}님 농장 {result.data && data().farm}
          </p>
          <span className="px-5 py-1 text-xl font-bold text-black bg-[#ffc107] rounded-full mr-3">
            내부가 조금 건조해요
          </span>
          <span className="px-5 py-1 text-xl font-bold border-2 border-[#DC3545] text-[#DC3545] rounded-full">
            <FontAwesomeIcon icon={faFire} className="mr-2" />
            최근 3일 열대야 발생
          </span>
        </div>
        <div className="flex items-end">
          <p className=" text-[1.75rem] font-medium mr-5 text-neutral-500 pb-1 ">
            오늘의 환경점수
          </p>
          <p className=" text-[2rem] font-medium text-black ">
            <small className="mr-2 text-2xl font-medium text-neutral-500">
              현재
            </small>
            <b className=" text-[2.5rem] font-bold text-[#28a745]">
              {result.data && data().environment.score[scoreIndex]}
            </b>
            점
          </p>
        </div>
      </div>

      <div className="z-30 absolute top-0 w-full h-[3.75rem] bg-gradient-to-b to-[#ffffff05] from-white mt-[6.25rem]"></div>

      <div
        className="absolute bottom-[3.75rem] w-full h-[calc(100%_-_6.625rem_-_3.75rem)] overflow-scroll scroll-smooth"
        ref={scrollRef}
        onScroll={() => {
          reveal();
        }}
      >
        <div className="absolute w-full pt-8 px-11 text-neutral-400">
          <div className="transition duration-1000 reveal">
            <div className="flex items-center justify-between h-[9.5rem] mb-6 ">
              <TemperatureHumidity
                borderColor="border-[#FEC104]"
                nowTemperature={
                  result.data &&
                  data().environment.temperatureHumidity.today.temperatureay
                } //현재온도
                nowHumidity={
                  result.data &&
                  data().environment.temperatureHumidity.today.humidity
                } //현재습도
                suggestionTemperature={
                  result.data &&
                  data().environment.temperatureHumidity.suggestion
                    .temperatureay
                } //추천온도
                suggestionHumidity={
                  result.data &&
                  data().environment.temperatureHumidity.suggestion.humidity
                } //추천습도
              ></TemperatureHumidity>
              <SuitableTranspiration
                title="적합한 증산 진입 예상"
                accumulate=""
                today={
                  result.data && data().environment.anticipationOfEntry + " 후"
                }
                tomorow=""
                width="w-[20rem]"
                margin="mx-6"
              />
              <SuitableTranspiration
                title="적합한 증산활동 시간"
                accumulate={
                  "오늘 누적 " +
                  (result.data && data().environment.activityTime.accumulate)
                }
                today={
                  "오늘 " +
                  (result.data && data().environment.activityTime.today) +
                  " 예측"
                }
                tomorow={
                  "내일 " +
                  (result.data && data().environment.activityTime.today) +
                  " 예측"
                }
                width="w-[30rem]"
              />
            </div>
          </div>

          <div className="transition duration-1000 reveal ">
            <div className="w-full px-6 py-4 mb-6 border rounded-xl border-neutral-400 ">
              <SuggestionBarChart
                timeValue={timeValue}
                result={result}
                data={data}
              />
            </div>
          </div>
          <div className="transition duration-1000 reveal">
            <div className=" mb-6 after:absolute after:w-px after:h-[5.625rem] after:bg-gray-400 after:left-2/3 after:top-1/2 after:-translate-y-1/2 before:absolute before:w-px before:h-[5.625rem] before:bg-gray-400 before:left-1/3 before:top-1/2 before:-translate-y-1/2 relative grid grid-cols-3 gap-10 w-full border rounded-xl border-neutral-400 px-6 py-4">
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
              <div className=" z-10 before:-z-10 before:absolute before:w-full before:h-px before:top-[calc(50%_+_0.3125rem)] before:-translate-y-1/2 before:bg-neutral-400 h-[15rem] w-full relative">
                <p className=" -z-10 absolute top-[calc(50%_-_1.25rem)] text-neutral-500 text-base">
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
          <div
            className={
              `${guidedState == 2 ? "h-[3.75rem] mb-6" : "h-0"}` +
              " relative w-full overflow-hidden transition-all duration-500"
            }
          >
            <div
              className={
                "py-3 h-[3.75rem] border-neutral-400 border flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-full overflow-hidden transition-all duration-1000 reveal rounded-xl "
              }
            >
              <p className="text-2xl font-bold text-black">
                초세가 강하고, 영양생장이 예측됩니다.
              </p>
              <span
                className="bg-[#DC3545] w-10 h-10 rounded-full text-white text-4xl mr-3 ml-6 text-center font-bold cursor-pointer"
                onClick={() => {
                  setGuidedState(0);
                }}
              >
                !
              </span>
              <p className="text-2xl font-bold text-black">클릭해주세요. </p>
            </div>
          </div>
          <div className="transition duration-1000 reveal h-[20.25rem] flex justify-between items-center mb-6">
            <div
              className={
                `${
                  guidedState == 2
                    ? "w-[calc(50%_-_0.75rem)]"
                    : "w-[calc(30%_-_1.5rem)]"
                }` +
                " transition-all duration-300 before:absolute before:w-[0.125rem] before:h-[80%] before:top-1/2 before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/2 before:bg-neutral-400 relative border rounded-xl border-neutral-400 h-full grid grid-cols-2 py-5"
              }
            >
              <div className="flex flex-col items-center justify-end">
                <div className="w-full">
                  <span className="block bg-[#2EABE2] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#2EABE2] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#2EABE2] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#2EABE2] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#2EABE2] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#2EABE2] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#2EABE2] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#2EABE2] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#2EABE2] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#2EABE2] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#2EABE2] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                </div>
                <p className="text-xl font-medium text-neutral-500">
                  초세 약함
                </p>
                <p className="text-2xl font-medium text-neutral-800">
                  <b className="font-bold text-[2rem] text-[#2EABE2]">11</b> /
                  20
                </p>
              </div>
              <div className="flex flex-col items-center justify-end">
                <div className="w-full">
                  <span className="block bg-[#2EABE2] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#2EABE2] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#2EABE2] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#2EABE2] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#2EABE2] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#2EABE2] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#2EABE2] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#2EABE2] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#2EABE2] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                </div>
                <p className="text-xl font-medium text-neutral-500">
                  초세 강함
                </p>
                <p className="text-2xl font-medium text-neutral-800">
                  <b className="font-bold text-[2rem] text-[#2EABE2]">9</b> / 20
                </p>
              </div>
            </div>

            <div
              className={
                `${
                  guidedState == 2
                    ? "h-0 w-0 opacity-0 scale-0"
                    : "h-full w-[40%] opacity-100"
                }` + " transition-all duration-500 overflow-hidden"
              }
            >
              <div className="flex items-center justify-center w-full h-full px-8 border rounded-xl border-neutral-400 ">
                {guidedState == 0 ? (
                  <div className="">
                    <p className="font-bold text-[1.75rem] text-black mb-10 text-center">
                      초세가 강하고, 영양생장이 예측됩니다.
                      <br /> 생식생장으로 유도 하시겠습니까?
                    </p>
                    <div className="flex items-center justify-center">
                      <span
                        className="w-[10rem] h-[3.75rem] bg-[#0B7BFF] flex justify-center items-center rounded-xl text-white text-2xl font-bold mx-2"
                        onClick={() => {
                          setGuidedState(1);
                        }}
                      >
                        예
                      </span>
                      <span
                        className="w-[10rem] h-[3.75rem] bg-[#0B7BFF] flex justify-center items-center rounded-xl text-white text-2xl font-bold mx-2"
                        onClick={() => {
                          setGuidedState(2);
                        }}
                      >
                        아니요
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="">
                    <p className="font-bold text-[1.75rem] text-black mb-10 text-center">
                      생식생장으로 유도중 입니다.
                    </p>
                    <div className="flex items-center justify-center">
                      <div className="z-50 flex items-center justify-center transition-all">
                        <svg
                          className="spinner"
                          width="4.0625rem"
                          height="4.0625rem"
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
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div
              className={
                `${
                  guidedState == 2
                    ? "w-[calc(50%_-_0.75rem)]"
                    : "w-[calc(30%_-_1.5rem)]"
                }` +
                " transition-all duration-300 before:absolute before:w-[0.125rem] before:h-[80%] before:top-1/2 before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/2 before:bg-neutral-400 relative border rounded-xl border-neutral-400 h-full grid grid-cols-2 py-5"
              }
            >
              <div className="flex flex-col items-center justify-end">
                <div className="w-full">
                  <span className="block bg-[#95C121] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#95C121] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#95C121] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#95C121] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#95C121] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#95C121] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#95C121] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#95C121] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#95C121] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#95C121] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#95C121] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#95C121] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#95C121] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#95C121] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#95C121] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                </div>
                <p className="text-xl font-medium text-neutral-500">
                  영양 생장
                </p>
                <p className="text-2xl font-medium text-neutral-800">
                  <b className="font-bold text-[2rem] text-[#95C121]">15</b> /
                  20
                </p>
              </div>
              <div className="flex flex-col items-center justify-end">
                <div className="w-full">
                  <span className="block bg-[#95C121] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#95C121] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#95C121] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#95C121] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                  <span className="block bg-[#95C121] h-[0.5625rem] w-[70%] mb-[0.125rem] mx-auto"></span>
                </div>
                <p className="text-xl font-medium text-neutral-500">
                  생식 생장
                </p>
                <p className="text-2xl font-medium text-neutral-800">
                  <b className="font-bold text-[2rem] text-[#95C121]">5</b> / 20
                </p>
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

      <div className="z-30 absolute bottom-0 w-full h-[3.75rem] bg-gradient-to-t to-[#ffffff05] from-white mb-[3.75rem]"></div>
      {/* 스크롤무브 버튼 */}
      <div className=" z-30 bottom-0 absolute w-full h-[3.75rem] bg-white text-center flex justify-center items-center">
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

  let labelsLabel = temperatureGraphData.map((l) => {
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
    <div className=" flex items-center h-[18.75rem] justify-between w-full p-6 mb-6 border rounded-xl border-neutral-400 ">
      <div className="w-[20.875rem] h-full flex flex-col justify-between mr-5">
        <div>
          <p className="text-xl font-bold text-neutral-500">{props.title}</p>
        </div>
        <div className="px-10 bg-[#2EABE2] w-full h-[9.5rem] text-white text-2xl font-bold rounded-2xl flex justify-center items-center text-center">
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
                  className="before:last:w-0 relative before:w-px before:right-0 before:top-1/2 before:-translate-y-1/2 before:absolute before:h-[9.375rem] before:bg-neutral-400 h-full"
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
          props.recommendState == props.functionValue
            ? "bg-[#2EABE2] text-white font-bold"
            : "bg-slate-200 text-black font-medium"
        }`
      }
      onClick={() => {
        props.setRecommendState(props.functionValue);
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
  let userData = sessionStorage.getItem("userData");
  userData = JSON.parse(userData);

  // 배열 총 개수
  // let maxValue =
  //   props.result.data &&
  //   props.data().environment.temperatureHumidityGraph.length;
  let maxValue = userData.environment.temperatureHumidityGraph.length;

  useEffect(() => {
    for (let i = 0; i < maxValue; i++) {
      let graphData = userData.environment.temperatureHumidityGraph;
      let date = new Date(graphData[i].x);

      let hour = date.getHours(); // 시, 10
      let min = date.getMinutes(); // 분, 35

      date = hour + ":" + min;

      graphData[i].x = date;
    }
  }, [userData]);

  let totalTimeData = [];
  let todayTimeData = [];
  let tomorowTimeData = [];

  let [dataValue, setDataValue] = useState();

  function totalTimeDivision() {
    for (let i = 0; i < maxValue; i++) {
      totalTimeData.push(userData.environment.temperatureHumidityGraph[i]);

      let date = new Date(totalTimeData[i].x);

      let hour = date.getHours(); // 시, 10
      let min = date.getMinutes(); // 분, 35

      date = hour + ":" + min;

      totalTimeData[i].x = date;
    }
  }
  totalTimeDivision();

  let aaa = [
    { id: "2023-02-14 00:00", x: "123" },
    { id: "2023-02-14 01:00", x: "1233" },
    { id: "2023-02-14 02:00", x: "1235" },
  ];

  function todayTimeDivision() {
    for (let i = 0; i < maxValue / 2; i++) {
      todayTimeData.push(userData.environment.temperatureHumidityGraph[i]);
    }
  }
  todayTimeDivision();
  function tomorowTimeDivision() {
    for (let i = maxValue / 2; i < maxValue; i++) {
      i = i.toFixed();
      tomorowTimeData.push(userData.environment.temperatureHumidityGraph[i]);
    }
  }

  tomorowTimeDivision();

  let recommendTest;

  let [recommendState, setRecommendState] = useState(1);

  if (recommendState == 0) {
    recommendTest = totalTimeData;
  } else if (recommendState == 1) {
    recommendTest = todayTimeData;
  } else if (recommendState == 2) {
    recommendTest = tomorowTimeData;
  }

  let recommendColor =
    props.result.data &&
    props.data().environment.temperatureHumidityGraph.map((recommend, i) => {
      const { x, ...copy } = recommend;
      if (0 <= copy.y && copy.y < 1.1) {
        return "#0270C0";
      } else if (1.1 <= copy.y && copy.y < 2.8) {
        return "#00B0F0";
      } else if (2.8 <= copy.y && copy.y < 6) {
        return "#92D050";
      } else if (6 <= copy.y && copy.y < 11) {
        return "#FFFE04";
      } else if (11 <= copy.y && copy.y < 15) {
        return "#F79646";
      } else if (15 <= copy.y) {
        return "#FF0201";
      }
    });

  let dataLabels = recommendTest.map((a) => {
    return a.x;
  });
  const data = {
    labels: dataLabels,
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
  return (
    <>
      <div className="grid grid-cols-3 gap-5 mb-5">
        <TimeViewButton
          functionValue={1}
          setRecommendState={setRecommendState}
          recommendState={recommendState}
          title={"오늘보기"}
        />
        <TimeViewButton
          functionValue={2}
          setRecommendState={setRecommendState}
          recommendState={recommendState}
          title={"내일보기"}
        />
        <TimeViewButton
          functionValue={0}
          setRecommendState={setRecommendState}
          recommendState={recommendState}
          title={"모두보기"}
        />
      </div>
      <div className="h-[18.75rem] w-full relative ">
        <div
          className={
            "absolute w-[calc(100%_/_" +
            `${todayTimeData.length}` +
            "_*_360)] h-[85%] bg-[#dddddd50] left-[1.7rem] top-[0.5rem] before:absolute before:w-px before:h-full before:bg-neutral-600 before:right-0"
          }
        >
          <div className="text-base font-medium bg-white text-neutral-800 w-[70px] rounded-lg border border-neutral-600 text-center absolute right-0 translate-x-1/2">
            <p>일출</p>
            <p>06:00</p>
          </div>
        </div>
        <Bar data={data} options={options} />
        <div
          className={
            "absolute w-[calc(100%_/_" +
            `${todayTimeData.length}` +
            "_*_360)] h-[85%] bg-[#dddddd50] right-[0.7rem] top-[0.5rem] before:absolute before:w-px before:h-full before:bg-neutral-600 before:left-0"
          }
        >
          <div className="text-base font-medium bg-white text-neutral-800 w-[70px] rounded-lg border border-neutral-600 text-center absolute left-0 -translate-x-1/2">
            <p>일몰</p>
            <p>18:00</p>
          </div>
        </div>
      </div>
    </>
  );
}

// 관수 & 환기 & 진입 권장 컴포넌트
function Suggestion(props) {
  return (
    <div className="flex flex-col justify-between w-full h-full px-10 mx-auto">
      <p className="text-xl font-medium text-neutral-500">{props.title}</p>
      <div>
        <p className="mt-4 mb-1 text-2xl font-medium text-black">
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
        "px-6 py-4 border-4 rounded-xl h-full grid grid-cols-6  w-[40%] " +
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
      <div className="flex flex-col justify-between col-span-3">
        <span className="text-lg font-bold text-black bg-[#FFC107] flex items-center justify-center w-1/3 rounded-full ">
          추천
        </span>
        <div className="flex items-center justify-between bg-[#FFC107] px-3 rounded-full">
          <p className="text-xl font-medium text-neutral-700 ">온도</p>
          <p className="text-2xl font-bold text-black ">
            {props.suggestionTemperature}°C
          </p>
        </div>
        <div className="flex items-center justify-between bg-[#FFC107] px-3 rounded-full">
          <p className="text-xl font-medium text-neutral-700 ">습도</p>
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
      <div className="flex flex-wrap justify-between">
        <p className="text-xl font-medium text-neutral-700">{props.title}</p>
        {props.accumulate != "" ? (
          <p className="text-lg font-bold text-right text-neutral-500">
            ({props.accumulate})
          </p>
        ) : null}
      </div>
      <div>
        <p
          className={
            `${props.tomorow == "" ? "text-4xl" : "text-3xl"}` +
            " font-bold text-right text-black "
          }
        >
          {props.today}
        </p>
        {props.tomorow != "" ? (
          <p className="mt-2 text-2xl font-bold text-right text-white">
            <span className=" bg-[#2EABE2] rounded-full px-4 py-1">
              {props.tomorow}
            </span>
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default Environment;
