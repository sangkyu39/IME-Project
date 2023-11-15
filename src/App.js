import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Main from "./routes/Main";
import MyPage from "./routes/MyPage";
import SettingTime from "./routes/SettingTime";
import User from "./routes/User";
import Landing from "./routes/Landing";
import Manage from "./routes/Manage";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<MyPage />} />
          <Route path="/reserve" element={<Main />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/setting" element={<SettingTime />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
