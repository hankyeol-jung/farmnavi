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
      <div className="absolute z-40 top-0 left-0 flex items-center justify-between w-full h-[106px] border-b px-11 border-b-neutral-300">
        <div className="flex items-center">
          <p className="mr-6 text-4xl font-bold text-black ">재배 컨설팅</p>
        </div>
      </div>

      <div className="z-30 absolute top-0 w-full h-[60px] bg-gradient-to-b to-[#ffffff05] from-white mt-[100px]"></div>

      <div
        className="absolute bottom-[60px] w-full h-[calc(100%_-_106px_-_60px)] overflow-scroll scroll-smooth py-8 px-[124px]"
        ref={scrollRef}
        onScroll={() => {
          reveal();
        }}
      >
        <div className="transition duration-1000 reveal">
          <iframe
            className="w-full h-[630px] rounded-3xl mb-6"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/CLraTCLg2ig"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>

        <div className="transition duration-1000 reveal">
          <ConsultingReport />
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

// 컨설팅 보고서 컴포넌트
function ConsultingReport() {
  return (
    <div className="w-full p-10 bg-white border rounded-xl border-neutral-400">
      <p className=" text-[32px] font-bold text-black mb-10">
        2023년 1월 15일 컨설팅 보고서
      </p>
      <div className="relative flex items-start justify-between before:w-px before:h-full before:bg-neutral-300 before:absolute before:top-0 before:left-1/2">
        <div className="w-1/2 ">
          <div className="flex items-center mb-5">
            <p className=" w-[170px] text-2xl font-medium text-neutral-500">
              주간평균 온도
            </p>
            <p className=" text-[28px] font-bold text-black">
              32도(최고온도 36도)
            </p>
          </div>
          <div className="flex items-center mb-5">
            <p className=" w-[170px] text-2xl font-medium text-neutral-500">
              야간평균 온도
            </p>
            <p className=" text-[28px] font-bold text-black">
              27도(열대야 발생)
            </p>
          </div>
          <div className="flex items-center mb-5">
            <p className=" w-[170px] text-2xl font-medium text-neutral-500">
              주야간온도차
            </p>
            <p className=" text-[28px] font-bold text-black">8도 이상</p>
          </div>
          <p className=" text-[28px] font-bold text-[#2EABE2]">생식생장 예측</p>
        </div>
        <div className="w-1/2 pl-10">
          <div className="flex items-center mb-5">
            <p className="text-2xl w-[170px] font-medium text-neutral-500">
              첫급액시간
            </p>
            <p className=" text-[28px] font-bold text-black">10 : 00</p>
          </div>
          <div className="flex items-center mb-5">
            <p className="text-2xl w-[170px] font-medium text-neutral-500">
              첫배액시간
            </p>
            <p className=" text-[28px] font-bold text-black">12 : 00</p>
          </div>
          <div className="flex items-center mb-5">
            <p className="text-2xl w-[170px] font-medium text-neutral-500">
              급액시간
            </p>
            <p className=" text-[28px] font-bold text-black">
              1시간 일찍 공급 추천
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Consulting;
