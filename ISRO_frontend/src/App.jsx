import React from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Chat from "./Pages/Chat.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Footer from "./Components/Footer.jsx";
import Themeprovider from "./Context/theme/Themeprovider.jsx";
import StarField from "./Components/ui/StarField";
import ErrorPage from "../src/Components/Error.jsx"; 

export default function App() {
  return (
    <div className="w-screen h-screen bg-white dark:bg-[#0d0d0f] transition-colors duration-300 overflow-x-hidden scrollbar-hide">
      <Themeprovider>
        <div>
          <BrowserRouter>
            <StarField />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>

            <Footer />
          </BrowserRouter>
        </div>
      </Themeprovider>
    </div>
  );
}
