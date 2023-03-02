import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import Cheongyang from "../json/cheongyang.json";
import { SlideToggle } from "@todys/react-slide-toggle";
import Fade from "react-reveal/Fade";

function AgriculturalTechnologyCenter(tab) {
  let [fade, setFade] = useState("");

  let [refresh, setRefresh] = useState(true);

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

  let [regist, setRegist] = useState(false);
  let [registState, setRegistState] = useState(false);

  let [fade2, setFade2] = useState("");

  let localWish = JSON.parse(localStorage.getItem("watched"));
  let localRegist = JSON.parse(localStorage.getItem("regist"));

  let state = true;

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
    setRegist(false);
    setRegistState(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setFade2("end");
    }, 300);
    // setFade2("end");
    return () => {
      setFade2("");
    };
  }, [regist]);

  let registFunc = () => {
    setRegist(!regist);
    setRegistState(!regist);
    setWish(false);
    setWishState(false);
  };

  let [wishAllList, setWishAllList] = useState(true);
  let [registAllList, setRegistAllList] = useState(true);

  const [myState, setMyState] = useState(localWish);

  useEffect(() => {
    setTimeout(() => {
      setRefresh(true);
    }, [100]);
    setTimeout(() => {
      setRefresh(false);
    }, [10]);
    return setRefresh(true);
  }, [myState]);

  const handleChange = () => {
    setMyState(localWish);
  };

  let { registMax } = localRegist.length;

  return (
    <div
      className={
        "relative w-full h-full transition duration-[800ms] start " + fade
      }
    >
      <div className="absolute z-40 top-0 left-0 flex items-center justify-between w-full h-[6.625rem] border-b px-11 border-b-neutral-300">
        <div className="flex items-center justify-between w-full">
          <p className="mr-6 text-4xl font-bold text-black ">
            청양군 농업 기술센터
          </p>
          <div className="flex items-center justify-center">
            <span
              className={
                `${
                  wish == true ? "text-white bg-[#2EABE2]" : "text-[#2EABE2]"
                }` +
                " text-2xl px-10 py-1 border-2 font-bold border-[#2EABE2] rounded-full cursor-pointer transition-all flex items-center justify-center"
              }
              onClick={() => {
                wishFunc();
                handleChange();
              }}
            >
              {wish == true ? (
                "전체 보기"
              ) : (
                <>
                  {"즐겨찾기 "}
                  <span className=" text-white bg-[#2EABE2] rounded-full w-8 h-8 flex justify-center items-center ml-2 font-medium">
                    {localWish.length}
                  </span>
                </>
              )}
            </span>
            <span
              className={
                `${
                  regist == true ? "text-white bg-[#2EABE2]" : "text-[#2EABE2]"
                }` +
                " ml-4 text-2xl px-10 py-1 border-2 font-bold border-[#2EABE2] rounded-full cursor-pointer transition-all flex items-center justify-center"
              }
              onClick={() => {
                registFunc();
                handleChange();
              }}
            >
              {regist == true ? (
                "전제 보기"
              ) : (
                <>
                  {"신청하기 "}
                  <span className=" text-white bg-[#2EABE2] rounded-full w-8 h-8 flex justify-center items-center ml-2 font-medium">
                    {localRegist.length}
                  </span>
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="z-30 absolute top-0 w-full h-[3.75rem] bg-gradient-to-b to-[#ffffff05] from-white mt-[6.25rem]"></div>

      <div
        className={
          "absolute bottom-[3.75rem] px-11 py-8 w-full h-[calc(100%_-_6.625rem_-_3.75rem)] overflow-scroll scroll-smooth transition-all duration-300 start " +
          fade2
        }
        ref={scrollRef}
        onScroll={() => {
          reveal();
        }}
      >
        {wish == true ? (
          localWish.length == 0 ? (
            <p className="text-2xl font-medium text-neutral-700">
              즐겨찾기가 없습니다. 즐겨찾기를 해주세요.
            </p>
          ) : null
        ) : null}

        {regist == true ? (
          localRegist.length == 0 ? (
            <p className="text-2xl font-medium text-neutral-700">
              신청하기가 없습니다. 즐겨찾기를 해주세요.
            </p>
          ) : null
        ) : null}

        {refresh == true
          ? wish == true
            ? wishState == true
              ? localWish.map((w, i) => {
                  return (
                    <Fade bottom>
                      <div className="mb-6">
                        <ATcenterList
                          title={cheongyang[w - 1].title}
                          description={cheongyang[w - 1].description}
                          registration={cheongyang[w - 1].registration}
                          deadline={cheongyang[w - 1].deadline}
                          keyword={cheongyang[w - 1].keyword}
                          i={cheongyang[w - 1].id}
                          state={state}
                          localWish={localWish}
                          setWishState={setWishState}
                          wish={wish}
                          setWish={setWish}
                          handleChange={handleChange}
                          regist={regist}
                          setRegist={setRegist}
                        />
                      </div>
                    </Fade>
                  );
                })
              : null
            : regist == true
            ? localRegist.map((w, i) => {
                return (
                  <Fade bottom>
                    <div className="mb-6">
                      <ATcenterList
                        title={cheongyang[w.id - 1].title}
                        description={cheongyang[w.id - 1].description}
                        registration={cheongyang[w.id - 1].registration}
                        deadline={cheongyang[w.id - 1].deadline}
                        keyword={cheongyang[w.id - 1].keyword}
                        i={cheongyang[w.id - 1].id}
                        state={true}
                        localRegist={localRegist}
                        setRegistState={setRegistState}
                        handleChange={handleChange}
                        regist={regist}
                        setRegist={setRegist}
                      />
                    </div>
                  </Fade>
                );
              })
            : null
          : null}
        {refresh == true
          ? wishAllList == true && regist != true && wish != true
            ? [...cheongyang].reverse().map((c, i) => {
                return (
                  <Fade bottom>
                    <div className="mb-6">
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
                        regist={regist}
                        setRegist={setRegist}
                        handleChange={handleChange}
                        wish={wish}
                      />
                    </div>
                  </Fade>
                );
              })
            : null
          : null}
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

function ATcenterList(props) {
  let [toggleState, setToggleState] = useState(false);

  let [wish, setWish] = useState(props.wish);
  let [regist, setRegist] = useState(props.regist);

  let dataRef = useRef();

  let wishPush = () => {
    let localWish = localStorage.getItem("watched");
    localWish = JSON.parse(localWish);
    localWish.push(props.i);
    localStorage.setItem("watched", JSON.stringify(localWish));
  };

  let registPush = () => {
    if (dataRef.current.value == "") {
      alert("신청날짜를 선택해 주세요.");
    } else {
      let localRegist = localStorage.getItem("regist");
      localRegist = JSON.parse(localRegist);
      localRegist.push({ id: props.i, value: dataRef.current.value });
      localStorage.setItem("regist", JSON.stringify(localRegist));
      setRegist(!regist);
    }
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

  let registDel = () => {
    let localRegist = localStorage.getItem("regist");
    localRegist = JSON.parse(localRegist);
    for (let i = 0; i < localRegist.length; i++) {
      // console.log();
      if (localRegist[i].id == props.i) {
        // if(localRegist==id)
        localRegist.splice(i, 1);
        localStorage.setItem("regist", JSON.stringify(localRegist));
        i--;
      }
    }
    setRegist(!regist);
  };

  let [registValue, setRegistValue] = useState();

  useEffect(() => {
    let localWish = localStorage.getItem("watched");
    localWish = JSON.parse(localWish);
    let localRegist = localStorage.getItem("regist");
    localRegist = JSON.parse(localRegist);
    for (let i = 0; i < localWish.length; i++) {
      if (localWish[i] === props.i) {
        setWish(true);
      }
    }
    for (let i = 0; i < localRegist.length; i++) {
      if (localRegist[i].id === props.i) {
        setRegist(true);
        setRegistValue(localRegist[i].value);
      }
    }
  }, []);

  return (
    <div
      className={
        `${
          wish == true
            ? "border-[#2EABE2] border bg-[#F2FBFF]"
            : "border-neutral-500"
        }` +
        " w-full px-10 border slide-toggle rounded-xl last:mb-0 transition-all duration-300"
      }
    >
      <div
        className="flex items-center justify-between py-6 "
        onClick={() => {
          setToggleState(!toggleState);
        }}
      >
        <div className="flex items-center justify-start">
          <span className=" py-0.5 px-5 bg-[#95C121] rounded-full font-bold text-xl text-white mr-10">
            {props.keyword}
          </span>
          <p className="text-2xl font-bold text-black ">{props.title}</p>
        </div>
        <div className="flex items-center justify-start">
          <p className="text-2xl font-medium text-neutral-500">
            {props.deadline != "" ? (
              regist == true ? (
                <span className="w-[6.25rem] h-[2.1875rem] bg-[#2EABE2] font-bold text-xl text-white rounded-full flex justify-center items-center">
                  신청완료
                </span>
              ) : (
                "마감 " + props.deadline
              )
            ) : (
              "상세 내용 확인"
            )}
          </p>
          <span className="slide-toggle__toggl cursor-pointer ml-6 w-[8.75rem] h-[2.1875rem] border border-neutral-500 font-medium text-xl text-neutral-800 rounded-full flex justify-center items-center">
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
          <DataChoise
            registration={props.registration}
            deadline={props.deadline}
            dataRef={dataRef}
            regist={regist}
            registValue={registValue}
          />
          <div className="w-full pt-5 pb-2 text-right border-t border-neutral-400">
            <span
              className={
                `${
                  wish == true
                    ? "text-white bg-neutral-400"
                    : "text-neutral-400"
                }` +
                " text-2xl px-10 py-1 border-2 font-bold border-neutral-400 rounded-full cursor-pointer transition-all duration-300"
              }
              onClick={() => {
                setWish(!wish);
                wish == false ? wishPush() : wishDel();
                props.handleChange();
              }}
            >
              {wish == true ? "즐겨찾기 취소" : "즐겨찾기"}
            </span>

            <span
              className={
                `${
                  regist == true ? "text-white bg-[#2EABE2]" : "text-[#2EABE2]"
                }` +
                " ml-5 text-2xl px-10 py-1 border-2 font-bold border-[#2EABE2] rounded-full cursor-pointer transition-all duration-300"
              }
              onClick={() => {
                regist == false ? registPush() : registDel();
                props.handleChange();
              }}
            >
              {regist == true ? "신청하기 취소" : "신청하기"}
            </span>
          </div>
        </div>
      </SlideToggle>
    </div>
  );
}

function DataChoise(props) {
  let min = props.registration;
  let max = props.deadline;
  return (
    <div className="flex items-center mb-5 ">
      <p className="mr-3 text-2xl font-medium text-neutral-600">
        신청 날짜 {props.regist == false ? "선택" : null}
      </p>
      {props.regist == false ? (
        <input
          ref={props.dataRef}
          className="px-4 py-1 text-2xl bg-transparent border-2 rounded-full border-neutral-400"
          type="date"
          id="start-date"
          min={min}
          max={max}
        />
      ) : (
        <p className="text-2xl font-medium text-black">{props.registValue}</p>
      )}
    </div>
  );
}

export default AgriculturalTechnologyCenter;
