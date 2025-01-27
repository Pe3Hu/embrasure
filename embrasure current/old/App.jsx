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
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./components/firebase";

import AppContent from "./components/Layout/AppContent";

import Notfound from "./components/Notfound";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Rooms from "./components/Rooms";

const items = [
  {
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    key: "login",
    icon: <LoginOutlined />,
  },
  {
    key: "register",
    icon: <MailOutlined />,
  },
  {
    key: "profile",
    icon: <MailOutlined />,
  },
  {
    key: "signout",
    icon: <LogoutOutlined />,
  },
];

function App() {
  const [array, setArray] = useState([]);

  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    navigate(e);
    //setCurrent(e.key);
  };

  // const fetchAPI = async () => {
  //   const response = await axios.get("http://localhost:8080/api");
  //   setArray(response.data.fruits);
  //   console.log(response.data.fruits);
  // };

  // useEffect(() => {
  //   fetchAPI();
  // }, []);

  return (
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
          Menu: {
            itemBg: "#23242d",
            itemHeight: "2000px",
          },
        },
      }}
    >
      {/* <Router>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/profile" /> : <AppLayout />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
        <ToastContainer />
      </Router> */}

      <Router>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
      {/* 
      <Menu
        items={[{ label: "home" }, { label: "profile" }, { label: "signout" }]}
      ></Menu> */}

      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      />
    </ConfigProvider>
  );
}

export default App;
