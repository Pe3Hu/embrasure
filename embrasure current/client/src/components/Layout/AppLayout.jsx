import { Layout, Spin } from "antd";
import AppHeader from "./AppHeader";
import AppContent from "./AppContent";
import AppFooter from "./AppFooter";
import AppSider from "./AppSider";
import { Outlet } from "react-router-dom";
//import { useContext } from "react";
//import CrypoContext from "../../context/crypto-context";

export default function AppLayout() {
  // const { loading } = useContext(CrypoContext);

  // if (loading) {
  //   return <Spin fullscreen />;
  // }

  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />

        <Outlet />
      </Layout>
      <AppFooter />
    </Layout>
  );
}
