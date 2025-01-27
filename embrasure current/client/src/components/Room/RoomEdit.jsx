import React, { useState } from "react";
import Swal from "sweetalert2";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Flex, Button, Form, Select, Slider } from "antd";
import {
  FOOTER_HEIGHT,
  INITIAL_MATCH_TYPE,
  INITIAL_PLAYERS_COUNT,
} from "../../config/constants";

const Edit = ({ rooms, selectedRoom, setRooms, setIsEditing, getRooms }) => {
  console.log(selectedRoom);
  const id = selectedRoom.id;

  const [players, setPlayers] = useState([selectedRoom.min, selectedRoom.max]);
  const [type, setType] = useState(selectedRoom.type);

  const handleUpdate = async (e) => {
    //e.preventDefault();

    if (!players[0] || !players[1] || !type) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const room = {
      min: players[0],
      max: players[1],
      type,
      creatorId: selectedRoom.creatorId,
      id: selectedRoom.id,
    };

    await setDoc(doc(db, "rooms", id), {
      ...room,
    });

    setRooms(rooms);
    setIsEditing(false);
    getRooms();

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: `Матч по тиму ${type}' был изменен.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <Flex
      justify={"center"}
      align={"center"}
      gap="middle"
      vertical
      style={{
        height: `calc(100vh - ${FOOTER_HEIGHT})`,
      }}
    >
      <Form onFinish={handleUpdate}>
        <Form.Item>
          <Select
            placeholder="Тип матча"
            value={type}
            defaultValue={type}
            onChange={(value) => setType(value)}
            style={{ width: "130px" }}
            options={[
              { value: "Штурм", label: <span>Штурм</span> },
              { value: "Царь горы", label: <span>Царь горы</span> },
              { value: "На выбывание", label: <span>На выбывание</span> },
            ]}
          />
        </Form.Item>
        <Form.Item>
          {" "}
          <Slider
            range
            min={2}
            max={20}
            controlSize={20}
            style={{ width: "33vh" }}
            value={players}
            defaultValue={players}
            onChange={(value) => setPlayers(value)}
            onChangeComplete={(value) => setPlayers(value)}
          />
        </Form.Item>

        <Form.Item>
          <Button
            name="submit"
            type="primary"
            htmlType="submit"
            style={{
              padding: "1rem",
            }}
            // onClick={() => setIsAdding(false)}
          >
            Изменить матч
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default Edit;
