
import { logoutUserAction } from "@/src/features/auth/server/auth.actions";
import React from "react";

const EmployerDashboard = () => {
  return (
    <div>
      <h1>Welcome, Employer</h1>
      <p>This is employer dashboard</p>

      <button onClick = {logoutUserAction}>Logout</button>
    </div>
  );
};

export default EmployerDashboard;