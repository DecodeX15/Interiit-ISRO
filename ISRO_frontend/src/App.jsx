// App.jsx
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Chat from "./Pages/Chat.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
export default function App() {
  return (
    <div className="w-screen h-screen bg-white dark:bg-[#0d0d0f] transition-colors duration-300 overflow-hidden">
      <Navbar />  
      
      <div className="pt-16 h-screen overflow-hidden">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>

    </div>
  );
}
