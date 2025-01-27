import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";
import SignInwithGoogle from "./signInWIthGoogle";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Flex,
  ConfigProvider,
  Divider,
} from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { FOOTER_HEIGHT } from "../config/constants";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFinish = async (e) => {
    //e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/profile";
      toast.success("User logged in Successfully", {
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
    >
      <Form
        name="sign-up"
        initialValues={{
          remember: true,
        }}
        style={
          {
            //maxWidth: 360,
          }
        }
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
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
        <Form.Item>
          <Form.Item>
            <Button
              name="submit"
              type="primary"
              block
              htmlType="submit"
              style={{
                padding: "0rem",
              }}
            >
              Войти
            </Button>
          </Form.Item>
          <Divider></Divider>
          <Flex gap="small">
            <Button type="primary" block href="/register">
              Регистрация
            </Button>
            <Button type="primary" icon={<SignInwithGoogle />} />
          </Flex>
        </Form.Item>
      </Form>
    </Flex>
  );
}
