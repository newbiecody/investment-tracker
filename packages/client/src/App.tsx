import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";

import { Routes, Route } from "react-router-dom";
import News from "./pages/News";

function App() {
  return (
    <>
      <Navbar />
      <div className="w-full h-full flex justify-center items-center pt-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
