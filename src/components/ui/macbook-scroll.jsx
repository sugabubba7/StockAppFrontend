"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export const MacbookScroll = ({ showGradient, title, badge }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window && window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1.1, isMobile ? 1 : 1.4]
  ); // Reduced scale start
  const scaleY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0.5, isMobile ? 1 : 1.3]
  ); // Reduced scale start
  const translate = useTransform(scrollYProgress, [0, 1], [0, 1000]); // Decreased translate range
  const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);
  const textTransform = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div
      ref={ref}
      className="min-h-[200vh] flex flex-col items-center py-0 md:py-80 justify-start flex-shrink-0 [perspective:800px] transform md:scale-100 scale-[0.3] sm:scale-45" // Adjusted scale
    >
      <motion.h2
        style={{
          translateY: textTransform,
          opacity: textOpacity,
        }}
        className="dark:text-white text-neutral-800 text-3xl font-bold mb-20 text-center"
      >
        {title || (
          <span className="text-white">
            Trade Smart, Learn Faster. <br />
          </span>
        )}
      </motion.h2>
      {/* Lid */}
      <Lid
        scaleX={scaleX}
        scaleY={scaleY}
        rotate={rotate}
        translate={translate}
      />
      {/* Base area */}
      <div
        className="h-[20rem] w-[30rem] bg-gray-200 dark:bg-[#272729] rounded-2xl overflow-hidden relative -z-10" // Reduced base size
      >
        {/* Above keyboard bar */}
        <div className="h-10 w-full relative">
          <div className="absolute inset-x-0 mx-auto w-[80%] h-4 bg-[#050505]" />
        </div>
        <div className="flex relative">
          <div className="mx-auto w-[10%] overflow-hidden h-full">
            <SpeakerGrid />
          </div>
          <div className="mx-auto w-[80%] h-full">
            {/* Full Macbook keyboard with glowing keys */}
            <Keypad />
          </div>
          <div className="mx-auto w-[10%] overflow-hidden h-full">
            <SpeakerGrid />
          </div>
        </div>
        <Trackpad />
        <div className="h-2 w-20 mx-auto inset-x-0 absolute bottom-0 bg-gradient-to-t from-[#272729] to-[#050505] rounded-tr-3xl rounded-tl-3xl" />
        {showGradient && (
          <div className="h-40 w-full absolute bottom-0 inset-x-0 bg-gradient-to-t dark:from-black from-white via-white dark:via-black to-transparent z-50"></div>
        )}
        {badge && <div className="absolute bottom-4 left-4">{badge}</div>}
      </div>
    </div>
  );
};

// Same Lid and Trackpad components
export const Lid = ({ scaleX, scaleY, rotate, translate }) => {
  return (
    <div className="relative [perspective:800px]">
      <div
        style={{
          transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
          transformOrigin: "bottom",
          transformStyle: "preserve-3d",
        }}
        className="h-[12rem] w-[30rem] bg-[#010101] rounded-2xl p-2 relative"
      >
        <div
          style={{
            boxShadow: "0px 2px 0px 2px black inset", // Changed edge to black
          }}
          className="absolute inset-0 bg-[#010101] rounded-lg flex items-center justify-center"
        />
      </div>

      <motion.div
        style={{
          scaleX: scaleX,
          scaleY: scaleY,
          rotateX: rotate,
          translateY: translate,
          transformStyle: "preserve-3d",
          transformOrigin: "top",
        }}
        className="h-96 w-[30rem] absolute inset-0 bg-[#010101] rounded-2xl p-2"
      >
        <div
          className="absolute inset-0 bg-black rounded-lg"
        />
        <video
          className="object-cover object-left-top absolute rounded-lg inset-0 h-full w-full"
          muted
          autoPlay
          loop
          playsInline
          disableRemotePlayback
          poster="https://static.tradingview.com/static/bundles/chart.91804d5594db36618275.webp"
        >
          <source
            src="https://static.tradingview.com/static/bundles/chart.hvc1.6ad975a60abab376b872.mp4"
            type="video/mp4;codecs=hvc1.1.0.L150.b0"
          />
          <source
            src="https://static.tradingview.com/static/bundles/chart.c1cfe204b1c203ff7dd2.webm"
            type="video/webm"
          />
          <source
            src="https://static.tradingview.com/static/bundles/chart.avc1.786d26d6f5289b0db8aa.mp4"
            type="video/webm;codecs=avc1"
          />
        </video>
      </motion.div>
    </div>
  );
};


export const Trackpad = () => {
  return (
    <div
      className="w-[35%] mx-auto h-32 rounded-xl my-1" // Slightly smaller trackpad
      style={{
        boxShadow: "0px 0px 1px 1px #00000020 inset",
      }}
    ></div>
  );
};

export const Keypad = () => {
  return (
    <div className="h-full rounded-md bg-[#050505] mx-1 p-1">
      {/* Full Macbook keyboard */}
      <div className="grid grid-cols-12 gap-2">
        {/* Row 1: Function keys */}
        <KBtn className="col-span-1">esc</KBtn>
        <KBtn className="col-span-1">F1</KBtn>
        <KBtn className="col-span-1">F2</KBtn>
        <KBtn className="col-span-1">F3</KBtn>
        <KBtn className="col-span-1">F4</KBtn>
        <KBtn className="col-span-1">F5</KBtn>
        <KBtn className="col-span-1">F6</KBtn>
        <KBtn className="col-span-1">F7</KBtn>
        <KBtn className="col-span-1">F8</KBtn>
        <KBtn className="col-span-1">F9</KBtn>
        <KBtn className="col-span-1">F10</KBtn>
        <KBtn className="col-span-1">F11</KBtn>
        <KBtn className="col-span-1">F12</KBtn>

        {/* Row 2: Number keys */}
        <KBtn className="col-span-1">~</KBtn>
        <KBtn className="col-span-1">1</KBtn>
        <KBtn className="col-span-1">2</KBtn>
        <KBtn className="col-span-1">3</KBtn>
        <KBtn className="col-span-1">4</KBtn>
        <KBtn className="col-span-1">5</KBtn>
        <KBtn className="col-span-1">6</KBtn>
        <KBtn className="col-span-1">7</KBtn>
        <KBtn className="col-span-1">8</KBtn>
        <KBtn className="col-span-1">9</KBtn>
        <KBtn className="col-span-1">0</KBtn>
        <KBtn className="col-span-1">-</KBtn>
        <KBtn className="col-span-1">+</KBtn>

        {/* Row 3: Alphabet keys */}
        <KBtn className="col-span-1">Q</KBtn>
        <KBtn className="col-span-1">W</KBtn>
        <KBtn className="col-span-1">E</KBtn>
        <KBtn className="col-span-1">R</KBtn>
        <KBtn className="col-span-1">T</KBtn>
        <KBtn className="col-span-1">Y</KBtn>
        <KBtn className="col-span-1">U</KBtn>
        <KBtn className="col-span-1">I</KBtn>
        <KBtn className="col-span-1">O</KBtn>
        <KBtn className="col-span-1">P</KBtn>
        <KBtn className="col-span-1">[</KBtn>
        <KBtn className="col-span-1">]</KBtn>

        {/* Row 4: Alphabet keys continued */}
        <KBtn className="col-span-1">A</KBtn>
        <KBtn className="col-span-1">S</KBtn>
        <KBtn className="col-span-1">D</KBtn>
        <KBtn className="col-span-1">F</KBtn>
        <KBtn className="col-span-1">G</KBtn>
        <KBtn className="col-span-1">H</KBtn>
        <KBtn className="col-span-1">J</KBtn>
        <KBtn className="col-span-1">K</KBtn>
        <KBtn className="col-span-1">L</KBtn>
        <KBtn className="col-span-1">;</KBtn>
        <KBtn className="col-span-1">'</KBtn>

        {/* Row 5: Shift and modifiers */}
        <KBtn className="col-span-2">Shift</KBtn>
        <KBtn className="col-span-1">Z</KBtn>
        <KBtn className="col-span-1">X</KBtn>
        <KBtn className="col-span-1">C</KBtn>
        <KBtn className="col-span-1">V</KBtn>
        <KBtn className="col-span-1">B</KBtn>
        <KBtn className="col-span-1">N</KBtn>
        <KBtn className="col-span-1">M</KBtn>

        <KBtn className="col-span-1">,</KBtn>
        <KBtn className="col-span-1">.</KBtn>
        <KBtn className="col-span-2">Option</KBtn>
        <KBtn className="col-span-2">Command</KBtn>
        <KBtn className="col-span-1">/</KBtn>
        <KBtn className="col-span-3">Enter</KBtn>
        <KBtn className="col-span-2">Control</KBtn>
        <KBtn className="col-span-6">Space</KBtn>
        <KBtn className="col-span-2">Shift</KBtn>

        {/* Row 6: Spacebar */}

        {/* Row 7: Enter and modifiers */}
      </div>
    </div>
  );
};

export const KBtn = ({ children, className }) => {
  return (
    <div
      className={cn(
        "p-[0.5px] rounded-[4px] bg-[#0A090D] flex items-center justify-center text-neutral-200 text-sm",
        className
      )}
    >
      {children}
    </div>
  );
};

export const SpeakerGrid = () => {
  return (
    <div
      className="flex px-[0.5px] gap-[2px] mt-2 h-40"
      style={{
        backgroundImage:
          "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
        backgroundSize: "3px 3px",
      }}
    ></div>
  );
};
