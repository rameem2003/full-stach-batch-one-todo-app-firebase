import { zodResolver } from "@hookform/resolvers/zod";
import { ref, update } from "firebase/database";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { db } from "../config/firebase.config";
import { UserContext } from "../hook/useAuth";
import { toast } from "sonner";

const taskSchema = z.object({
  task: z.string().min(4, "Task must be at least 4 characters long"),
});

const UpdateTodoCard = ({ todo, setIsEdit }) => {
  const { user } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      task: todo.task,
    },
  });

  const handleTaskUpdate = (data) => {
    update(ref(db, user.uid + "/" + todo.id), {
      task: data.task,
    })
      .then((data) => {
        toast.success("Task updated successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
    setIsEdit(false);
  };

  return (
    <div className=" fixed top-0 left-0 z-1000 bg-white/80 w-full h-screen overflow-hidden flex items-center justify-center">
      <div className="w-[500px] p-3 shadow-2xl bg-white ">
        <h2 className=" text-black font-bold text-2xl">Update Todo</h2>

        <form onSubmit={handleSubmit(handleTaskUpdate)}>
          <label className="text-white text-sm font-medium mb-2 block">
            Add New Task
          </label>
          <div className="relative flex flex-col items-center">
            <input
              {...register("task")}
              name="task"
              type="text"
              required=""
              className="w-full text-sm text-black placeholder:text-black border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600"
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
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTodoCard;
