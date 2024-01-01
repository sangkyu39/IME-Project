import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import MyPage from "./routes/MyPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
