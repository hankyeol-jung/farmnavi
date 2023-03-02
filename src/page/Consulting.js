import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

function Consulting() {
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

  return (
    <div
      className={
        "relative w-full h-full transition duration-[800ms] start " + fade
      }
    >
      <div className="absolute z-40 top-0 left-0 flex items-center justify-between w-full h-[6.625rem] border-b px-11 border-b-neutral-300">
        <div className="flex items-center">
          <p className="mr-6 text-4xl font-bold text-black ">재배 컨설팅</p>
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
            <div className="grid grid-cols-2 gap-5">
              <iframe
                className="w-full mb-6 rounded-xl"
                width="560"
                height="300"
                src="https://www.youtube.com/embed/CLraTCLg2ig"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>

              <ConsultingReport />
            </div>
          </div>
          <div className="transition duration-1000 reveal">
            <TotlaReport />
          </div>
        </div>
      </div>

      <div className="z-30 absolute bottom-0 w-full h-[1.5rem] bg-gradient-to-t to-[#ffffff05] from-white mb-[3.75rem]"></div>

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

// 통합 리포트 컴포넌트
function TotlaReport() {
  return (
    <div className="w-full mb-5 bg-white border p-7 rounded-xl border-neutral-400">
      <p className="mb-10 text-3xl font-bold text-black ">통합 리포트</p>

      <p className="text-2xl font-normal text-black ">
        2월 11일의 일평균온도는 17.5°C 입니다.
        <br /> 주간평균 19.2°C , 야간평균 15.9°C, 주야간온도차는 3.3°C 입니다.
        <br />
        2월 11일 증산적합환경에 진입하지 않았습니다. 일출 이후 빠르게 습 제거가
        필요합니다. <br />
        2월 12일 당진시의 최저 외부습도는 14시경 55%으로 예측됩니다. 2월 11일
        농장 습도는 0시경 최저 94%였습니다.
        <br /> 습도 관리에 유의하세요.
        <br />
        <br />
        2월 11일 총 7회 급액 2,717g, 총 배액 187g입니다.
        <br />첫 급액 시작 시각은 10시 19분 (환경 분석 결과, 관수 권장 ), 어제의
        최저 배지 수분은 26.4%, 최고 배지 수분은 31.6%입니다.
        <br /> 2월 12일의 첫 급액 시작 시각은 10시 28분입니다. (환경 분석 결과,
        관수 권장 10시19분) <br />
        오늘의 최저 배지 수분은 25.2%입니다. <br />
        최근 3일간의 최저 배지 수분 평균은 26.3%입니다. <br />
        <br />
        2월11일 어제 벌통 투입 후 28일차입니다. 수정벌 활동 횟수는 일 100회로
        초기 대비 50% 줄었습니다. <br />
        비정상 활동 벌은 최근 1주일 평균 5회입니다. <br />
        수분 양 분석 결과, 수분 양 많은 벌은 65%, 적은 벌은 35%입니다. <br />
        시간대별 활동은 오전 10:00~11:00에 나가는 벌이 가장 많았으며, 오후
        15:00~16:00에 들어온 벌이 가장 많았습니다.
      </p>
    </div>
  );
}

// 컨설팅 보고서 컴포넌트
function ConsultingReport() {
  return (
    <div className="w-full h-[300px] bg-white border p-7 rounded-xl border-neutral-400">
      <p className="mb-5 text-2xl font-bold text-black ">
        2023년 1월 15일 컨설팅 보고서
      </p>
      <div className="relative flex items-start justify-between before:w-px before:h-full before:bg-neutral-300 before:absolute before:top-0 before:left-1/2">
        <div className="w-1/2 ">
          <div className="mb-5 ">
            <p className=" w-[10.625rem] text-lg font-medium text-neutral-500">
              주간평균 온도
            </p>
            <p className="text-2xl font-bold text-black ">
              32도(최고온도 36도)
            </p>
          </div>
          <div className="mb-5">
            <p className=" w-[10.625rem] text-lg font-medium text-neutral-500">
              야간평균 온도
            </p>
            <p className="text-2xl font-bold text-black ">27도(열대야 발생)</p>
          </div>
          <div className="mb-5">
            <p className=" w-[10.625rem] text-lg font-medium text-neutral-500">
              주야간온도차
            </p>
            <p className="text-2xl font-bold text-black ">8도 이상</p>
          </div>
          <p className=" text-2xl font-bold text-[#2EABE2]">생식생장 예측</p>
        </div>
        <div className="w-1/2 pl-10">
          <div className="mb-5 ">
            <p className="text-lg w-[10.625rem] font-medium text-neutral-500">
              첫급액시간
            </p>
            <p className="text-2xl font-bold text-black ">10 : 00</p>
          </div>
          <div className="mb-5 ">
            <p className="text-lg w-[10.625rem] font-medium text-neutral-500">
              첫배액시간
            </p>
            <p className="text-2xl font-bold text-black ">12 : 00</p>
          </div>
          <div className="mb-5 ">
            <p className="text-lg w-[10.625rem] font-medium text-neutral-500">
              급액시간
            </p>
            <p className="text-2xl font-bold text-black ">
              1시간 일찍 공급 추천
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Consulting;
