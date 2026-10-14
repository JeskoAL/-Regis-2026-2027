import React from "react";
import Card from "./Card.jsx"; 

export default function ContainerUsers({ users = [], onDelete, onEdit }) {
  return (
    <div className="flex-1 w-full flex border rounded-lg p-4 gap-4 flex-wrap">
      {users.map((user) => (
        <Card 
        key={user.id}
        user={user}
        onDelete={onDelete}
        onEdit={onEdit}

         />
      ))}
    </div>
  );
}
