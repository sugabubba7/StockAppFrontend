import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";


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
      <Button className="bg-black hover:bg-slate-700" onClick= {() => navigate('/chat')}>Chat</Button>
      <Button className="bg-black hover:bg-slate-700" onClick={() => navigate('/') }>Home</Button>
      <Button className="bg-black hover:bg-slate-700" onClick= {() => navigate('/crypto') }>Crypto Market</Button>
      <Button className="bg-black hover:bg-slate-700" onClick= {() => navigate('/stock') }>Stock Market</Button>
      <Button className="bg-black hover:bg-slate-700" onClick= {() => navigate('/login')}>Login/Register</Button>
    </div>
  );
}

export default Header;
