import { useState } from "react";

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

  return (
    <div className="relative col-span-3 bg-white">
      <div className="absolute z-40 top-0 left-0 flex items-center justify-between w-full h-[106px] border-b px-11 border-b-neutral-300">
        <div className="flex items-center">
          <p className="mr-6 text-4xl font-bold text-black ">홍길동 농장 A동</p>
        </div>
      </div>

      <div className="z-30 absolute top-0 w-full h-[60px] bg-gradient-to-b to-[#ffffff05] from-white mt-[100px]"></div>
      <div className="absolute bottom-[60px] w-full h-[calc(100%_-_106px_-_60px)] overflow-scroll scroll-smooth">
        <div className="absolute w-full pt-8 px-11">
          <div className="transition duration-1000 reveal">
            <div className="grid grid-cols-3 gap-6">
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
        </div>
      </div>
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
