import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PlantRepo() {
  const [myRepo, setMyRepo] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/plants/repository")
      .then((res) => res.json())
      .then((data) => setMyRepo(data))
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <div>
      <ul>
        {myRepo.map((el) => (
          <li>{el._id}</li>
        ))}
      </ul>
    </div>
  );
}
