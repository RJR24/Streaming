import React from "react";
import UserDashboard from "../../components/dashboard/UserDashboard";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <UserDashboard />
      <Footer />
    </div>
  );
};

export default Dashboard;
