import React from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute, NavbarComponent } from "./index";
import {
  Archive,
  Chat,
  Feeds,
  Login,
  Register,
  TotalMessage,
} from "../screens";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";

function RouterComponent() {
  const isAuthenticated=useSelector(state=>state.api.isAuthenticate)
  return (
    <Router>
      <NavbarComponent isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Login isAuthenticated={isAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/feeds"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Feeds />
            </ProtectedRoute>
          }
        />
        <Route
          path="/totalmessage"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <TotalMessage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/archives"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Archive />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default RouterComponent;
