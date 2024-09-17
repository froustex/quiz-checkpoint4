import { useState, useEffect } from "react";
import UserCard from "../components/UserCard";
import "../styles/userCard.css";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="user-card-container">
      {users.map((user) => (
        <UserCard user={user} key={user.id} />
      ))}
    </div>
  );
}

export default Users;
