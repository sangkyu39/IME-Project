import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import MyPage from "./routes/MyPage";
import AdminMypage from "./routes/AdminMypage";
import Reserve from "./routes/Reserve";
import AdminLocker from "./routes/AdminLocker";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/admin/studentManagement" element={<AdminMypage />} />
          <Route path="/admin/lockerManagement" element={<AdminLocker />} />
          <Route path="/reserve" element={<Reserve />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
