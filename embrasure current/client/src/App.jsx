import { useState, useEffect } from "react";
import axios from "axios";
import AppLayout from "./components/Layout/AppLayout";
import { ConfigProvider, Menu } from "antd";
import {
  HomeOutlined,
  MailOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  NavLink,
  Outlet,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./config/firebase";

import SingleLayout from "./components/SingleLayout";
//import AppContent from "./components/Layout/AppContent";

import Notfound from "./components/Notfound";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Rooms from "./components/Room/Rooms";

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#c13429",
            colorTextBase: "#f2ddc2",
            colorTextLightSolid: "#f2ddc2",
          },
          components: {
            Button: {
              colorPrimary: "#23242d",
              colorTextBase: "#23242d",
              linkHoverBg: "#c13429",
            },
            Drawer: {
              colorBgElevated: "#c13429",
            },
            Input: {
              colorBorder: "#23242d",
              colorBgContainer: "#23242d",
            },
            Divider: {
              colorSplit: "#23242d",
            },
            Spin: {
              colorPrimary: "#23242d",
            },
            Slider: {
              trackBg: "#23242d",
              railHoverBg: "#23242d",
              handleActiveColor: "#23242d",
              colorBgElevated: "#23242d",
              railSize: 7,
              handleSize: 15,
              showText: "#23242d",
            },
            Select: {
              selectorBg: "#23242d",
              optionActiveBg: "#c13429",
              optionSelectedBg: "#c13429",
              colorBgElevated: "#23242d",
              colorBorder: "#23242d",
            },
            Card: {
              actionsBg: "#23242d",
              colorBgContainer: "#23242d",
            },
            Avatar: {
              colorTextPlaceholder: "#c13429",
              colorTextPlaccolorTextLightSolideholder: "#c13429",
              groupBorderColor: "#f2ddc2",
            },
            Popover: {
              colorTextHeading: "#23242d",
              colorBgElevated: "#23242d",
            },
            Carousel: {
              // colorPrimary: "#23242d",
              // colorTextBase: "#23242d",
              // linkHoverBg: "#c13429",
              dotWidth: "30px",
              dotHeight: "10px",
              // dotActiveWidth: "10px",
            },
          },
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<SingleLayout />}>
              {" "}
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="profile" element={<Profile />} />
              <Route path="rooms" element={<Rooms />} />
              <Route path="*" element={<Notfound />} />
            </Route>
          </Routes>
        </Router>
      </ConfigProvider>
    </>
  );
}

export default App;
