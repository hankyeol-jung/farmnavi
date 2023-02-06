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
import { Line } from "react-chartjs-2";

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

function Badge() {
  let supplyDrainageData = [
    {
      title: "첫 급액 시각",
      today: "오전 10:32",
      yesterday: "오전09:30",
      tomorow: "",
    },
    {
      title: "첫 배액 시각",
      today: "오전 11:34",
      yesterday: "오전09:45",
      tomorow: "오전 10:28",
    },
    {
      title: "마지마 배액 시각",
      today: "오전 11:34",
      yesterday: "오전09:45",
      tomorow: "오전 10:28",
    },
  ];

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
      <div className="absolute z-40 top-0 left-0 flex items-center justify-between w-full h-[106px] border-b px-11 border-b-neutral-300">
        <div className="flex items-center">
          <p className="mr-6 text-4xl font-bold text-black ">홍길동 농장 A동</p>
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
        <div className="absolute w-full pt-8 px-11">
          <div className="transition duration-1000 reveal">
            <div className="grid grid-cols-3 gap-6 mb-6">
              {supplyDrainageData.map((s, i) => {
                return (
                  <SupplyDrainage
                    title={s.title}
                    today={s.today}
                    yesterday={s.yesterday}
                    tomorow={s.tomorow}
                  />
                );
              })}
            </div>
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
    <div className=" flex items-center h-[300px] justify-between w-full p-6 mb-6 border rounded-xl border-neutral-400">
      <div className="w-[334px] h-full flex flex-col justify-between mr-5">
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
                  className="before:last:w-0 relative before:w-px before:right-0 before:top-1/2 before:-translate-y-1/2 before:absolute before:h-[150px] before:bg-neutral-400 h-full"
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
    <div className=" flex items-center h-[300px] justify-between w-full p-6 mb-6 border rounded-xl border-neutral-400 ">
      <div className="w-[334px] h-full flex flex-col justify-between mr-5">
        <div>
          <p className="text-xl font-bold text-neutral-500">{props.title}</p>
        </div>
        <div>
          <div className="px-5 bg-[#2EABE2] w-full h-[67px] mb-3 text-white text-2xl font-bold rounded-2xl flex justify-center items-center text-center">
            <p className=" break-keep">{props.advice}</p>
          </div>
          <div className="p-4 border-[#2EABE2] border-[3px] w-full h-[110px] rounded-2xl flex justify-between items-start text-center">
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
                  className="before:last:w-0 relative before:w-px before:right-0 before:top-1/2 before:-translate-y-1/2 before:absolute before:h-[150px] before:bg-neutral-400 h-full"
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
    <div className=" flex items-center h-[300px] justify-between w-full p-6 mb-6 border rounded-xl border-neutral-400 ">
      <div className="w-[334px] h-full flex flex-col justify-between mr-5">
        <div>
          <p className="text-xl font-bold text-neutral-500">{props.title}</p>
        </div>
        <div className="px-5 bg-[#2EABE2] w-full h-[152px] text-white text-2xl font-bold rounded-2xl flex justify-center items-center text-center">
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
                  className="before:last:w-0 relative before:w-px before:right-0 before:top-1/2 before:-translate-y-1/2 before:absolute before:h-[150px] before:bg-neutral-400 h-full"
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

// 급액 배액 시간 컴포넌트
function SupplyDrainage(props) {
  return (
    <div className="flex flex-col justify-between px-6 py-4 bg-white border rounded-xl border-neutral-400 h-[160px]">
      <div>
        <p className="text-xl font-medium text-neutral-500">{props.title}</p>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-right text-[28px] font-bold">
          <small className="text-xl font-bold">오늘</small> {props.today}
          <small className="ml-2 text-xl font-medium text-neutral-500">
            (어제 {props.yesterday})
          </small>
        </p>
        {props.tomorow == "" ? null : (
          <p className="mt-2 text-2xl font-medium text-right text-neutral-500">
            내일 {props.tomorow} 예측
          </p>
        )}
      </div>
    </div>
  );
}

export default Badge;
