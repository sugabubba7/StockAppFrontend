import React from "react";
import BackgroundLayout from "@/components/ui/background-layout.jsx";
import { SimpleFloatingNav , NavLink  } from "@/components/Header.jsx";
// import { BubbleButton } from "../Login/Login";

const IndianStock = () => (
    <BackgroundLayout>
      <SimpleFloatingNav />
      <h1 className="text-4xl text-white">Indian Stocks 4 U</h1>
    </BackgroundLayout>
  );
export default IndianStock;