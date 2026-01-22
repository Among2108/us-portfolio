import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";
import { MdOutlineTouchApp } from "react-icons/md";

const Contact = () => {
  const logo = [
    {
      link: "https://www.linkedin.com/in/oassalam-promjit-68a5b7378/",
      img: "/linkedin.png",
    },
    {
      link: "https://www.facebook.com/oassalam.promjit.2024",
      img: "/facebook.png",
    },
    { link: "http://line.me/ti/p/~lokikilo", img: "/line.png" },
    { link: "mailto:oassalam2108@gmail.com", img: "/gmail.webp" }, // ✅ ใส่ / ให้เหมือนตัวอื่น
    {
      link: "https://www.instagram.com/among_uszq?igsh=YTFseXk0dThlbG1u&utm_source=qr",
      img: "/ig.png",
    },
    { link: "https://github.com/Among2108", img: "/github.png" },
  ];

  // ✅ ประกาศ autoplay ให้เรียบร้อย
  const autoplay = useRef(
    Autoplay({
      delay: 2500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  return (
    // ✅ ทำให้ absolute video อิงกับ section นี้ ไม่ลอยไปทั้งหน้า
    <section className="relative min-h-[80dvh] overflow-hidden">
      {/* BG video */}
      <video
        src="/BG.mp4"
        autoPlay
        loop
        muted
        preload="auto"
        playsInline
        className="absolute inset-0 h-full w-full object-cover z-0"
      />

      {/* (optional) overlay ให้ตัวหนังสืออ่านง่ายขึ้น */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      {/* Content */}
      <div className="relative z-10 min-h-[80dvh] flex flex-col items-center justify-around text-white px-4">
        <h2 className="text-4xl font-bold">Contact Me!!</h2>
        <div className="flex flex-col justify-center items-center">
         <FaArrowCircleLeft className="size-10 animate-arrowRight" />
          <Carousel
            className="w-full max-w-5xl "
            plugins={[autoplay.current]}
            opts={{  loop: true }}
          >
            <CarouselContent className="-mt-1">
              {logo.map((i, index) => (
                <CarouselItem
                  key={index}
                  className="pt-1 basis-full sm:basis-1/3"
                >
                  <div className="p-2 h-full">
                    <Card className="h-full">
                      <a href={i.link} target="_blank" rel="noreferrer">
                        <CardContent className="flex  h-56 items-center justify-center p-6">
                          <img
                            src={i.img}
                            alt=""
                            className="max-h-full max-w-full object-contain"
                            loading="lazy"
                          />
                        </CardContent>
                      </a>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

           
            
          </Carousel>
          <FaArrowCircleRight className="size-10" />
        </div>
      </div>
    </section>
  );
};

export default Contact;
