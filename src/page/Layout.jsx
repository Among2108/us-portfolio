import CustomCursor from "@/components/CustomCursor";
import React from "react";
import { Outlet } from "react-router-dom";
// import VantaBirds from "@/components/VantaBirds";

const Layout = () => {
  return (
    <div>
      {/* <VantaBirds className="h-full"> */}
      <CustomCursor
        src="/acursor.png"
        hoverSrc=""
        clickSrc="Click.png"
        scrollDownSrc="/upp.png"
        scrollUpSrc="/upp.png"
        size={80}
        ringSize={50}
        ringSmoothing={0.05}
        scrollUpSize={120} 
        scrollDownSize={120}
      />

      <Outlet />
      {/* </VantaBirds> */}
    </div>
  );
};

export default Layout;
