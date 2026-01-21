import VantaHalo from "../components/VantaHalo";


const Home = () => {
  const text = "I'm US";

  return (
    <>
      <header>
      <VantaHalo className="h-screen w-full">
      <div className="flex h-screen items-center justify-center">
        <h1 className="present text-8xl font-bold text-white ">
  {text.split("").map((c, i) => (
    <span
      key={i}
      className="char inline-block"
      style={{ animationDelay: `${i * 0.5}s` }}
    >
      {c === " " ? "\u00A0" : c}
    </span>
  ))}
</h1>
      </div>
    </VantaHalo>
    </header>
    <main>
      <div className="flex justify-between h-[30dvh] pl-10 ">
        <div className="flex flex-col ">
          <div>
          <h2 className="" >junior software </h2>
          <h2 className="">developer</h2>
          </div>
          <button className="mt-6  w-fit">resume</button>
        </div>
        <div className="">
          <img src="/IMG_8105.jpg" alt=""  className="h-full w-auto object-contain rounded-l-full   "/>
        </div>
      </div>
    </main>
    </>
  );
};

export default Home;
