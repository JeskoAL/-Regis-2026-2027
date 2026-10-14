import React from "react";

export default function Card({ user, onDelete, onEdit }) {
  return (
    <div className="border-2 p-4 rounded-lg">
      {/* Null check... */}
      <p>{user?.id || "ID"}</p>
      <p>{user?.first_name || "First Name"}</p>
      <p>{user?.last_name || "Last Name"}</p>
      <p>{user?.age || "Age"}</p>
      <p>{user?.gender == "m" ? "Male" : "Female" || "Gender"}</p>

      <div className="flex gap-4 mt-4 text-2xl">
        <button 
          type="button"
          onClick={() => onEdit(user)} 
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Update
        </button>
        <button 
          type="button"
          onClick={() => onDelete(user.id)} 
          className="bg-red-600 px-4 py-2 rounded"
        >
          Remove
        </button>
      </div>

    </div>
  );
}
