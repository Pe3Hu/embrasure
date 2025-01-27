import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Descriptions, Flex, Button, Badge, Spin } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { FOOTER_HEIGHT } from "../config/constants";

export default function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  return (
    <>
      {userDetails ? (
        <>
          <Flex
            style={{
              height: `calc(100vh - ${FOOTER_HEIGHT})`,
            }}
            justify={"center"}
            align={"center"}
            vertical
          >
            <Descriptions
              title="Профиль"
              bordered
              layout="horizontal"
              style={{ padding: "2em" }}
              items={[
                {
                  key: "1",
                  label: "Позывной",
                  children: userDetails.nickname,
                  span: "filled",
                },
                {
                  key: "2",
                  label: "Почта",
                  children: userDetails.email,
                  span: "filled",
                },
                {
                  key: "3",
                  label: "Статус",
                  children: <Badge status="processing" text="В матче" />,
                  span: "filled",
                },
              ]}
            />
            <Button
              type="primary"
              onClick={handleLogout}
              autoInsertSpace={false}
              icon={<LogoutOutlined />}
            >
              Выйти вон
            </Button>
          </Flex>
        </>
      ) : (
        <Flex
          style={{
            height: `calc(100vh - ${FOOTER_HEIGHT})`,
          }}
          justify={"center"}
          align={"center"}
          vertical
        >
          <Spin size="large" />
        </Flex>
      )}
    </>
  );
}
