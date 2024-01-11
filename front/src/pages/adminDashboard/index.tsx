import React from "react";
import AdminDashboard from "../../components/dashboard/AdminDashboard";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <AdminDashboard />
      <Footer />
    </div>
  );
};

export default Dashboard;
