import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AppFooter from "./Layout/AppFooter";
import { FOOTER_HEIGHT } from "../config/constants";
import RoomCarousel from "./Room/RoomCarousel";

const contentStyle = {
  textAlign: "center",
  minHeight: `calc(100vh - ${FOOTER_HEIGHT})`,
  color: "#fff",
  backgroundColor: "#c13429",
};

export default function SingleLayout() {
  return (
    <Layout>
      {" "}
      <Layout.Content style={contentStyle}>
        <Outlet />
        <RoomCarousel />
      </Layout.Content>
      <AppFooter />
    </Layout>
  );
}
