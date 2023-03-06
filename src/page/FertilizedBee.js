import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";
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
import { Chart } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";
import { useQuery } from "react-query";
import BeeData from "../json/bee.json";
import BeeData2 from "../json/bee2.json";
import UserInfo from "../json/user-information.json";
import farmMedia from "../media/팜커넥트_수정벌_AI인식모니터링영상.mp4";

function FertilizedBee() {
  let userUrl =
    "https://raw.githubusercontent.com/hankyeol-jung/farmnavi/main/src/json/user-information.json";

  let sessionLog = sessionStorage.getItem("log");
  sessionLog = JSON.parse(sessionLog);

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

  let scrollRef = useRef(0);

  let scrollRefUp = () => {
    scrollRef.current.scrollTop = scrollRef.current.scrollTop - 200;
  };
  let scrollRefDown = () => {
    scrollRef.current.scrollTop = scrollRef.current.scrollTop + 200;
  };

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

  let [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 500);
    return () => {
      setLoader(true);
    };
  }, []);

  return (
    <div
      className={
        "relative w-full h-full transition duration-[800ms] start " + fade
      }
    >
      <div className="absolute z-40 top-0 left-0 flex items-center justify-between w-full h-[6.625rem] border-b px-11 border-b-neutral-300">
        <div className="flex items-center">
          <p className="mr-6 text-4xl font-bold text-black ">홍길동 농장 A동</p>
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
        <div className="absolute w-full pt-8 px-11">
          <div className="transition duration-1000 reveal">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="grid grid-cols-2 grid-rows-2 gap-6">
                <BeeInOut
                  title="현재 수정벌 OUT 횟수"
                  today={result.data && data().fertilizedBee.beeOut.today}
                  yesterday={
                    result.data && data().fertilizedBee.beeOut.yesterday
                  }
                />
                <BeeInOut
                  title="현재 수정벌 IN 횟수"
                  today={result.data && data().fertilizedBee.beeIn.today}
                  yesterday={
                    result.data && data().fertilizedBee.beeIn.yesterday
                  }
                />
                <BeeInOut
                  title="비정상 활동 벌"
                  today={result.data && data().fertilizedBee.unusual.today}
                  yesterday={
                    result.data && data().fertilizedBee.unusual.yesterday
                  }
                />
                <Flowerpot
                  title="화분 분석(화분양 많음/적음)"
                  todayFirst={
                    result.data && data().fertilizedBee.flowerpot.today.first
                  }
                  todayLast={
                    result.data && data().fertilizedBee.flowerpot.today.last
                  }
                  yesterdayFirst={
                    result.data &&
                    data().fertilizedBee.flowerpot.yesterday.first
                  }
                  yesterdayLast={
                    result.data && data().fertilizedBee.flowerpot.yesterday.last
                  }
                />
              </div>
              <div className="overflow-hidden bg-white border rounded-xl border-neutral-400">
                <iframe
                  src={farmMedia}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
            </div>
          </div>
          <div className="transition duration-1000 reveal">
            <Beegraph data={data} result={result} />
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

// 증산량 그래프 컴포넌트
function Beegraph(props) {
  let graphData = UserInfo[0].environment.temperatureHumidityGraph;

  let totalTimeData = graphData.map((a, i) => {
    return a;
  });

  let todayTimeData = [];
  let tomorowTimeData = [];
  let todayTimeDataBee = [];
  let tomorowTimeDataBee = [];
  let todayTimeDataBee2 = [];
  let tomorowTimeDataBee2 = [];

  function todayTimeDivision() {
    for (let i = 0; i < graphData.length / 2; i++) {
      todayTimeData.push(graphData[i]);
    }
  }
  function tomorowTimeDivision() {
    for (let i = graphData.length / 2; i < graphData.length; i++) {
      i = i.toFixed();
      tomorowTimeData.push(graphData[i]);
    }
  }

  function todayTimeDivisionBee() {
    for (let i = 0; i < BeeData.length / 2; i++) {
      todayTimeDataBee.push(BeeData[i]);
    }
  }
  function tomorowTimeDivisionBee() {
    for (let i = BeeData.length / 2; i < BeeData.length; i++) {
      tomorowTimeDataBee.push(BeeData[i]);
    }
  }
  function todayTimeDivisionBee2() {
    for (let i = 0; i < BeeData2.length / 2; i++) {
      todayTimeDataBee2.push(BeeData2[i]);
    }
  }
  function tomorowTimeDivisionBee2() {
    for (let i = BeeData2.length / 2; i < BeeData2.length; i++) {
      tomorowTimeDataBee2.push(BeeData2[i]);
    }
  }

  todayTimeDivisionBee();
  tomorowTimeDivisionBee();

  todayTimeDivisionBee2();
  tomorowTimeDivisionBee2();

  todayTimeDivision();
  tomorowTimeDivision();

  let recommendTest;
  let beeTest;
  let beeTest2;

  let [recommendState, setRecommendState] = useState(1);

  if (recommendState == 0) {
    recommendTest = totalTimeData;
    beeTest = BeeData;
    beeTest2 = BeeData2;
  } else if (recommendState == 1) {
    recommendTest = todayTimeData;
    beeTest = todayTimeDataBee;
    beeTest2 = todayTimeDataBee2;
  } else if (recommendState == 2) {
    recommendTest = tomorowTimeData;
    beeTest = tomorowTimeDataBee;
    beeTest2 = tomorowTimeDataBee2;
  }

  const sampledData = [];
  const step = 60;
  for (let i = 0; i < recommendTest.length; i += step) {
    sampledData.push(recommendTest[i]);
  }

  const data = {
    datasets: [
      {
        type: "line",
        label: "hd",
        borderColor: "#2FAAE1",
        borderWidth: 3,
        data: sampledData,
        yAxisID: "y_sub",
        pointRadius: 0,
        lineTension: 0.2,
      },
      {
        type: "bar",
        label: "나가는 벌",
        backgroundColor: "#E0A800",
        data: beeTest2,
        borderColor: "#E0A800",
        borderWidth: 2,
      },
      {
        type: "bar",
        label: "들어오는 벌",
        backgroundColor: "#FFC107",
        data: beeTest,
        borderColor: "#FFC107",
        borderWidth: 2,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    spanGaps: true,
    maxBarThickness: 30,
    grouped: true,
    interaction: {
      mode: "index",
    },
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          padding: 10,
          font: {
            family: "'Noto Sans KR', 'serif'",
            lineHeight: 1,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(124, 35, 35, 0.4)",
        padding: 10,
        bodySpacing: 5,
        bodyFont: {
          font: {
            family: "'Noto Sans KR', sans-serif",
          },
        },
        usePointStyle: true,
        filter: (item) => item.parsed.y !== null,
        callbacks: {
          title: (context) => context[0].label,
          label: (context) => {
            let label = context.dataset.label + "" || "";

            return context.parsed.y !== null
              ? label + ": " + context.parsed.y
              : null;
          },
        },
      },
    },
    scales: {
      x: {
        afterTickToLabelConversion: function (scaleInstance) {
          const ticks = scaleInstance.ticks;

          const newTicks = ticks.map((tick) => {
            let timeTick = new Date(tick.label);
            let hour = timeTick.getHours(); // 시, 10
            let min = timeTick.getMinutes(); // 분, 35

            timeTick = hour + ":" + min;

            return {
              ...tick,
              label: timeTick,
            };
          });

          scaleInstance.ticks = newTicks;
        },
        grid: {
          display: false,
          drawTicks: true,
          tickLength: 4,
          color: "#E2E2E230",
        },
        axis: "x",
        position: "bottom",
        ticks: {
          minRotation: 45,
          padding: 5,
        },
        stacked: true,
      },
      y: {
        type: "linear",
        grid: {
          color: "#E2E2E230",
        },
        axis: "y",
        display: true,
        position: "left",
        title: {
          display: true,
          align: "end",
          color: "#808080",
          font: {
            size: 12,
            family: "'Noto Sans KR', sans-serif",
            weight: 300,
          },
          // text: "단위: 배",
        },
        ticks: {
          beginAtZero: true, // 0부터 시작하게 합니다.
          stepSize: 20, // 20 씩 증가하도록 설정합니다.
        },
        stacked: true,
      },
      y_sub: {
        position: "right",
        title: {
          display: true,
          align: "end",
          color: "#808080",
          font: {
            size: 12,
            family: "'Noto Sans KR', sans-serif",
            weight: 300,
          },
          // text: "단위: 배",
        },
        max: 15,
        min: 0,
        ticks: {
          beginAtZero: true, // 0부터 시작하게 합니다.
          stepSize: 0.5, // 10 씩 증가하도록 설정합니다.
        },
        stacked: true,
      },
    },
  };

  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  let thisClick = (a) => {
    setRecommendState(a);
  };

  return (
    <div className="px-10 pt-6 mb-6 bg-white border pb-9 rounded-xl border-neutral-400">
      <div className="flex items-center justify-between mb-5">
        <p className="text-2xl font-bold text-neutral-500">
          시간대별 벌 활동추적
        </p>
        <div className="flex items-center justify-center">
          <TimeViewButton
            functionValue={1}
            title={"오늘보기"}
            thisClick={thisClick}
            recommendState={recommendState}
          />
          <TimeViewButton
            functionValue={2}
            title={"내일보기"}
            thisClick={thisClick}
            recommendState={recommendState}
          />
          <TimeViewButton
            functionValue={0}
            title={"모두보기"}
            thisClick={thisClick}
            recommendState={recommendState}
          />
        </div>
      </div>
      <div className="h-[300px]">
        <Chart type="line" data={data} options={options} className="" />
      </div>
    </div>
  );
}

// 1분&10분&1시간 간격 보기 버튼
function TimeViewButton(props) {
  return (
    <span
      className={
        "px-10 py-2 text-xl text-center rounded-full cursor-pointer transition ml-3 " +
        `${
          props.recommendState == props.functionValue
            ? "bg-[#2EABE2] text-white font-bold"
            : "bg-slate-200 text-black font-medium"
        }`
      }
      onClick={() => {
        props.thisClick(props.functionValue);
      }}
    >
      {props.title}
    </span>
  );
}

// 배지 편차 컴포넌트
function BeeInOut(props) {
  return (
    <div className="flex flex-col justify-between px-6 py-4 bg-white border rounded-xl border-neutral-400 h-[10rem]">
      <div>
        <p className="text-xl font-medium text-neutral-500">{props.title}</p>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-right text-[1.75rem] font-bold">
          <small className="text-xl font-bold">오늘 누적</small> {props.today}회
        </p>
        <p className="text-right text-[1.75rem] font-bold">
          <small className="ml-2 text-xl font-medium text-neutral-500">
            (어제 누적 {props.yesterday}회)
          </small>
        </p>
      </div>
    </div>
  );
}
// 배지 편차 컴포넌트
function Flowerpot(props) {
  return (
    <div className="flex flex-col justify-between px-6 py-4 bg-white border rounded-xl border-neutral-400 h-[10rem]">
      <div>
        <p className="text-xl font-medium text-neutral-500">{props.title}</p>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-right text-[1.75rem] font-bold">
          <small className="text-xl font-bold">오늘 </small> {props.todayFirst}
          회 / {props.todayLast}회
        </p>
        <p className="text-right text-[1.75rem] font-bold">
          <small className="ml-2 text-xl font-medium text-neutral-500">
            (어제 {props.yesterdayFirst}회 / {props.yesterdayLast}회)
          </small>
        </p>
      </div>
    </div>
  );
}

export default FertilizedBee;
