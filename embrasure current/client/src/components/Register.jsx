import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../config/firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Flex,
  ConfigProvider,
  Divider,
} from "antd";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { Navigate, Route } from "react-router-dom";
import { FOOTER_HEIGHT } from "../config/constants";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const onFinish = async (e) => {
    //e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        <Route>
          {" "}
          <Navigate to="/profile" />;
        </Route>;

        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          nickname: nickname,
          photo: "",
        });
      }
      //console.log("User Registered Successfully!!");
      toast.success("Товарищем больше", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <Flex
      style={{
        height: `calc(100vh - ${FOOTER_HEIGHT})`,
      }}
      justify={"center"}
      align={"center"}
      gap="middle"
      vertical
    >
      <Form
        name="sign-up"
        initialValues={{
          remember: true,
        }}
        style={{
          maxWidth: 360,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          rules={[
            {
              required: true,
              message: "Введите почту",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Почта" />
        </Form.Item>
        <Form.Item
          name="nickrname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          rules={[
            {
              required: true,
              message: "Введите позывной",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Позывной" />
        </Form.Item>
        <Form.Item
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          rules={[
            {
              required: true,
              message: "Введите пароль",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Пароль"
          />
        </Form.Item>
        <Divider></Divider>
        <Flex gap="small">
          <Button
            name="submit"
            type="primary"
            block
            htmlType="submit"
            style={{
              padding: "1rem",
            }}
          >
            Зарегистрироваться
          </Button>
          <Button type="primary" href="/login" icon={<RollbackOutlined />} />
        </Flex>
      </Form>
    </Flex>
  );
}
