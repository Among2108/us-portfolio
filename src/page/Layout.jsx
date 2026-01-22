import CustomCursor from "@/components/CustomCursor";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <CustomCursor
        src="/acursor.png"
        hoverSrc=""
        clickSrc="Click.png"
        scrollDownSrc="/upp.png"
        scrollUpSrc="/upp.png"
        size={80}
        ringSize={50}
        ringSmoothing={0.05}
        scrollUpSize={120} // 🔥 ปีนบันไดใหญ่ ชัด
        scrollDownSize={120}
      />

      <Outlet />
    </div>
  );
};

export default Layout;
