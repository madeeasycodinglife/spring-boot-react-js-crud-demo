import React, { useEffect, useState } from "react";
import axios from "axios";
const Authentication = () => {
  const [jwtToken, setJwtToken] = useState("");

  const dataToSend = {
    name: "pabitra",
    password: "1234",
  };
  useEffect(() => {
    /**
     * function to fetch jwt token and store data to localStorage
     */
    const fetchJwtToken = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/authentication",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          }
        );
        const data = await response.json();
        const jwtTokenFromServer = data.token;
        console.log(jwtTokenFromServer);
        // const receivedToken = data.token;

        localStorage.setItem("jwt", jwtTokenFromServer);
        setJwtToken(jwtTokenFromServer);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJwtToken();
    return () => {};
  }, []);

  const fetchData = async () => {
    try {
      // received the jwt token from localStorage
      const storedToken = localStorage.getItem("jwt");
      // use this storedToken in each axios request from subsequent request
      const response = await fetch("http://localhost:8080/welcome", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      console.log(response);
      const actualData = await response.text();
      console.log(actualData);
    } catch (error) {
      console.log(error);
    }
  };
  // Logout function
  // const logout = () => {
  //   // Clear the JWT token from local storage (or perform any other logout actions)
  //   localStorage.removeItem("jwt");

  //   // Redirect the user to the login page or perform any other necessary actions
  //   // Example: Redirecting to the login page
  //   // window.location.href = "/login"; // Replace with your login page URL
  //   window.location.href = "/hi";
  // };
  return (
    <>
      <h1>JWT Token example</h1>
      <button onClick={fetchData}> Fetch data</button>
      {/* <button onClick={logout}>LogOut</button> */}
    </>
  );
};

export default Authentication;
