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

const userUrl =
  "https://raw.githubusercontent.com/hankyeol-jung/farmnavi/main/src/json/user-information.json";

function FertilizedBee() {
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
                  today={result.data && data().badge.difference.today}
                  yesterday={result.data && data().badge.difference.yesterday}
                />
                <BeeInOut
                  title="현재 수정벌 IN 횟수"
                  today={result.data && data().badge.difference.today}
                  yesterday={result.data && data().badge.difference.yesterday}
                />
                <BeeInOut
                  title="비정상 활동 벌"
                  today={result.data && data().badge.difference.today}
                  yesterday={result.data && data().badge.difference.yesterday}
                />
                <Flowerpot
                  title="화분 분석(화분양 많음/적음)"
                  today={result.data && data().badge.difference.today}
                  yesterday={result.data && data().badge.difference.yesterday}
                />
              </div>
            </div>
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
          <small className="text-xl font-bold">오늘 </small> {props.today}회 /{" "}
          {props.today}회
        </p>
        <p className="text-right text-[1.75rem] font-bold">
          <small className="ml-2 text-xl font-medium text-neutral-500">
            (어제 {props.yesterday}회 / {props.yesterday}회)
          </small>
        </p>
      </div>
    </div>
  );
}

export default FertilizedBee;
