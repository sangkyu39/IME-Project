import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import MyPage from "./routes/MyPage";
import AdminMypage from "./routes/AdminMypage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/admin" element={<AdminMypage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
