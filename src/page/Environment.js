function Environment() {
  return (
    <div className="grid h-[calc(100%_-_108px_-_76px)] grid-cols-4 px-6 pb-8 gap-7 pt-7">
      {/* 환경콘텐츠 */}
      <div className="relative h-full col-span-3 bg-white">
        <div className="absolute top-0 left-0 flex items-center justify-between w-full h-[106px] border-b px-11 border-b-neutral-300">
          <div className="flex items-center">
            <p className="mr-6 text-4xl font-bold text-black ">
              홍길동 농장 A동
            </p>
            <span className="px-5 py-1 text-xl font-bold text-black bg-[#ffc107] rounded-xl">
              내부가 조금 건조해요
            </span>
          </div>
          <div className="flex items-center">
            <p className=" text-[28px] font-medium mr-5 text-neutral-500 ">
              오늘의 환경점수
            </p>
            <p className=" text-[32px] font-medium text-black ">
              <b className=" text-[40px] font-bold text-[#28a745]">61</b>점
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 w-full h-[calc(100%_-_106px)] overflow-scroll">
          <div className="w-full h-[1500px] px-11 pt-8">
            <div className="flex items-center justify-between h-[8.75rem] mb-6">
              <TemperatureHumidity
                borderColor="border-[#FEC104]"
                nowTemperature="29.3"
                nowHumidity="48.8"
                suggestionTemperature="28.5"
                suggestionHumidity="52.5"
              ></TemperatureHumidity>
              <SuitableTranspiration
                title="적합한 증산 진입 예상"
                time="02시간 50분 후"
                width="w-[20rem]"
                margin="mx-6"
              />
              <SuitableTranspiration
                title="적합한 증산활동 시간"
                time="오늘 02시간 10분 예측"
                width="w-[25rem]"
              />
            </div>
          </div>
        </div>
      </div>
      {/* 농장환경예측 */}
      <div className="h-full bg-white"></div>
    </div>
  );
}

// 적합한 증산 컴포넌트
function TemperatureHumidity(props) {
  return (
    <div
      className={
        "px-6 py-4 border-4 rounded-xl h-full grid grid-cols-5 w-[40%] " +
        props.borderColor
      }
    >
      <div className="flex flex-col justify-between col-span-2">
        <p className="text-lg font-medium text-neutral-700 ">현재</p>
        <div className="flex items-center justify-between">
          <p className="text-xl font-medium text-neutral-500 ">온도</p>
          <p className="text-2xl font-bold text-black ">
            {props.nowTemperature}°C
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xl font-medium text-neutral-500 ">습도</p>
          <p className="text-2xl font-bold text-black ">{props.nowHumidity}%</p>
        </div>
      </div>
      <span className="w-px h-16 mx-auto mt-auto bg-slate-200"></span>
      <div className="flex flex-col justify-between col-span-2">
        <p className="text-lg font-medium text-neutral-700 ">추천</p>
        <div className="flex items-center justify-between">
          <p className="text-xl font-medium text-neutral-500 ">온도</p>
          <p className="text-2xl font-bold text-black ">
            {props.suggestionTemperature}°C
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xl font-medium text-neutral-500 ">습도</p>
          <p className="text-2xl font-bold text-black ">
            {props.suggestionHumidity}%
          </p>
        </div>
      </div>
    </div>
  );
}

// 적합한 증산 컴포넌트
function SuitableTranspiration(props) {
  return (
    <div
      className={
        "flex flex-col justify-between h-full px-6 py-4 border rounded-xl border-neutral-400 " +
        props.width +
        " " +
        props.margin
      }
    >
      <p className="text-xl font-medium text-neutral-500">{props.title}</p>
      <p className=" text-[32px] font-bold text-black text-right">
        {props.time}
      </p>
    </div>
  );
}

export default Environment;
