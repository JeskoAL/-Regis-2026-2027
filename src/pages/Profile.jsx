import React from "react";
import { useParams } from "react-router";

const users = [
  {
    id: 1,
    fullname: "Ian Sube",
    age: 99,
    description: "An instructor at MFI Polytechnic Institute.",
  },
  {
    id: 2,
    fullname: "Chounce De Guzman",
    age: 10,
    description: "Makulit....",
  },  
];

export default function Profile() {
  const userParams = useParams();
  const foundUser = users.find((u) => String(u.id) == userParams.id);
   

  if (!foundUser) {
    return (
      <div className="p-6">
        <p>No user with ID: {userParams.id} is existing. </p>
      </div>
      
    );

  }
  
  /*
    useParams return an object

    useParams = {
    id: 2
    }
  */

  return (
    <div className="">
      <p>{userParams.id}</p>
      
      <div>
        <p>{foundUser.fullname}</p>
        <p>{foundUser.age}</p>
        <p>{foundUser.description}</p>
      </div>
    </div>
  );
}
