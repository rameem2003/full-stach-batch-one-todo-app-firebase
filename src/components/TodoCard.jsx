import { ref, remove } from "firebase/database";
import React, { useContext } from "react";
import { db } from "../config/firebase.config";
import { UserContext } from "../hook/useAuth";
import { toast } from "sonner";
import { useState } from "react";
import UpdateTodoCard from "./UpdateTodoCard";

const TodoCard = ({ todo }) => {
  const [isEdit, setIsEdit] = useState(false);
  const { user } = useContext(UserContext);
  const handleDelete = () => {
    console.log(todo.id);

    remove(ref(db, user.uid + "/" + todo.id))
      .then((data) => {
        toast.success("Task Deleted successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const openEdit = () => {
    setIsEdit(true);
  };

  return (
    <div className="w-full px-4 py-3 bg-blue-600 text-white cursor-pointer">
      {isEdit && <UpdateTodoCard setIsEdit={setIsEdit} todo={todo} />}

      <div className=" flex items-center justify-between">
        <p>{todo.task}</p>

        <div className=" flex items-center justify-end gap-2">
          <button
            onClick={openEdit}
            className="bg-white text-blue-600 px-2 py-1 rounded-sm text-sm cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-white text-red-600 px-2 py-1 rounded-sm text-sm cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
