import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  UserOutlined,
  AntDesignOutlined,
  ShareAltOutlined,
  UserAddOutlined,
  VideoCameraAddOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Tooltip } from "antd";
import { ICON_SIZE_CARD } from "../../config/constants";
const { Meta } = Card;
const MatchPreview = () => (
  <Card
    style={{
      width: 300,
    }}
    // cover={
    //   <img
    //     alt="example"
    //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    //   />
    // }
    actions={[
      <UserAddOutlined
        key="setting"
        style={{ fontSize: ICON_SIZE_CARD, color: "#c13429" }}
      />,
      <VideoCameraAddOutlined
        key="edit"
        style={{ fontSize: ICON_SIZE_CARD, color: "#c13429" }}
      />,
      <ShareAltOutlined
        key="share"
        style={{ fontSize: ICON_SIZE_CARD, color: "#c13429" }}
      />,
    ]}
  >
    <Meta
      avatar={
        <Avatar.Group
          size="large"
          max={{
            count: 1,
            style: {},
          }}
        >
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=3" />
          <Avatar
            style={{
              backgroundColor: "#f56a00",
            }}
            icon={<UserOutlined />}
          >
            {/* Левый */}
          </Avatar>
          <Tooltip title="Ant User" placement="top">
            <Avatar
              style={{
                backgroundColor: "#87d068",
              }}
              icon={<UserOutlined />}
            />
          </Tooltip>
          <Avatar
            style={{
              backgroundColor: "#1677ff",
            }}
            icon={<UserOutlined />}
          />
        </Avatar.Group>
      }
      title="Матч #"
      description="Тип матча"
    />
  </Card>
);
export default MatchPreview;
