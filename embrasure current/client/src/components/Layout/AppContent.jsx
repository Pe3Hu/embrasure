import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 50px)",
  color: "#fff",
  backgroundColor: "#c13429",
};

export default function AppContent() {
  return (
    <Layout.Content style={contentStyle}>
      <Outlet />
    </Layout.Content>
  );
}
