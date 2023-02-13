import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import Pesticide from "../json/pesticide.json";
import Fertilizer from "../json/fertilizer.json";
import shopImg0 from "../images/shop/54171491241491460_1685915928.jpeg";
import shopImg1 from "../images/shop/1000004613_magnify_097.jpeg";
import shopImg2 from "../images/shop/59989928386901089_1635167688.jpeg";
import shopImg3 from "../images/shop/76388441478384445_1173019521.jpeg";
import fertilizerImg0 from "../images/shop/69789812396427150_1295279634.jpeg";
import fertilizerImg1 from "../images/shop/31909138394892088_1204114229.jpeg";
import fertilizerImg2 from "../images/shop/70309397463497068_1055390359.jpeg";
import fertilizerImg3 from "../images/shop/35964423722325040_842971714.jpeg";

function AgriculturalMaterials() {
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

  let [pesticide, setPesticide] = useState(Pesticide);
  let [fertilizer, setFertilizer] = useState(Fertilizer);

  let [shopImg, setShopImg] = useState([
    shopImg0,
    shopImg1,
    shopImg2,
    shopImg3,
  ]);
  let [fertilizerImg, setFertilizerImg] = useState([
    fertilizerImg0,
    fertilizerImg1,
    fertilizerImg2,
    fertilizerImg3,
  ]);
  let [pLowPriceBtn, setPLowPriceBtn] = useState(false);
  let [pHeigPriceBtn, setPHeigPriceBtn] = useState(false);
  let [pReviewBtn, setPReviewBtn] = useState(false);

  let [fLowPriceBtn, setFLowPriceBtn] = useState(false);
  let [fHeigPriceBtn, setFHeigPriceBtn] = useState(false);
  let [fReviewBtn, setFReviewBtn] = useState(false);

  return (
    <div
      className={
        "relative w-full h-full transition duration-[800ms] start " + fade
      }
    >
      <div className="absolute z-40 top-0 left-0 flex items-center justify-between w-full h-[106px] border-b px-11 border-b-neutral-300">
        <div className="flex items-center">
          <p className="mr-6 text-4xl font-bold text-black ">농자재 공동구매</p>
        </div>
      </div>

      <div className="z-30 absolute top-0 w-full h-[60px] bg-gradient-to-b to-[#ffffff05] from-white mt-[100px]"></div>

      <div
        className="absolute bottom-[60px] px-11 py-8 w-full h-[calc(100%_-_106px_-_60px)] overflow-scroll scroll-smooth"
        ref={scrollRef}
        onScroll={() => {
          reveal();
        }}
      >
        <div className="transition duration-1000 reveal">
          <div className="flex items-center justify-start mb-6">
            <p className="mr-3 text-[28px] font-medium text-neutral-500 ">
              2km이내 곰팡이병 발생, 살충제를 구매하세요.
            </p>
            <span className="font-medium text-xl text-white rounded-full bg-[#2EABE2] px-6 py-1">
              추천 바로가기
            </span>
          </div>
          <div className="w-full p-6 mb-10 border border-gray-400 rounded-xl">
            <div className="flex items-center justify-start mb-6">
              <p className="mr-7 text-[28px] font-medium text-neutral-500 ">
                친환경 살충제
              </p>
              <span
                className={
                  `${
                    pLowPriceBtn == true
                      ? "bg-[#2EABE2] text-white"
                      : "text-[#2EABE2] "
                  }` +
                  " border border-[#2EABE2] duration-300 transition-all font-medium text-xl rounded-full px-6 py-1 mr-2 "
                }
                onClick={() => {
                  let copy = [...pesticide];
                  copy.sort((a, b) => a.price - b.price);
                  setPesticide(copy);
                  setPLowPriceBtn(true);
                  setPHeigPriceBtn(false);
                  setPReviewBtn(false);
                }}
              >
                낮은 가격순
              </span>
              <span
                className={
                  `${
                    pHeigPriceBtn == true
                      ? "bg-[#2EABE2] text-white"
                      : "text-[#2EABE2] "
                  }` +
                  " border border-[#2EABE2] duration-300 transition-all font-medium text-xl rounded-full px-6 py-1 mr-2 "
                }
                onClick={() => {
                  let copy = [...pesticide];
                  copy.sort((a, b) => b.price - a.price);
                  setPesticide(copy);
                  setPLowPriceBtn(false);
                  setPHeigPriceBtn(true);
                  setPReviewBtn(false);
                }}
              >
                높은 가격순
              </span>
              <span
                className={
                  `${
                    pReviewBtn == true
                      ? "bg-[#2EABE2] text-white"
                      : "text-[#2EABE2] "
                  }` +
                  " border border-[#2EABE2] duration-300 transition-all font-medium text-xl rounded-full px-6 py-1 mr-2 "
                }
                onClick={() => {
                  let copy = [...pesticide];
                  copy.sort((a, b) => b.review - a.review);
                  setPesticide(copy);
                  setPLowPriceBtn(false);
                  setPHeigPriceBtn(false);
                  setPReviewBtn(true);
                }}
              >
                리뷰 많은순
              </span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {pesticide.map((p, i) => {
                return (
                  <ShopCard
                    title={p.title}
                    delivery={p.delivery}
                    purchase={p.purchase}
                    review={p.review}
                    wish={p.wish}
                    price={p.price}
                    shippingPrice={p.shippingPrice}
                    img={shopImg[p.id - 1]}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="transition duration-1000 reveal">
          <div className="w-full p-6 mb-10 border border-gray-400 rounded-xl">
            <div className="flex items-center justify-start mb-6">
              <p className="mr-7 text-[28px] font-medium text-neutral-500 ">
                비료
              </p>
              <span
                className={
                  `${
                    fLowPriceBtn == true
                      ? "bg-[#2EABE2] text-white"
                      : "text-[#2EABE2] "
                  }` +
                  " border border-[#2EABE2] duration-300 transition-all font-medium text-xl rounded-full px-6 py-1 mr-2 "
                }
                onClick={() => {
                  let copy = [...fertilizer];
                  copy.sort((a, b) => a.price - b.price);
                  setFertilizer(copy);
                  setFLowPriceBtn(true);
                  setFHeigPriceBtn(false);
                  setFReviewBtn(false);
                }}
              >
                낮은 가격순
              </span>
              <span
                className={
                  `${
                    fHeigPriceBtn == true
                      ? "bg-[#2EABE2] text-white"
                      : "text-[#2EABE2] "
                  }` +
                  " border border-[#2EABE2] duration-300 transition-all font-medium text-xl rounded-full px-6 py-1 mr-2 "
                }
                onClick={() => {
                  let copy = [...fertilizer];
                  copy.sort((a, b) => b.price - a.price);
                  setFertilizer(copy);
                  setFLowPriceBtn(false);
                  setFHeigPriceBtn(true);
                  setFReviewBtn(false);
                }}
              >
                높은 가격순
              </span>
              <span
                className={
                  `${
                    fReviewBtn == true
                      ? "bg-[#2EABE2] text-white"
                      : "text-[#2EABE2] "
                  }` +
                  " border border-[#2EABE2] duration-300 transition-all font-medium text-xl rounded-full px-6 py-1 mr-2 "
                }
                onClick={() => {
                  let copy = [...fertilizer];
                  copy.sort((a, b) => b.review - a.review);
                  setFertilizer(copy);
                  setFLowPriceBtn(false);
                  setFHeigPriceBtn(false);
                  setFReviewBtn(true);
                }}
              >
                리뷰 많은순
              </span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {fertilizer.map((p, i) => {
                return (
                  <ShopCard
                    title={p.title}
                    delivery={p.delivery}
                    purchase={p.purchase}
                    review={p.review}
                    wish={p.wish}
                    price={p.price}
                    shippingPrice={p.shippingPrice}
                    img={fertilizerImg[p.id - 1]}
                  />
                );
              })}
            </div>
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

function ShopCard(props) {
  return (
    <div className="p-3 border border-gray-400 rounded-xl">
      <div className="w-full h-[14.375rem] mb-3 border border-gray-400 overflow-hidden flex justify-center items-center">
        <img className="max-h-full mx-auto " src={props.img}></img>
      </div>
      <div className="flex items-center justify-start mb-2">
        {props.purchase != 0 ? (
          <p className="mr-2 text-sm font-medium text-neutral-800">
            <span className="mr-1 text-neutral-500">구매</span>
            {props.purchase}
          </p>
        ) : null}
        {props.review != 0 ? (
          <p className="mr-2 text-sm font-medium text-neutral-800">
            <span className="mr-1 text-neutral-500">리뷰</span>
            {props.review}
          </p>
        ) : null}
        {props.wish != 0 ? (
          <p className="mr-2 text-sm font-medium text-neutral-800">
            <span className="mr-1 text-neutral-500">찜</span>
            {props.wish}
          </p>
        ) : null}
      </div>
      <p className="mb-2 text-xl font-bold text-black">
        {props.title.length >= 33
          ? props.title.substr(0, 33) + "..."
          : props.title}
      </p>
      <div className="flex">
        <p className="mb-1 mr-3 text-xl font-bold text-neutral-800">
          {props.price
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
          원
        </p>
        <p className="mb-1 mr-2 text-lg font-medium text-neutral-500">
          <FontAwesomeIcon icon={faTruck} className="mr-1" />
          {props.shippingPrice
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
          원
        </p>
      </div>
      <div>
        {props.delivery == 1 ? (
          <span className="mr-1 text-xs font-normal text-[#28A745] border border-[#28A745] px-1 py-px">
            오늘출발
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default AgriculturalMaterials;
