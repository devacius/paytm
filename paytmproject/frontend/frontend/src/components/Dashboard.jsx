
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
User.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
};
function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row max-w-full max-h-screen justify-between p-4 md: h-16 mx-4 ">
      <div className="flex flex-col ">
        {user.firstName} {user.lastName}
      </div>

      <div className="flex justify-between items-center ">
        <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-center "
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

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/v1/account/balance`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setUserAmount(response.data.balance.toFixed(2));
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
          `${import.meta.env.VITE_BACKEND_URI}/api/v1/user/search?filter` + filter,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
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
      
      <div>
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
      </div>
    </div>
  );
}
