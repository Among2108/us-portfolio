import VantaHalo from "../components/VantaHalo";
import ScrollTimelineIndicator from "../components/ScrollTimelineIndicator";
import ScrollReveal from "../components/ScrollReveal";
import SlideInLeft from "../components/SlideInLeft";
import SlideInRight from "../components/SlideInRight";
import { useRef } from "react";
import { FaDownLong } from "react-icons/fa6";
const Home = () => {
  const text = "I'm US";
  const contentRef = useRef(null);

  return (
    <>
      <header>
        <VantaHalo className="h-screen w-full">
          <div className="flex h-screen items-center justify-center">
            <h1 className="present text-8xl font-bold text-white">
              {text.split("").map((c, i) => (
                <span
                  key={i}
                  className="char inline-block"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {c === " " ? "\u00A0" : c}
                </span>
              ))}
            </h1>
          </div>
        </VantaHalo>
      </header>
      <main className="bg-black">
        <div className="h-[80dvh] flex justify-center items-center ">
          <div className="text-5xl text-white flex animate-[blink_1s_infinite] ">
            <FaDownLong />
            <p className=" text-center "> keep scolling down </p>
            <FaDownLong />
          </div>
        </div>
        <ScrollReveal distance={200} fadeRange={1200}>
          <div className="flex justify-between h-[70dvh] pl-10 ">
            <div className=" w-1/2 flex flex-col gap-10">
              <div>
                <h2 className="">junior software </h2>
                <h2 className="">developer</h2>
              </div>
              <button className="mt-10    w-fit">resume</button>
              <div className="mt-10">
                <p className="text-2xl text-white ">
                  I am a Junior Software Developer with a strong interest in
                  building modern, user-friendly web applications. I enjoy
                  working with React, JavaScript, and Tailwind CSS, especially
                  when transforming designs into clean, responsive interfaces
                  with a focus on good UI/UX. I enjoy experimenting with new
                  tools and technologies, learning quickly, and improving
                  through hands-on experience. I am comfortable debugging logic,
                  integrating APIs, and collaborating on real-world team
                  projects. I am motivated to grow as a developer while
                  contributing meaningful value to both the team and the
                  product.
                </p>
              </div>
            </div>
            <div className="">
              <img
                src="/IMG_8105.jpg"
                alt=""
                className="h-full w-auto object-contain rounded-l-full   "
              />
            </div>
          </div>
          <div className="h-full pt-10 ">
            <h2 className="text-center">Experience</h2>
            <div className=" pt-10 pr-5 pl-5">
              <div className="w-full flex justify-between gap-10 ">
                {/* เส้นแสดงปี */}
                <div className="hidden md:block">
                  <ScrollTimelineIndicator
                    targetRef={contentRef}
                    height={1000}
                    topOffset={96}
                    startLabel="2024"
                    endLabel="2026"
                  />
                </div>

                {/* ขวา: ประสบการทำงาน */}
                <div ref={contentRef} className="">
                  <section className="rounded-xl  p-6 shadow-sm">
                    <SlideInLeft>
                      <div className="h-dvh flex gap-3  items-center ">
                      <img src="/Which Apple Products Are Really Worth Your Money_ (Updated).jpg" alt="" className="w-1/2 rounded-4xl" />
                      <div className="">
                        <h3 className="text-2xl text-blue-300 font-semibold">
                          Icare (Apple Provider)
                        </h3>
                        <p className="mt-2 text-white  ">
                          Provided customer service and administrative support
                          at an Apple service center Diagnosed and repaired
                          iPhone hardware issues following service procedures
                          Managed repair records, customer data, and service
                          documentation Communicated with customers to explain
                          technical issues and repair solutions Developed strong
                          problem-solving, attention to detail, and service
                          mindset
                        </p>
                      </div>
                    </div>
                    </SlideInLeft>
                    <SlideInRight>

                    
                    <div className="h-dvh flex gap-3  items-center">
                      <div className="ml-auto ">
                        <h3 className="text-2xl text-blue-300 font-semibold text-right">
                          Genaration Thailand
                        </h3>
                        <p className="mt-2 text-white  ml-auto text-right">
                          Generation Bootcamp Thailand My experience at
                          Generation Thailand Bootcamp provided a strong
                          foundation for my journey as a Junior Software
                          Developer. I gained hands-on experience in building
                          web applications with JavaScript and React, practiced
                          real-world development workflows using Git, and
                          collaborated on team projects. The program also
                          strengthened my problem-solving, communication, and
                          adaptability, preparing me to grow confidently in a
                          professional software development environment.
                        </p>
                        
                      </div>
                       <img src="/032.png" alt="" className="w-1/2 rounded-4xl" />
                    </div>
                    </SlideInRight>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </main>
    </>
  );
};

export default Home;
