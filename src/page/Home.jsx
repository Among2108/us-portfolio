import { useRef, useEffect, useState } from "react";
import VantaBirds from "../components/VantaBirds";
import ScrollTimelineIndicator from "../components/ScrollTimelineIndicator";
import ScrollReveal from "../components/ScrollReveal";
import SlideInLeft from "../components/SlideInLeft";
import SlideInRight from "../components/SlideInRight";
import Contact from "@/components/Contact";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import SkillCart from "@/components/SkillCart";
import { FaDownLong } from "react-icons/fa6";
import { FiStar } from "react-icons/fi";
import { GiBrain } from "react-icons/gi";
import { IoPawSharp } from "react-icons/io5";
import { FaArrowUp } from "react-icons/fa";

const Home = () => {
  const textex = "Experience";
  const text = "I'm US";
  const contentRef = useRef(null);

  const skill = [
    { name: "HTML", pic: "/HTML.png" },
    { name: "CSS", pic: "/CSS.png" },
    { name: "Java", pic: "/Java.jpg" },
    { name: "Tailwind", pic: "/Tailwind.png" },
    { name: "React", pic: "/React.png" },
    { name: "Nodejs", pic: "/node-new.png" },
    { name: "Expressjs", pic: "/1_HkM78Z1G5UKqQNCHwBHRfA.png" },
    { name: "Figma", pic: "/Figma.webp" },
     { name: "MongoDB", pic: "/mongodb.png" },
     { name: "postgresql", pic:"/sql.png"}
  ];

const handleAddToCart = (skill) => {
  const stored = JSON.parse(localStorage.getItem("skills")) || [];

  const exists = stored.find((item) => item.name === skill.name);
  if (exists) {
    toast.warning("Skill นี้ถูกเพิ่มแล้ว", {
      description: skill.name,
    });
    return;
  }

  stored.push(skill);
  localStorage.setItem("skills", JSON.stringify(stored));

  setSkillCount(stored.length);
  setBadgeBump(true);
  setTimeout(() => setBadgeBump(false), 300);

  toast.success("เพิ่ม Skill สำเร็จ 🎉", {
    description: skill.name,
  });
};

const refreshSkillCount = () => {
  const stored = JSON.parse(localStorage.getItem("skills")) || [];
  setSkillCount(stored.length);
};

  const [skillCount, setSkillCount] = useState(0);
  const [show, setShow] = useState(false);
  const [locked, setLocked] = useState(true);
  const [badgeBump, setBadgeBump] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const updateCount = () => {
      const stored = JSON.parse(localStorage.getItem("skills")) || [];
      setSkillCount(stored.length);
    };
    updateCount();

    const y = window.scrollY;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.classList.add("scroll-lock");
    document.body.style.top = `-${y}px`;
    document.body.style.paddingRight = scrollbarWidth
      ? `${scrollbarWidth}px`
      : "0px";

    const timer = setTimeout(() => {
      document.body.classList.remove("scroll-lock");

      const top = document.body.style.top;
      document.body.style.top = "";
      document.body.style.paddingRight = "";

      const restoreY = parseInt(top || "0", 10) * -1;
      window.scrollTo({ top: restoreY, left: 0, behavior: "auto" });

      setLocked(false);
      setShow(true);
    }, 5500);
    window.addEventListener("storage", updateCount);
    return () => {
      clearTimeout(timer);
      document.body.classList.remove("scroll-lock");
      document.body.style.top = "";
      document.body.style.paddingRight = "";
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  return (
    <>
 <header className="relative bg-black overflow-hidden">
  <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-[2px] bg-black" />
  <VantaBirds className="block h-full w-full">
          <div className="flex h-[95dvh] items-center justify-center px-4">
            <h1 className="present text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white text-center">
              {text.split("").map((c, i) => (
                <span
                  key={i}
                  className="char inline-block"
                  style={{ animationDelay: `${i * 1}s` }}
                >
                  {c === " " ? "\u00A0" : c}
                </span>
              ))}
            </h1>
          </div>
          <p
            className={`text-center text-xl sm:text-2xl md:text-3xl text-amber-50 transition-all duration-1000 flex justify-center gap-3 sm:gap-5 px-4
        ${
          show
            ? "opacity-100 translate-y-0 animate-bounce"
            : "opacity-0 translate-y-10"
        }`}
          >
            <FaArrowUp />
            pull up
            <FaArrowUp />
          </p>
        </VantaBirds>
      </header>

      <main className="bg-black ">
        <div className="h-[120dvh] flex justify-center items-center px-4">
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-teal-100 flex items-center gap-2 sm:gap-4 animate-[blink_1s_infinite] ">
            <FaDownLong className="shrink-0" />
            <p className="text-center"> keep scrolling down </p>
            <FaDownLong className="shrink-0" />
          </div>
        </div>

        <ScrollReveal distance={200} fadeRange={1200}>
          <div className="flex flex-col lg:flex-row  lg:justify-between min-h-[70dvh] px-4 sm:px-6 lg:pl-10 gap-8 lg:gap-0">
            <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:gap-10">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl">junior software </h2>
                <h2 className="text-3xl sm:text-4xl md:text-5xl">developer</h2>
              </div>

              <div className="flex justify-center lg:justify-start">
                <a
                  href="https://drive.google.com/file/d/13jMfuLICYL2a-vXtjmifx2LlIHVVhnCa/view?usp=sharing"
                  target="blank"
                >
                  <button className="mx-auto">resume</button>
                </a>
              </div>

              <div className="mt-4 lg:mt-10">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white ">
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

            <div className="w-full lg:w-auto flex justify-center lg:justify-end">
              <img
                src="/IMG_8105.jpg"
                alt=""
                className="h-64 max-h-screen sm:h-80 md:h-96 lg:h-full w-auto object-contain lg:rounded-l-full"
              />
            </div>
          </div>

          <div className="h-full pt-10 px-4">
            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold">
              {textex.split("").map((char, index) => (
                <span
                  key={index}
                  className="rainbow-char"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {char}
                </span>
              ))}
            </h2>

            <div className="pt-10 pr-2 sm:pr-5 pl-2 sm:pl-5">
              <div className="w-full flex flex-col md:flex-row justify-between gap-6 md:gap-10">
                <div className="hidden md:block shrink-0">
                  <ScrollTimelineIndicator
                    targetRef={contentRef}
                    height={1000}
                    topOffset={96}
                    startLabel="2024"
                    endLabel="2026"
                  />
                </div>

                <div ref={contentRef} className="w-full">
                  <section className="rounded-xl p-4 sm:p-6 shadow-sm">
                    <SlideInLeft>
                      <div className="min-h-[50vh] md:h-dvh flex flex-col md:flex-row gap-4 sm:gap-6 items-center py-8">
                        <img
                          src="/Which Apple Products Are Really Worth Your Money_ (Updated).jpg"
                          alt=""
                          className="w-full md:w-1/2 rounded-2xl sm:rounded-4xl"
                        />
                        <div className="w-full md:w-1/2">
                          <h3 className="text-xl sm:text-2xl md:text-3xl text-blue-300 font-semibold">
                            Icare (Apple Provider)
                          </h3>
                          <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl text-white">
                            Provided customer service and administrative support
                            at an Apple service center Diagnosed and repaired
                            iPhone hardware issues following service procedures
                            Managed repair records, customer data, and service
                            documentation Communicated with customers to explain
                            technical issues and repair solutions Developed
                            strong problem-solving, attention to detail, and
                            service mindset
                          </p>
                        </div>
                      </div>
                    </SlideInLeft>

                    <SlideInRight>
                      <div className="min-h-[50vh] md:h-dvh flex flex-col md:flex-row-reverse gap-4 sm:gap-6 items-center py-8">
                        <img
                          src="/032.png"
                          alt=""
                          className="w-full md:w-1/2 rounded-2xl sm:rounded-4xl"
                        />
                        <div className="w-full md:w-1/2">
                          <h3 className="text-xl sm:text-2xl md:text-3xl text-blue-300 font-semibold text-left md:text-right">
                            Generation Thailand
                          </h3>
                          <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl text-white text-left md:text-right">
                            Generation Bootcamp Thailand My experience at
                            Generation Thailand Bootcamp provided a strong
                            foundation for my journey as a Junior Software
                            Developer. I gained hands-on experience in building
                            web applications with JavaScript and React,
                            practiced real-world development workflows using
                            Git, and collaborated on team projects. The program
                            also strengthened my problem-solving, communication,
                            and adaptability, preparing me to grow confidently
                            in a professional software development environment.
                          </p>
                        </div>
                      </div>
                    </SlideInRight>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="h-[20dvh]"></div>

        <VantaBirds className="h-full w-full ">
        <section className="skill">
  <div className="min-h-screen px-4">
    <div className="flex justify-center items-center gap-3 pt-3">
      <h2 className="text-3xl sm:text-4xl md:text-5xl">skill</h2>

      <Dialog
        onOpenChange={(open) => {
          if (open) {
            const stored = JSON.parse(localStorage.getItem("skills")) || [];
            setSkillCount(stored.length);
          }
        }}
      >
        <DialogTrigger asChild>
          <button
            className="
              relative bg-blue-100 my-auto
              h-16 w-16 sm:h-20 sm:w-20 inline-flex items-center justify-center
              rounded-full
            "
          >
            <GiBrain className="text-4xl sm:text-5xl text-rose-400" />

            {skillCount > 0 && (
                <span
    className={`
      absolute -top-2 -right-2
      h-5 min-w-5 sm:h-6 sm:min-w-6 px-1
      rounded-full bg-red-500
      text-white text-xs sm:text-sm font-bold
      flex items-center justify-center
      transition-transform duration-300
      ${badgeBump ? "scale-125 animate-bounce" : "scale-100"}
    `}
  >
                {skillCount > 99 ? "99+" : skillCount}
              </span>
            )}
          </button>
        </DialogTrigger>

        <DialogContent
          showCloseButton={false}
          className="w-[95vw] sm:w-[85vw] md:w-[80vw] max-w-[900px]"
        >
          <DialogDescription>
            <SkillCart onChange={() => {
    const stored = JSON.parse(localStorage.getItem("skills")) || [];
    setSkillCount(stored.length);
  }} />
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
    
    <h3 className="text-2xl sm:text-3xl md:text-4xl text-white text-center pt-10 animate-pulse px-4">
      click!! to up skill
    </h3>
    
    <ul className="flex justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 flex-wrap mt-8 sm:mt-12 w-[95%] sm:w-[85%] md:w-[75%] lg:w-[60%] mx-auto">
      {skill.map((i, index) => (
        <li key={index}>
          <Card
            className="
              cursor-pointer
              relative mx-auto h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-60 lg:w-60
              transition-transform duration-300 ease-out
              hover:-translate-y-2 hover:rotate-1
              focus-within:ring-2 focus-within:ring-amber-400
            "
            role="button"
            tabIndex={0}
            onClick={() => handleAddToCart(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleAddToCart(i);
              }
            }}
          >
            <img
              src={i.pic}
              alt={i.name}
              className="h-28 sm:h-32 md:h-36 lg:h-40 w-full object-contain pt-2"
              loading="lazy"
            />
            <CardHeader className="p-2 sm:p-4">
             
            </CardHeader>
          </Card>
        </li>
      ))}
    </ul>
  </div>

  <div className="h-[20dvh]" />
</section>
        </VantaBirds>

        <section className="Myprojec min-h-screen py-10 px-4">
          <div className="">
            <div className="text-center">
              <span className="text-pink-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold flex flex-wrap justify-center items-center gap-2">
                <IoPawSharp />
                Maipaws Project
                <IoPawSharp />
              </span>

              <p className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-1/2 mx-auto text-amber-50 pt-5 text-sm sm:text-base md:text-lg">
                MaiPaws is a full-stack pet e-commerce web application designed
                with a strong focus on user experience and brand identity. The
                platform features a modern, pet-centric interface with clearly
                separated categories for dogs, cats, birds, and fish, allowing
                users to browse and shop effortlessly. The front end is built
                with React, Vite, and Tailwind CSS, emphasizing reusable
                components, smooth animations, and responsive design. To enhance
                visual engagement, the website includes interactive background
                animations and micro-interactions that create a premium, lively
                shopping experience. On the back end, MaiPaws uses Node.js,
                Express, and MongoDB with a RESTful API architecture. The system
                supports authentication and authorization with JWT, role-based
                access control for admin and users, product management, image
                uploads, cart handling, and order processing. This project was
                developed using an Agile workflow with Git-based version
                control, reflecting real-world team collaboration and
                production-ready practices.
              </p>
            </div>

            <div className="flex justify-center pt-6 sm:pt-10">
              <a href="https://jsd-project-group-2.vercel.app/" target="blank" className="w-full max-w-4xl px-4">
                <video
                  className="w-full max-h-[60dvh] rounded-2xl sm:rounded-3xl md:rounded-4xl"
                  src="/maipaws.mp4"
                  autoPlay
                  loop
                  muted
                  preload="auto"
                  playsInline
                ></video>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <section className="Contact relative min-h-[80vh] overflow-hidden">
          <Contact />
        </section>
      </footer>
    </>
  );
};

export default Home;