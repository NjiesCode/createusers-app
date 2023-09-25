"use client";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  // Add more properties as needed
}

function Getallusers() {
    
  const { data, error, refetch, isError, isLoading } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const response = await axios.get<{ users: User[] }>(
          "https://dummyjson.com/users"
        );
        return response.data.users;
      } catch (error) {
        throw new Error("Failed to fetch user data");
      }
    },
  });

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  if (isError || !data) {
    return <div>Error: {error?.message || "Failed to fetch user data"}</div>;
  }

  if (data.length === 0) {
    return <div>No users found.</div>;
  }

  return (
    <div>
      <h1>Getallusers</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            <h2>First Name: {user.firstName}</h2>
            <h3>Last Name: {user.lastName}</h3>
            <p>ID: {user.id}</p>
            <h4>Email: {user.email}</h4>
            <p>Age: {user.age}</p>
            {/* Add more user data fields */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Getallusers;
