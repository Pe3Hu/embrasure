import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Layout } from "antd";
import Profile from "../Profile";
import { ToastContainer } from "react-toastify";

import { auth } from "../../config/firebase";

const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#c13429",
};

export default function AppSider() {
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  return (
    <Layout.Sider width="20%" style={siderStyle}>
      <Router>
        <Routes>
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <ToastContainer />
      </Router>
    </Layout.Sider>
  );
}
