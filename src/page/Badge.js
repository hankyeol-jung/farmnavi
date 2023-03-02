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
import { Line, Bar } from "react-chartjs-2";
import axios from "axios";
import { useQuery } from "react-query";

let supplywaterTimeData = [
  {
    first: "10:32",
    last: "10:37",
    supplywater: "100",
    drainage: "0",
    text: "아주적은증산, 배액 0%",
  },
  {
    first: "11:32",
    last: "11:37",
    supplywater: "100",
    drainage: "0",
    text: "적은증산, 배액 5% 진행 중",
  },
  {
    first: "12:32",
    last: "12:37",
    supplywater: "100",
    drainage: "0",
    text: "적은증산, 배액 25% 진행 중",
  },
  {
    first: "13:32",
    last: "13:37",
    supplywater: "100",
    drainage: "0",
    text: "적은증산, 배액 45% 진행 중",
  },
];
let badgeWeightData = [
  { time: "08:00", value: 58 },
  { time: "09:00", value: 38 },
  { time: "10:00", value: 28 },
  { time: "11:00", value: 58 },
  { time: "12:00", value: 48 },
  { time: "13:00", value: 38 },
  { time: "14:00", value: 68 },
  { time: "15:00", value: 48 },
];
let ecChangeGraph = [
  { time: "08:00", value: 58 },
  { time: "09:00", value: 38 },
  { time: "10:00", value: 28 },
  { time: "11:00", value: 58 },
  { time: "12:00", value: 48 },
  { time: "13:00", value: 38 },
  { time: "14:00", value: 68 },
  { time: "15:00", value: 48 },
];
let moistureContentData = [
  { time: "9/27", value: 38 },
  { time: "9/28", value: 68 },
  { time: "9/29", value: 28 },
  { time: "9/30", value: 78 },
  { time: "10/1", value: 68 },
  { time: "10/2 예측", value: 48 },
];
const userUrl =
  "https://raw.githubusercontent.com/hankyeol-jung/farmnavi/main/src/json/user-information.json";

function Badge() {
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
            <div className="grid grid-cols-3 gap-6 mb-6">
              <SupplyDrainage
                title="급액 시각"
                todayFirst={result.data && data().badge.supplyWater.today.first}
                todayLast={result.data && data().badge.supplyWater.today.last}
                yesterdayFirst={
                  result.data && data().badge.supplyWater.yesterday.first
                }
                yesterdayLast={
                  result.data && data().badge.supplyWater.yesterday.last
                }
              />
              <SupplyDrainage
                title="배액 시각"
                todayFirst={result.data && data().badge.Drainage.today.first}
                todayLast={result.data && data().badge.Drainage.today.last}
                yesterdayFirst={
                  result.data && data().badge.Drainage.yesterday.first
                }
                yesterdayLast={
                  result.data && data().badge.Drainage.yesterday.last
                }
              />
              <Light
                todayFirst={result.data && data().badge.light.today.first}
                todayLast={result.data && data().badge.light.today.last}
                yesterdayFirst={
                  result.data && data().badge.light.yesterday.first
                }
                yesterdayLast={result.data && data().badge.light.yesterday.last}
              />
            </div>
          </div>
          <div className="transition duration-1000 reveal">
            <div className="grid grid-cols-3 gap-6 mb-6">
              <TotalSupplyTime
                title="총 급액양/횟수"
                todayAmount={
                  result.data && data().badge.supplyWater.today.amount
                }
                todayNum={result.data && data().badge.supplyWater.today.num}
                yesterdayAmount={
                  result.data && data().badge.supplyWater.yesterday.amount
                }
                yesterdayNum={
                  result.data && data().badge.supplyWater.yesterday.num
                }
              />
              <TotalSupplyTime
                title="총 배액양(배액율)"
                todayAmount={result.data && data().badge.Drainage.today.amount}
                todayNum={result.data && data().badge.Drainage.today.num}
                yesterdayAmount={
                  result.data && data().badge.Drainage.yesterday.amount
                }
                yesterdayNum={
                  result.data && data().badge.Drainage.yesterday.num
                }
              />
              <TotalLightTime
                title="배지 편차(전날마지막급액시-일출)"
                today={result.data && data().badge.difference.today}
                yesterday={result.data && data().badge.difference.yesterday}
              />
            </div>
          </div>

          <div className="transition duration-1000 reveal">
            <HDgraph data={data} result={result} />
          </div>

          <div className="transition duration-1000 reveal">
            <SupplywaterTime />
          </div>

          <div className="transition duration-1000 reveal">
            <BadgeWeightGraph
              title="실시간 배지 무게 그래프"
              advice={"오늘 증산량 추정 현재 200ml (어제 총 1200ml 추정)"}
              badgeGraphData={badgeWeightData}
            />
          </div>
          <div className="transition duration-1000 reveal">
            <ECchangeGraph
              title="작물 섭취 EC 변화"
              advice={"현재 작물 섭취 EC 3.0"}
              badgeGraphData={ecChangeGraph}
            />
          </div>
          <div className="transition duration-1000 reveal">
            <MoistureContentGraph
              title="최근 1주일 최저 배지 수분함수율 추이"
              today={"어제 대비 3% 감소, 1주일 대비 7% 감소"}
              tomorow={"내일 5% 감소 예측, 1주일 대비 9% 감소 예측"}
              badgeGraphData={moistureContentData}
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

// 증산량 그래프 컴포넌트
function HDgraph(props) {
  let totalTimeData =
    props.result.data &&
    props.data().environment.temperatureHumidityGraph.map((a, i) => {
      return a;
    });

  let todayTimeData = [];
  let tomorowTimeData = [];

  function todayTimeDivision() {
    for (
      let i = 0;
      i < props.data().environment.temperatureHumidityGraph.length / 2;
      i++
    ) {
      todayTimeData.push(props.data().environment.temperatureHumidityGraph[i]);
    }
  }
  function tomorowTimeDivision() {
    for (
      let i = props.data().environment.temperatureHumidityGraph.length / 2;
      i < props.data().environment.temperatureHumidityGraph.length;
      i++
    ) {
      i = i.toFixed();
      tomorowTimeData.push(
        props.data().environment.temperatureHumidityGraph[i]
      );
    }
  }

  props.result.data && todayTimeDivision();
  props.result.data && tomorowTimeDivision();

  let recommendTest;

  let [recommendState, setRecommendState] = useState(1);

  if (recommendState == 0) {
    recommendTest = totalTimeData;
  } else if (recommendState == 1) {
    recommendTest = todayTimeData;
  } else if (recommendState == 2) {
    recommendTest = tomorowTimeData;
  }

  const data = {
    datasets: [
      {
        type: "line",
        label: "hd",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 1,
        data: recommendTest,
        yAxisID: "y_sub",
        pointRadius: 0,
        lineTension: 0,
      },
      {
        type: "bar",
        label: "증산",
        backgroundColor: "rgb(255, 99, 132)",
        data: recommendTest,
        borderColor: "red",
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
        max: 120,
        min: 0,
        ticks: {
          beginAtZero: true, // 0부터 시작하게 합니다.
          stepSize: 20, // 20 씩 증가하도록 설정합니다.
        },
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
      },
    },
  };

  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

  return (
    <div className="px-10 pt-6 mb-6 bg-white border pb-9 rounded-xl border-neutral-400">
      <p className="mb-5 text-2xl font-bold text-neutral-500">증산량 그래프</p>
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
      <div className="h-[300px]">
        <Line type="line" data={data} options={options} className="" />
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

// 최근 1주일 최저 배지 수분함수율 추이 컴포넌트
function MoistureContentGraph(props) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  let badgeGraphData = props.badgeGraphData;

  let graphData = badgeGraphData.map((l, i) => {
    return l.value;
  });

  let labelsLabel = badgeGraphData.map((l, i) => {
    return l.time;
  });

  const options = {
    elements: {
      point: {
        hoverRadius: 10, // 클릭하면 hover 애니메이션을 제거할 반지름 값 설정
        hitRadius: 10, // 클릭 가능한 반지름 값 설정
        hoverBackgroundColor: "#ffffff",
        hoverBorderWidth: 3,
      },
    },
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
    <div className=" flex items-center h-[18.75rem] justify-between w-full p-6 mb-6 border rounded-xl border-neutral-400">
      <div className="w-[20.875rem] h-full flex flex-col justify-between mr-5">
        <div>
          <p className="text-xl font-bold text-neutral-500">{props.title}</p>
        </div>
        <div>
          <div className=" px-16 py-4 bg-[#2EABE2] mt-3 w-full text-white text-xl font-bold rounded-2xl flex justify-center items-center text-center">
            <p className=" break-keep">{props.today}</p>
          </div>
          <div className=" px-16 py-4 bg-[#2EABE2] mt-3 w-full text-white text-xl font-bold rounded-2xl flex justify-center items-center text-center">
            <p className=" break-keep">{props.tomorow}</p>
          </div>
        </div>
      </div>
      <div className="z-10 w-[70%] h-full bg-[#31ABE220] rounded-2xl relative">
        <div className="absolute flex flex-col justify-between w-full h-full py-3 text-base font-medium -z-10 text-neutral-600 ">
          <div className={"grid h-full grid-cols-6"}>
            {badgeGraphData.map((l, i) => {
              return (
                <div
                  key={i}
                  className="before:last:w-0 relative before:w-px before:right-0 before:top-1/2 before:-translate-y-1/2 before:absolute before:h-[9.375rem] before:bg-neutral-400 h-full"
                >
                  <div className="flex flex-col items-center justify-between h-full">
                    <div></div>
                    <p className="text-center">{l.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full h-full px-[5%] py-12 mx-auto">
          <Line options={options} data={data} />
        </div>
      </div>
    </div>
  );
}

// 작물 섭취 EC 변화 컴포넌트
function ECchangeGraph(props) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  let badgeGraphData = props.badgeGraphData;

  let graphData = badgeGraphData.map((l, i) => {
    return l.value;
  });

  let labelsLabel = badgeGraphData.map((l, i) => {
    return l.time;
  });

  const options = {
    elements: {
      point: {
        hoverRadius: 10, // 클릭하면 hover 애니메이션을 제거할 반지름 값 설정
        hitRadius: 10, // 클릭 가능한 반지름 값 설정
        hoverBackgroundColor: "#ffffff",
        hoverBorderWidth: 3,
      },
    },
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
        <div>
          <div className="px-5 bg-[#2EABE2] w-full h-[4.1875rem] mb-3 text-white text-2xl font-bold rounded-2xl flex justify-center items-center text-center">
            <p className=" break-keep">{props.advice}</p>
          </div>
          <div className="p-4 border-[#2EABE2] border-[0.1875rem] w-full h-[6.875rem] rounded-2xl flex justify-between items-start text-center">
            <p className="text-xl font-bold text-neutral-600 break-keep">
              시뮬레이션
            </p>
            <div className=" w-[60%] flex justify-between flex-col h-full">
              <div className="flex items-center justify-between">
                <p className="text-xl font-medium text-neutral-600">
                  함수량 추천
                </p>
                <p className="text-2xl font-bold text-[#2EABE2]">65%</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xl font-medium text-neutral-600">
                  공급 EC 추천
                </p>
                <p className="text-2xl font-bold text-[#2EABE2]">2.5</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="z-10 w-[70%] h-full bg-[#31ABE220] rounded-2xl relative">
        <div className="absolute flex flex-col justify-between w-full h-full py-3 text-base font-medium -z-10 text-neutral-600 ">
          <div className={"grid h-full grid-cols-" + badgeGraphData.length}>
            {badgeGraphData.map((l, i) => {
              return (
                <div
                  key={i}
                  className="before:last:w-0 relative before:w-px before:right-0 before:top-1/2 before:-translate-y-1/2 before:absolute before:h-[9.375rem] before:bg-neutral-400 h-full"
                >
                  <div className="flex flex-col items-center justify-between h-full">
                    <div></div>
                    <p className="text-center">{l.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full h-full px-[5%] py-12 mx-auto">
          <Line options={options} data={data} />
        </div>
      </div>
    </div>
  );
}

// 실시간 배지 무게 컴포넌트
function BadgeWeightGraph(props) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  let badgeGraphData = props.badgeGraphData;

  let graphData = badgeGraphData.map((l, i) => {
    return l.value;
  });

  let labelsLabel = badgeGraphData.map((l, i) => {
    return l.time;
  });

  const options = {
    elements: {
      point: {
        hoverRadius: 10, // 클릭하면 hover 애니메이션을 제거할 반지름 값 설정
        hitRadius: 10, // 클릭 가능한 반지름 값 설정
        hoverBackgroundColor: "#ffffff",
        hoverBorderWidth: 3,
      },
    },
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
        <div className="px-5 bg-[#2EABE2] w-full h-[9.5rem] text-white text-2xl font-bold rounded-2xl flex justify-center items-center text-center">
          <p className=" break-keep">{props.advice}</p>
        </div>
      </div>
      <div className="z-10 w-[70%] h-full bg-[#31ABE220] rounded-2xl relative">
        <div className="absolute flex flex-col justify-between w-full h-full py-3 text-base font-medium -z-10 text-neutral-600 ">
          <div className={"grid h-full grid-cols-" + badgeGraphData.length}>
            {badgeGraphData.map((l, i) => {
              return (
                <div
                  key={i}
                  className="before:last:w-0 relative before:w-px before:right-0 before:top-1/2 before:-translate-y-1/2 before:absolute before:h-[9.375rem] before:bg-neutral-400 h-full"
                >
                  <div className="flex flex-col items-center justify-between h-full">
                    <div></div>
                    <p className="text-center">{l.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full h-full px-[5%] py-12 mx-auto">
          <Line options={options} data={data} />
        </div>
      </div>
    </div>
  );
}

// 급액 시간 컴포넌트
function SupplywaterTime(props) {
  return (
    <div className="px-10 pt-6 mb-6 bg-white border pb-9 rounded-xl border-neutral-400">
      <div className="flex justify-between mb-6">
        <p className="font-bold text-xl text-[#0069D9] w-[5%]"></p>
        <p className="font-bold text-xl text-[#0069D9] w-[25%] text-center">
          급액 시간
        </p>
        <p className="text-xl font-medium text-neutral-500 w-[10%] text-center">
          급액
        </p>
        <p className="text-xl font-medium text-neutral-500 w-[20%] text-center">
          배액
        </p>
        <p className="text-xl font-medium text-neutral-500 w-[40%] text-center">
          증산환경 및 누적 배액율
        </p>
      </div>
      {supplywaterTimeData.map((s, i) => {
        return (
          <div
            className=" mb-5 last:mb-0 flex justify-between items-center p-3 text-2xl font-medium text-black border-[#2EABE2] border-2 rounded-full"
            key={i}
          >
            <p className="font-bold text-xl w-[5%]">
              <span className="w-10 h-10 bg-[#2EABE2] rounded-full text-white font-medium flex items-center justify-center">
                {i + 1}
              </span>
            </p>
            <p className=" w-[25%] text-center">
              {s.first} ~ {s.last}
            </p>
            <p className=" w-[10%] text-center">{s.supplywater}ml</p>
            <p className=" w-[20%] text-center">{s.drainage}ml</p>
            <p className=" w-[40%] text-center">{s.text}</p>
          </div>
        );
      })}
    </div>
  );
}

// 배지 편차 컴포넌트
function TotalLightTime(props) {
  return (
    <div className="flex flex-col justify-between px-6 py-4 bg-white border rounded-xl border-neutral-400">
      <div>
        <p className="text-xl font-medium text-neutral-500 break-keep">
          {props.title}
        </p>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-right text-[1.75rem] font-bold flex justify-end items-center flex-wrap">
          <div>
            <small className="text-xl font-bold">오늘</small> {props.today}%
          </div>
          <small className="ml-2 text-xl font-medium text-neutral-500">
            (어제 {props.yesterday}%)
          </small>
        </p>
      </div>
    </div>
  );
}

// 총 급액 시간 컴포넌트
function TotalSupplyTime(props) {
  return (
    <div className="flex flex-col justify-between px-6 py-4 bg-white border rounded-xl border-neutral-400">
      <div>
        <p className="text-xl font-medium text-neutral-500 break-keep">
          {props.title}
        </p>
      </div>
      <div className="flex flex-col flex-wrap items-end">
        <p className="text-2xl font-bold text-right">
          <small className="text-xl font-bold">오늘</small> {props.todayAmount}g
          / {props.todayNum}
        </p>
        <p className="text-right text-[1.75rem] font-bold">
          <small className="ml-2 text-xl font-medium text-neutral-500">
            (어제 {props.yesterdayAmount}g / {props.yesterdayNum})
          </small>
        </p>
      </div>
    </div>
  );
}

// 급액 배액 시간 컴포넌트
function SupplyDrainage(props) {
  return (
    <div className="flex flex-col justify-between px-6 py-4 bg-white border rounded-xl border-neutral-400">
      <div>
        <p className="text-xl font-medium text-neutral-500">{props.title}</p>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-right text-[1.75rem] font-bold flex justify-end flex-wrap items-center">
          <div>
            <small className="text-xl font-bold">처음 오늘</small>{" "}
            {props.todayFirst}
          </div>
          <small className="ml-2 text-xl font-medium text-neutral-500">
            (어제 {props.yesterdayFirst})
          </small>
        </p>
        {props.tomorow == "" ? null : (
          <p className="flex flex-wrap items-center justify-end mt-2 text-2xl font-medium text-right text-neutral-500">
            <div>
              <small className="text-xl font-bold">마지막 오늘</small>
              {props.todayLast}
            </div>
            <small className="ml-2 text-xl font-medium text-neutral-500">
              (어제 {props.yesterdayLast})
            </small>
          </p>
        )}
      </div>
    </div>
  );
}

// 누적광량 컴포넌트
function Light(props) {
  return (
    <div className="flex flex-col justify-between px-6 py-4 bg-white border rounded-xl border-neutral-400">
      <div>
        <p className="text-xl font-medium text-neutral-500 break-keep">
          누적광량{" "}
          <small className="text-lg font-medium text-neutral-500">
            (전날마지막급액시/첫급액 직전)
          </small>
        </p>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-right text-[1.75rem] font-bold">
          <small className="text-xl font-bold">오늘</small> {props.todayFirst}W
          / {props.todayLast}W
        </p>
        {props.tomorow == "" ? null : (
          <p className="mt-2 text-2xl font-medium text-right text-neutral-500">
            (<small className="text-xl font-bold">어제</small>{" "}
            {props.yesterdayFirst}W / {props.yesterdayLast}W)
          </p>
        )}
      </div>
    </div>
  );
}

export default Badge;
