import React, { useState } from "react";
import Swal from "sweetalert2";
import { Slider, Flex, Button, Select } from "antd";
import { FOOTER_HEIGHT } from "../client/src/config/constants";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../client/src/config/firebase";

const Add = ({ rooms, setRooms, setIsAdding, getRooms }) => {
  const [players, setPlayers] = useState([2, 2]);
  const [type, setType] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!players[0] || !players[1] || !type) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const newRoom = {
      players,
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
      text: `${type}'s data has been Added.`,
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
      <Select
        placeholder="Тип матча"
        style={{ width: "130px" }}
        value={type}
        onChange={(value) => setType(value)}
        options={[
          { value: "match-type-0", label: <span>Штурм</span> },
          { value: "match-type-1", label: <span>Царь горы</span> },
          { value: "match-type-2", label: <span>На выбывание</span> },
        ]}
      />
      <Slider
        range
        defaultValue={[4, 12]}
        min={2}
        max={20}
        controlSize={20}
        style={{ width: "33vh" }}
      />
      <Button
        name="submit"
        type="primary"
        htmlType="submit"
        style={{
          padding: "1rem",
        }}
        onClick={() => setIsAdding(false)}
      >
        Создать матч
      </Button>
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
