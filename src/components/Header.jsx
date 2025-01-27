import React from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { motion } from "framer-motion";

function Header() {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div
      className="p-5  shadow-2xl bg-gray-500 flex justify-between items-center"
      style={{
        position: "fixed",
        top: "0", // Align to the top of the viewport
        left: "0", // Align to the left of the viewport
        right: "0", // Full width across the page
        zIndex: 1000, // Ensure it's above other content
        background: "rgba( 9, 84, 59, 0.1)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
        borderTopLeftRadius: "0",
        borderTopRightRadius: "0",
        borderBottom: "1px solid rgba(255, 255, 255, 0.18)",
      }}
    >
      <div className="ml-auto flex gap-5">
        <HoverBorderGradient onClick={() => navigate("/")}>
          Home
        </HoverBorderGradient>
        <HoverBorderGradient onClick={() => navigate("/stock")}>
          Stock Market
        </HoverBorderGradient>
        <HoverBorderGradient onClick={() => navigate("/crypto")}>
          Crypto Market
        </HoverBorderGradient>
        <HoverBorderGradient onClick={() => navigate("/learn")}>
          Learn
        </HoverBorderGradient>
        <HoverBorderGradient onClick={() => navigate("/chat")}>
          Chat
        </HoverBorderGradient>
        <HoverBorderGradient onClick={() => navigate("/login")}>
          Login/Register
        </HoverBorderGradient>
      </div>
    </div>
  );
}

const Example = () => {
  return (
    <section className="bg-neutral-950">
      <SimpleFloatingNav />
    </section>
  );
};

export const SimpleFloatingNav = () => {
  return (
    <nav className="fixed left-[50%] top-8 flex w-fit -translate-x-[50%] items-center gap-6 rounded-lg border-[1px] border-neutral-700 bg-neutral-900 p-2 text-sm text-neutral-500">
      <Logo />

      <NavLink link = "/">Home</NavLink>
      <NavLink link = "/stock">Stock</NavLink>
      <NavLink link = '/crypto'>Crypto</NavLink>
      <NavLink link = '/learn'>Learn</NavLink>
      <NavLink link = '/chat'>Chat</NavLink>

      <JoinButton />
    </nav>
  );
};

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 50 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ml-2 fill-neutral-50"
    >
      <path
        d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
        stopColor="#000000"
      ></path>
      <path
        d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
        stopColor="#000000"
      ></path>
    </svg>
  );
};

export const NavLink = ({ children, link }) => {
  return (
    <a href={link} rel="nofollow" className="block overflow-hidden">
      <motion.div
        whileHover={{ y: -20 }}
        transition={{ ease: "backInOut", duration: 0.5 }}
        className="h-[20px]"
      >
        <span className="flex h-[20px] items-center">{children}</span>
        <span className="flex h-[20px] items-center text-neutral-50">
          {children}
        </span>
      </motion.div>
    </a>
  );
};

const JoinButton = () => {
  return (
    <button 
      className={`
          relative z-0 flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-lg border-[1px] 
          border-neutral-700 px-4 py-1.5 font-medium
         text-neutral-300 transition-all duration-300
          
          before:absolute before:inset-0
          before:-z-10 before:translate-y-[200%]
          before:scale-[2.5]
          before:rounded-[100%] before:bg-neutral-50
          before:transition-transform before:duration-1000
          before:content-[""]
  
          hover:scale-105 hover:border-neutral-50 hover:text-neutral-900
          hover:before:translate-y-[0%s]
          active:scale-100`}
    >
      <Link to="/login">Register</Link>
    </button>
  );
};


export default Example ;
// export default Header;