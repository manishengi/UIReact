import React from "react";
import SuperAdminDashboard from "../super-admin";

function Dashboard() {
  const renderSuperAdminDashboard = () => {
    return <SuperAdminDashboard />;
  };

  return <div className="div-dashboard">{renderSuperAdminDashboard()}</div>;
}

export default Dashboard;
