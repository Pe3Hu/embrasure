import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import Table from "./Table";
import Add from "./RoomAdd";
import Edit from "./RoomEdit";

import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import RoomPreview from "./RoomPreview";
import RoomCarousel from "./RoomCarousel";
import { FOOTER_HEIGHT } from "../../config/constants";
import { Flex } from "antd";

export default function Dashboard({ setIsAuthenticated }) {
  const [rooms, setRooms] = useState();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getRooms = async () => {
    const querySnapshot = await getDocs(collection(db, "rooms"));
    const rooms = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRooms(rooms);
  };

  useEffect(() => {
    getRooms();
  }, []);

  const handleEdit = (id) => {
    const [room] = rooms.filter((room) => room.id === id);

    setSelectedRoom(room);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.value) {
        const [room] = rooms.filter((room) => room.id === id);

        deleteDoc(doc(db, "rooms", id));

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `${room.minPlayers} ${room.maxPlayers}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const roomsCopy = rooms.filter((room) => room.id !== id);
        setRooms(roomsCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          {/* <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          /> */}
          <Flex
            justify={"center"}
            align={"center"}
            gap="middle"
            vertical
            style={{
              height: `calc(100vh - ${FOOTER_HEIGHT})`,
            }}
          >
            {" "}
            {/* <Table
              rooms={rooms}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              setIsAdding={setIsAdding}
            /> */}
          </Flex>
        </>
      )}
      {isAdding && (
        <Add
          rooms={rooms}
          setRooms={setRooms}
          setIsAdding={setIsAdding}
          getRooms={getRooms}
        />
      )}
      {isEditing && (
        <Edit
          rooms={rooms}
          selectedRoom={selectedRoom}
          setRooms={setRooms}
          setIsEditing={setIsEditing}
          getRooms={getRooms}
        />
      )}
    </div>
  );
}
