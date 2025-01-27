import { Layout } from "antd";

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 160,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#c13429",
};

export default function AppHeader() {
  return <Layout.Header style={headerStyle}></Layout.Header>;
}
