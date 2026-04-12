import React, { useContext } from "react";
import UserNav from "./UserNav";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { ref, set } from "firebase/database";
import { db } from "../config/firebase.config";
import { UserContext } from "../hook/useAuth";
import { toast } from "sonner";

function generateId(length = 10) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";

  for (let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return id;
}

const taskSchema = z.object({
  task: z.string().min(4, "Task must be at least 4 characters long"),
});

const Sidebr = () => {
  const { user } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
  });

  const handleNewTask = (data) => {
    let id = generateId();
    console.log(data);

    set(ref(db, user.uid + "/" + id), {
      id: id,
      task: data.task,
    })
      .then((data) => {
        toast.success("Task added successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <nav className="bg-[#121e31] h-screen  top-0 left-0 w-[250px] py-6 px-4 tracking-wide overflow-auto">
      <UserNav />
      <hr className="my-6 border-gray-400" />

      <form onSubmit={handleSubmit(handleNewTask)}>
        <label className="text-white text-sm font-medium mb-2 block">
          Add New Task
        </label>
        <div className="relative flex flex-col items-center">
          <input
            {...register("task")}
            name="task"
            type="text"
            required=""
            className="w-full text-sm text-white placeholder:text-white border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600"
            placeholder="Enter Task"
          />

          {errors.task && (
            <p className="text-red-500 text-sm">{errors.task.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-5 shadow-xl py-2.5 px-4 text-[15px] font-medium tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
        >
          Add Task
        </button>
      </form>
    </nav>
  );
};

export default Sidebr;
