import React, { useState } from "react";
import Swal from "sweetalert2";
import { Slider, Flex, Button, Select, Form } from "antd";
import {
  FOOTER_HEIGHT,
  INITIAL_PLAYERS_COUNT,
  INITIAL_MATCH_TYPE,
} from "../../config/constants";

import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../../config/firebase";

const Add = ({ rooms, setRooms, setIsAdding, getRooms }) => {
  const [players, setPlayers] = useState(INITIAL_PLAYERS_COUNT);
  const [type, setType] = useState(INITIAL_MATCH_TYPE);

  const handleAdd = async (e) => {
    //e.preventDefault();
    const user = auth.currentUser;

    if (!players[0] || !players[1] || !type) {
      console.log(players, type);
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const newRoom = {
      min: players[0],
      max: players[1],
      creatorId: user.uid,
      type,
    };

    rooms.push(newRoom);

    try {
      await addDoc(collection(db, "rooms"), {
        ...newRoom,
      });
    } catch (error) {
      console.log(error);
    }

    setRooms(rooms);
    setIsAdding(false);
    getRooms();

    Swal.fire({
      icon: "success",
      title: "Added!",
      text: `Матч по тиму ${type}' был добавлен.`,
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
      <Form onFinish={handleAdd}>
        <Form.Item>
          <Select
            placeholder="Тип матча"
            defaultValue={INITIAL_MATCH_TYPE}
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
            //value={players}
            onChange={(value) => setPlayers(value)}
            onChangeComplete={(value) => setPlayers(value)}
            defaultValue={INITIAL_PLAYERS_COUNT}
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
            Создать матч
          </Button>
        </Form.Item>
      </Form>

      {/* <div className="small-container">
        <form onSubmit={handleAdd}>
          <h1>Add Room</h1>
          <label htmlFor="minPlayers">Min</label>
          style=
          {{
            height: `calc(100vh - ${FOOTER_HEIGHT})`,
          }}
          <div
            style={{
              //display: "inline-block",
              width: "33vh",
              //marginInlineStart: "33vh",
            }}
          >
            {" "}
           
          </div>
          <input
            id="minPlayers"
            type="text"
            name="minPlayers"
            value={minPlayers}
            onChange={(e) => setMinPlayers(e.target.value)}
          />
          <label htmlFor="maxPlayers">Max</label>
          <input
            id="maxPlayers"
            type="text"
            name="maxPlayers"
            value={maxPlayers}
            onChange={(e) => setMaxPlayers(e.target.value)}
          />
          <div style={{ marginTop: "30px" }}>
            <input type="submit" value="Add" />
            <input
              style={{ marginLeft: "12px" }}
              className="muted-button"
              type="button"
              value="Cancel"
              onClick={() => setIsAdding(false)}
            />
          </div>
        </form>
      </div> */}
    </Flex>
  );
};

export default Add;
