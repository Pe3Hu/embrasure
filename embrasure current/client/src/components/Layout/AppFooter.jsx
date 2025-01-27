import {
  AppstoreFilled,
  CaretLeftFilled,
  FireFilled,
  MailOutlined,
  MehFilled,
  SettingFilled,
} from "@ant-design/icons";
import { Layout, Flex } from "antd";
import { NavLink, Link } from "react-router-dom";
import { ICON_SIZE_NAV } from "../../config/constants";

const footerStyle = {
  color: "#fff",
  backgroundColor: "#c13429",
};

export default function AppFooter() {
  return (
    <Layout.Footer style={footerStyle}>
      <Flex
        style={{
          justifyContent: "space-evenly",
        }}
      >
        {" "}
        <NavLink to="/Rooms">
          <FireFilled style={{ fontSize: ICON_SIZE_NAV, color: "#23242d" }} />
        </NavLink>
        <NavLink to="/Login">
          <MehFilled style={{ fontSize: ICON_SIZE_NAV, color: "#23242d" }} />
        </NavLink>
        {/* <NavLink to="/Login">
          <SettingFilled style={{ fontSize: ICON_SIZE_NAV, color: "#23242d" }} />
        </NavLink> */}
        <NavLink to="/Login">
          <CaretLeftFilled
            style={{ fontSize: ICON_SIZE_NAV, color: "#23242d" }}
          />
        </NavLink>
      </Flex>
    </Layout.Footer>
  );
}
