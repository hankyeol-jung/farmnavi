import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faPause,
  faPlay,
  faForward,
  faBackward,
  faVolumeHigh,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useSelector, useDispatch } from "react-redux";
import {
  playChange,
  playNumChange,
  playNext,
  playPrev,
  playVolumeChange,
} from "../store.js";

function Music() {
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

  const playing = useSelector((state) => state.playing);
  const playList = useSelector((state) => state.playList);
  const playNum = useSelector((state) => state.playNum);

  const dispatch = useDispatch();

  const handlePlay = () => {
    dispatch(playChange(true));
  };

  const handlePause = () => {
    dispatch(playChange(false));
  };

  const handleNext = () => {
    if (playNum < playList.length - 1) {
      dispatch(playNext());
    }
  };

  const handlePrev = () => {
    if (playNum > 0) {
      dispatch(playPrev());
    }
  };

  const handleVolumeChange = (event) => {
    const volume = parseFloat(event.target.value);
    dispatch(playVolumeChange(volume));
  };

  return (
    <div
      className={
        "relative w-full h-full transition duration-[800ms] start " + fade
      }
    >
      <div className="absolute z-40 top-0 left-0 flex items-center justify-between w-full h-[6.625rem] border-b px-11 border-b-neutral-300">
        <div className="flex items-center">
          <p className="mr-6 text-4xl font-bold text-black ">음악</p>
        </div>
      </div>

      <div className="absolute bottom-[3.75rem] w-full h-[calc(100%_-_6.625rem_-_3.75rem)] scroll-smooth">
        <div className="absolute w-full h-full pt-8 px-11">
          <div className="h-full">
            <div className="grid h-full grid-cols-3 gap-5">
              <div className="flex flex-col items-center justify-center h-full max-h-full p-10 text-center bg-white border rounded-xl border-neutral-400">
                <p className="mb-2 text-3xl font-bold text-black">
                  {playList[playNum].music}
                </p>
                <p className="mx-5 mb-1 text-2xl font-medium text-neutral-500">
                  -
                </p>
                <p className="mb-32 text-2xl font-medium text-neutral-500">
                  {playList[playNum].name}
                </p>
                <MusicRemote
                  playing={playing}
                  handlePlay={handlePlay}
                  handlePause={handlePause}
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                  handleVolumeChange={handleVolumeChange}
                />
              </div>
              <MusicList
                playList={playList}
                playNum={playNum}
                handlePlay={handlePlay}
                handlePause={handlePause}
                playing={playing}
                reveal={reveal}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MusicList(props) {
  const dispatch = useDispatch();
  let scrollRef = useRef(0);

  let scrollRefUp = () => {
    scrollRef.current.scrollTop = scrollRef.current.scrollTop - 50;
  };
  let scrollRefDown = () => {
    scrollRef.current.scrollTop = scrollRef.current.scrollTop + 50;
  };
  return (
    <div className="relative h-full max-h-full col-span-2 p-2 overflow-hidden bg-white border rounded-xl border-neutral-400">
      <span className="grid h-16 grid-cols-5 p-4">
        <p className="col-span-2 mr-5 text-xl font-medium text-neutral-400">
          노래
        </p>
        <p className="col-span-2 text-xl font-medium text-neutral-400">
          아티스트
        </p>
      </span>
      <div
        className="h-[calc(100%_-_4rem_-_3.75rem)] overflow-scroll"
        ref={scrollRef}
        onScroll={() => {
          props.reveal();
        }}
      >
        {props.playList.map((p, i) => {
          return (
            <List
              dispatch={dispatch}
              p={p}
              i={i}
              playNum={props.playNum}
              handlePlay={props.handlePlay}
              handlePause={props.handlePause}
              playing={props.playing}
            />
          );
        })}
      </div>
      {/* 스크롤무브 버튼 */}
      <div className=" z-30 w-full h-[3.75rem] bg-white text-center flex justify-center items-center">
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

function List(props) {
  return (
    <div className="transition duration-1000  reveal">
      <span
        className={
          "grid grid-cols-5 text-2xl font-medium p-4 rounded-lg transition-all duration-300 " +
          `${
            props.playNum == props.i
              ? "bg-[#2EABE2] text-white"
              : "bg-white text-neutral-500"
          }`
        }
        onClick={() => {
          props.dispatch(playNumChange(props.i));
        }}
      >
        <div className="col-span-2 mr-10 overflow-hidden">
          <p className="overflow-hidden whitespace-nowrap text-ellipsis">
            {props.p.music}
          </p>
        </div>
        <p className="col-span-2 overflow-hidden whitespace-nowrap text-ellipsis">
          {props.p.name}
        </p>
        {props.playing == true && props.playNum == props.i ? (
          <FontAwesomeIcon
            icon={faPause}
            onClick={props.handlePause}
            className="ml-auto "
          />
        ) : (
          <FontAwesomeIcon
            icon={faPlay}
            onClick={props.handlePlay}
            className="ml-auto "
          />
        )}
      </span>
    </div>
  );
}

function MusicRemote(props) {
  const playVolume = useSelector((state) => state.playVolume);

  return (
    <div>
      <div className="flex items-center justify-center mb-10">
        <div className="text-xl text-neutral-600 ">
          <span
            className="bg-[#2EABE2] w-20 flex justify-center items-center h-14 rounded-lg text-white"
            onClick={props.handlePrev}
          >
            <FontAwesomeIcon icon={faBackward} className="mr-2 text-2xl" />
          </span>
        </div>
        <div className="mx-2 text-2xl text-neutral-600">
          {props.playing == true ? (
            <span
              className="border-[#2EABE2] border-2 w-32 flex justify-center items-center h-14 rounded-lg text-[#2EABE2]"
              onClick={props.handlePause}
            >
              <FontAwesomeIcon icon={faPause} className="mr-2 text-lg" />
              일시정지
            </span>
          ) : (
            <span
              className="bg-[#2EABE2] w-32 flex justify-center items-center h-14 rounded-lg text-white"
              onClick={props.handlePlay}
            >
              <FontAwesomeIcon icon={faPlay} className="mr-2 text-lg" />
              재생
            </span>
          )}
        </div>
        <div className="text-xl text-neutral-600 ">
          <span
            className="bg-[#2EABE2] w-20 flex justify-center items-center h-14 rounded-lg text-white"
            onClick={props.handleNext}
          >
            <FontAwesomeIcon icon={faForward} className="mr-2 text-2xl" />
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between w-[90%] mx-auto">
        <FontAwesomeIcon
          icon={faVolumeXmark}
          className="text-2xl text-neutral-400"
        />
        <input
          className="w-[70%] h-2 bg-gray-300 rounded-full outline-none appearance-none"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={playVolume}
          onChange={props.handleVolumeChange}
        />
        <FontAwesomeIcon
          icon={faVolumeHigh}
          className="text-2xl text-neutral-400"
        />
      </div>
    </div>
  );
}

export default Music;
