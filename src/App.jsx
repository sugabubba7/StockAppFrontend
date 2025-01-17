import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CandlePattern from "./pages/Learn/CandlePattern";
import CandleDetail from "./pages/candleDetails/CandleDetails";
import Home from "./pages/Home/Home";
import ChatBot from "./pages/ChatBot/ChatBot";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/chat" element={<ChatBot/>}/>
        <Route path="/candleStick" element={<CandlePattern />} />
        <Route path="/candle/:candleName" element={<CandleDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
