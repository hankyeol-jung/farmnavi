import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import Cheongyang from "../json/cheongyang.json";
import { SlideToggle } from "@todys/react-slide-toggle";

function AgriculturalTechnologyCenter(tab) {
  let [fade, setFade] = useState("");

  useEffect(() => {
    setFade("end");
    return () => {
      setFade("");
    };
  }, []);

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

  let [cheongyang, setCheongyang] = useState(Cheongyang);

  let [wish, setWish] = useState(false);
  let [wishState, setWishState] = useState(false);

  let [fade2, setFade2] = useState("");

  let localWish = JSON.parse(localStorage.getItem("watched"));

  useEffect(() => {
    setTimeout(() => {
      setFade2("end");
    }, 300);
    // setFade2("end");
    return () => {
      setFade2("");
    };
  }, [wish]);

  let wishFunc = () => {
    setWish(!wish);
    setWishState(!wish);
  };

  let [wishAllList, setWishAllList] = useState(true);

  return (
    <div
      className={
        "relative w-full h-full transition duration-[800ms] start " + fade
      }
    >
      <div className="absolute z-40 top-0 left-0 flex items-center justify-between w-full h-[106px] border-b px-11 border-b-neutral-300">
        <div className="flex items-center">
          <p className="mr-6 text-4xl font-bold text-black ">
            청양군 농업 기술센터
          </p>
          <span
            className={
              `${wish == true ? "text-white bg-[#2EABE2]" : "text-[#2EABE2]"}` +
              " text-2xl px-10 py-1 border-2 font-bold border-[#2EABE2] rounded-full cursor-pointer transition-all"
            }
            onClick={() => {
              wishFunc();
            }}
          >
            {wish == true ? "기본 보기" : "즐겨찾기 보기"}
          </span>
        </div>
      </div>

      <div className="z-30 absolute top-0 w-full h-[60px] bg-gradient-to-b to-[#ffffff05] from-white mt-[100px]"></div>

      <div
        className={
          "absolute bottom-[60px] px-11 py-8 w-full h-[calc(100%_-_106px_-_60px)] overflow-scroll scroll-smooth transition-all duration-300 start " +
          fade2
        }
        ref={scrollRef}
        onScroll={() => {
          reveal();
        }}
      >
        {wish == true
          ? wishState == true
            ? localWish.map((w, i) => {
                return (
                  <div className="mb-6 transition duration-1000 reveal">
                    <WishATcenterList
                      title={cheongyang[w - 1].title}
                      description={cheongyang[w - 1].description}
                      deadline={cheongyang[w - 1].deadline}
                      keyword={cheongyang[w - 1].keyword}
                      i={cheongyang[w - 1].id}
                      state={true}
                      localWish={localWish}
                      setWishState={setWishState}
                      wish={wish}
                      setWish={setWish}
                    />
                  </div>
                );
              })
            : null
          : wishAllList == true
          ? [...cheongyang].reverse().map((c, i) => {
              return (
                <div className="mb-6 transition duration-1000 reveal">
                  <ATcenterList
                    title={c.title}
                    description={c.description}
                    registration={c.registration}
                    deadline={c.deadline}
                    keyword={c.keyword}
                    i={c.id}
                    state={false}
                    localWish={localWish}
                    setWishAllList={setWishAllList}
                  />
                </div>
              );
            })
          : null}
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

function ATcenterList(props) {
  let [toggleState, setToggleState] = useState(false);

  let [wish, setWish] = useState(props.state);

  let wishPush = () => {
    let localWish = localStorage.getItem("watched");
    localWish = JSON.parse(localWish);
    localWish.push(props.i);
    localStorage.setItem("watched", JSON.stringify(localWish));
  };

  let wishDel = () => {
    let localWish = localStorage.getItem("watched");
    localWish = JSON.parse(localWish);
    for (let i = 0; i < localWish.length; i++) {
      if (localWish[i] === props.i) {
        localWish.splice(i, 1);
        localStorage.setItem("watched", JSON.stringify(localWish));
        i--;
      }
    }
  };

  useEffect(() => {
    let localWish = localStorage.getItem("watched");
    localWish = JSON.parse(localWish);
    for (let i = 0; i < localWish.length; i++) {
      if (localWish[i] === props.i) {
        setWish(true);
      }
    }
  }, []);

  return (
    <div
      className={
        `${
          wish == true
            ? "border-[#2EABE2] border-4 bg-[#F2FBFF]"
            : "border-neutral-500"
        }` +
        " w-full px-10 border slide-toggle rounded-xl last:mb-0 transition-all duration-300"
      }
    >
      <div className="flex items-center justify-between py-6 ">
        <div className="flex items-center justify-start">
          <span className=" py-0.5 px-5 bg-[#95C121] rounded-full font-bold text-xl text-white mr-10">
            {props.keyword}
          </span>
          <p className="text-2xl font-bold text-black ">{props.title}</p>
        </div>
        <div className="flex items-center justify-start">
          <p className="text-2xl font-medium text-neutral-500">
            {props.deadline != "" ? "마감" : "상세 내용 확인"} {props.deadline}
          </p>
          <span
            onClick={() => {
              setToggleState(!toggleState);
            }}
            className="slide-toggle__toggl cursor-pointer ml-6 w-[140px] h-[35px] border border-neutral-500 font-medium text-xl text-neutral-800 rounded-full flex justify-center items-center"
          >
            자세히보기
            <FontAwesomeIcon
              className={
                `${toggleState != false ? "rotate-[-180deg]" : "rotate-0"}` +
                " pb-1 ml-2 text-2xl text-neutral-500 transition-all duration-500"
              }
              icon={faCaretDown}
            />
          </span>
        </div>
      </div>

      <SlideToggle
        state={toggleState}
        duration={0.5}
        className=" slide-toggle__box"
      >
        <div className="pb-10">
          <p
            dangerouslySetInnerHTML={{ __html: props.description }}
            className={
              " text-lg py-10 slide-toggle__box-inner relative before:w-full before:h-px before:bg-neutral-400 before:absolute before:top-0 transition-all duration-500"
            }
          ></p>
          <div className="w-full pt-5 pb-2 text-right border-t border-neutral-400">
            <span
              className={
                `${
                  wish == true ? "text-white bg-[#2EABE2]" : "text-[#2EABE2]"
                }` +
                " text-2xl px-10 py-1 border-2 font-bold border-[#2EABE2] rounded-full cursor-pointer transition-all duration-300"
              }
              onClick={() => {
                setWish(!wish);
                wish == false ? wishPush() : wishDel();
              }}
            >
              {wish == true ? "즐겨찾기 취소" : "즐겨찾기"}
            </span>
          </div>
        </div>
      </SlideToggle>
    </div>
  );
}
function WishATcenterList(props) {
  useEffect(() => {
    let localWish = localStorage.getItem("watched");
    localWish = JSON.parse(localWish);
    for (let i = 0; i < localWish.length; i++) {
      if (localWish[i] === props.i) {
        setWish(true);
      }
    }
  }, []);

  let [toggleState, setToggleState] = useState(false);

  let [wish, setWish] = useState(props.state);

  let wishDel = () => {
    for (let i = 0; i < props.localWish.length; i++) {
      if (props.localWish[i] === props.i) {
        props.localWish.splice(i, 1);
        localStorage.setItem("watched", JSON.stringify(props.localWish));
        i--;
      }
    }
  };

  let [fade2, setFade2] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setFade2("end");
    }, 300);
    return () => {
      setFade2("");
    };
  }, [wish]);

  let wishOnOff = () => {
    if (props.localWish.length == 0) {
      props.setWish(false);
    } else {
      props.setWishState(false);
      setTimeout(() => {
        props.setWishState(true);
      }, 10);
    }
  };

  return (
    <div
      className={
        `${
          wish == true
            ? "border-[#2EABE2] border-4 bg-[#F2FBFF]"
            : "border-neutral-500"
        }` +
        " w-full px-10 border slide-toggle rounded-xl last:mb-0 transition-all duration-300 start " +
        fade2
      }
    >
      <div className="flex items-center justify-between py-6 ">
        <div className="flex items-center justify-start">
          <span className=" py-0.5 px-5 bg-[#95C121] rounded-full font-bold text-xl text-white mr-10">
            {props.keyword}
          </span>
          <p className="text-2xl font-bold text-black ">{props.title}</p>
        </div>
        <div className="flex items-center justify-start">
          <p className="text-2xl font-medium text-neutral-500">
            {props.deadline != "" ? "마감" : "상세 내용 확인"} {props.deadline}
          </p>
          <span
            onClick={() => {
              setToggleState(!toggleState);
            }}
            className="slide-toggle__toggl cursor-pointer ml-6 w-[140px] h-[35px] border border-neutral-500 font-medium text-xl text-neutral-800 rounded-full flex justify-center items-center"
          >
            자세히보기
            <FontAwesomeIcon
              className={
                `${toggleState != false ? "rotate-[-180deg]" : "rotate-0"}` +
                " pb-1 ml-2 text-2xl text-neutral-500 transition-all duration-500"
              }
              icon={faCaretDown}
            />
          </span>
        </div>
      </div>

      <SlideToggle
        state={toggleState}
        duration={0.5}
        className=" slide-toggle__box"
      >
        <div className="pb-10">
          <p
            dangerouslySetInnerHTML={{ __html: props.description }}
            className={
              " text-lg py-10 slide-toggle__box-inner relative before:w-full before:h-px before:bg-neutral-400 before:absolute before:top-0 transition-all duration-500"
            }
          ></p>
          <div className="w-full pt-5 pb-2 text-right border-t border-neutral-400">
            <span
              className={
                `${
                  wish == true ? "text-white bg-[#2EABE2]" : "text-[#2EABE2]"
                }` +
                " text-2xl px-10 py-1 border-2 font-bold border-[#2EABE2] rounded-full cursor-pointer transition-all duration-300"
              }
              onClick={() => {
                wishDel();
                setWish(false);
                wishOnOff();
              }}
            >
              {wish == true ? "즐겨찾기 취소" : "즐겨찾기"}
            </span>
          </div>
        </div>
      </SlideToggle>
    </div>
  );
}

export default AgriculturalTechnologyCenter;
