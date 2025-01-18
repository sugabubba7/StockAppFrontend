import React from "react";
import { Button } from "./ui/button";

function Header() {
  return (
    <div className="p-5 shadow-2xl bg-gray-500 flex justify-between items-center" style={{
      background: 'rgba( 9, 84, 59, 0.1)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(5px)',
      borderBottomLeftRadius: '10px',   
      borderBottomRightRadius: '10px',  
      borderTopLeftRadius: '0',         
      borderTopRightRadius: '0',        
      borderBottom: '1px solid rgba(255, 255, 255, 0.18)',  
    }}>
      <img src="./Logo.png" alt="Stock Logo" className="h-15 w-20" />
      <Button>Login/Register</Button>
    </div>
  );
}

export default Header;
