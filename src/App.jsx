import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CandlePattern from "./pages/Learn/CandlePattern";
import CandleDetail from "./pages/candleDetails/CandleDetails";
import Header from "./components/Header";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/candleStick" element={<CandlePattern />} />
        <Route path="/candle/:candleName" element={<CandleDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
