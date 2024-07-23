import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function User({ user, navigate }) {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <button
          onClick={() => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }}
        >
          Send Money
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [userAmount, setUserAmount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setUserAmount(response.data.balance);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBalance();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/bulk?filter=" + filter
        );
        setUsers(response.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [filter]);

  return (
    <div className="flex flex-col items-center justify-center relative h-screen w-screen p-5">
      <div className="flex flex-row h-28 w-11/12 rounded-md border-b-2 absolute top-4">
        <div className="absolute left-1">
          <p className="text-3xl font-bold">Payments Bank</p>
        </div>
        <div className="absolute right-1">
          <p>Hello, Users</p>
        </div>
      </div>
      <div className="absolute left-6 top-36 flex flex-row ">
        <p className="text-2xl font-bold">Your balance:</p>
        <div className="px-2">
          <p className="text-2xl font-semibold">{userAmount}</p>
        </div>
      </div>
      <div className="absolute left-5 top-44 pt-6 w-screen">
        <p className="text-2xl font-semibold ">Users:</p>
        <input
          className="border-2 w-11/12"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        ></input>
      </div>
      <div>
        {users.map((user) => (
          <User key={user._id} user={user} navigate={navigate} />
        ))}
      </div>
    </div>
  );
}
