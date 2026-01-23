import { useRef, useEffect, useState } from "react";
import VantaBirds from "../components/VantaBirds";
import ScrollTimelineIndicator from "../components/ScrollTimelineIndicator";
import ScrollReveal from "../components/ScrollReveal";
import SlideInLeft from "../components/SlideInLeft";
import SlideInRight from "../components/SlideInRight";
import Contact from "@/components/contact";

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

  // ✅ update count
  setSkillCount(stored.length);

  // ✅ trigger badge animation
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


  // ✅ FIX: Lock scroll แบบไม่กระพริบ (กัน layout shift ตอน scrollbar โผล่/หาย)
  useEffect(() => {
    // กัน browser restore scroll ตอน refresh
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

      const top = document.body.style.top; // "-123px"
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
      <header>
        <VantaBirds className="h-full w-full ">
          <div className="flex h-[95dvh] items-center justify-center">
            <h1 className="present text-8xl font-bold text-white">
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
            className={`text-center text-3xl text-amber-50 transition-all duration-1000 flex justify-center gap-5
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
        <div className="h-[120dvh] flex justify-center items-center ">
          <div className="text-5xl text-teal-100 flex animate-[blink_1s_infinite] ">
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

              <div className="flex justify-center">
                <a
                  href="https://drive.google.com/file/d/13jMfuLICYL2a-vXtjmifx2LlIHVVhnCa/view?usp=sharing"
                  target="blank"
                >
                  <button className=" mx-auto ">resume</button>
                </a>
              </div>

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
            <h2 className="text-center text-4xl font-bold">
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

            <div className=" pt-10 pr-5 pl-5">
              <div className="w-full flex justify-between gap-10 ">
                {/* เส้นแสดงปี */}
                <div className="hidden md:block shrink-0">
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
                        <img
                          src="/Which Apple Products Are Really Worth Your Money_ (Updated).jpg"
                          alt=""
                          className="w-1/2 rounded-4xl"
                        />
                        <div className="">
                          <h3 className="text-3xl text-blue-300 font-semibold">
                            Icare (Apple Provider)
                          </h3>
                          <p className="mt-2 text-xl text-white  ">
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
                      <div className="h-dvh flex gap-3  items-center">
                        <div className="ml-auto ">
                          <h3 className="text-3xl text-blue-300 font-semibold text-right">
                            Genaration Thailand
                          </h3>
                          <p className="mt-2 text-xl text-white  ml-auto text-right">
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
                        <img
                          src="/032.png"
                          alt=""
                          className="w-1/2 rounded-4xl"
                        />
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
  <div className="min-h-screen">
    <div className="flex justify-center gap-3 pt-3">
      <h2 className="">skill</h2>

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
              h-20 w-20 inline-flex items-center justify-center
              rounded-full
            "
          >
            <GiBrain className="size-17 text-rose-400" />

            {skillCount > 0 && (
                <span
    className={`
      absolute -top-2 -right-2
      h-6 min-w-6 px-1
      rounded-full bg-red-500
      text-white text-12 font-bold
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
          className="w-[80vw] max-w-[900px]"
        >
          <DialogDescription>
            <SkillCart   onChange={() => {
    const stored = JSON.parse(localStorage.getItem("skills")) || [];
    setSkillCount(stored.length);
  }} />
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  <h3 className="text-4xl text-white text-center pt-10 animate-pulse">
      click!! to up skill
    </h3>
    <ul className="flex justify-center gap-10 flex-wrap mt-12 w-[60%] mx-auto">
      {skill.map((i, index) => (
        <li key={index}>
          <Card
            className="
              cursor-pointer
              relative mx-auto h-60 w-60
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
              className="h-40 w-full object-contain"
              loading="lazy"
            />
            <CardHeader>
              <CardTitle>{i.name}</CardTitle>
            </CardHeader>
          </Card>
        </li>
      ))}
    </ul>

  
  </div>

  <div className="h-[20dvh]" />
</section>
>
        </VantaBirds>

        <section className="Myprojec h-screen">
          <div className=" ">
            <div className="text-center ">
              <span className="text-pink-300 text-5xl font-bold flex justify-center gap-2 ">
                <IoPawSharp />
                Maipaws Project
                <IoPawSharp />
              </span>

              <p className="w-1/2 mx-auto text-amber-50 pt-5">
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

            <div className="flex justify-center pt-10">
              <a href="https://jsd-project-group-2.vercel.app/" target="blank">
                <video
                  className="max-h-[60dvh] rounded-4xl"
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
