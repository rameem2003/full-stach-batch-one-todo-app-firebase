import { signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { auth, db } from "../config/firebase.config";
import { onValue, ref } from "firebase/database";
import { UserContext } from "../hook/useAuth";
import TodoCard from "../components/TodoCard";

const Home = () => {
  const { user } = useContext(UserContext);

  const [todos, setTodos] = useState(null);

  const fetchTodos = () => {
    const starCountRef = ref(db, user.uid);
    onValue(starCountRef, (snapshot) => {
      let arr = [];

      snapshot.forEach((data) => {
        arr.push(data.val());
      });

      console.log(arr);
      setTodos(arr);

      // const data = snapshot.val();
      // console.log(data);

      // updateStarCount(postElement, data);
    });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <section className=" p-3">
      <div className="w-full mx-auto border border-gray-200 rounded-sm overflow-hidden">
        <ul className="divide-y divide-gray-200 text-sm text-slate-900 font-medium">
          {todos?.map((data, i) => (
            <TodoCard todo={data} key={1} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Home;
