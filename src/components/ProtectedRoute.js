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
  myWishlist,
  setMyWishlist,
  allPlants,
  myEvents,
  setMyEvents,
  needsCare,
  setNeedsCare,
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
            myWishlist={myWishlist}
            setMyWishlist={setMyWishlist}
            allPlants={allPlants}
            myEvents={myEvents}
            setMyEvents={setMyEvents}
            needsCare={needsCare}
            setNeedsCare={setNeedsCare}
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
