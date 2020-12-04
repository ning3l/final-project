import React from "react";
import { Route, Redirect } from "react-router-dom";
import { decodeToken } from "../utils/auth";

export default function ProtectedRoute({
  component: Component,
  handleLogout,
  setCurrUser,
  currUser,
  setMyRepo,
  myRepo,
  allPlants,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        decodeToken() ? (
          <Component
            {...props}
            handleLogout={handleLogout}
            setCurrUser={setCurrUser}
            currUser={currUser}
            setMyRepo={setMyRepo}
            myRepo={myRepo}
            allPlants={allPlants}
          />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
