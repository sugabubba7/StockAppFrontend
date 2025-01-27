import React from "react";
import BackgroundLayout from "@/components/ui/background-layout.jsx";
import { SimpleFloatingNav , NavLink  } from "@/components/Header.jsx";
// import { firstLine, secondLine } from "../Home/Home";

function Crypto() {
  return (
    <BackgroundLayout>
      < SimpleFloatingNav />  
      {/* <h1>
        <firstLine text="Crypto for You" />
        <secondLine text ='Crypto Details here'/>
      </h1> */}
    </BackgroundLayout>
  );
}

export default Crypto;