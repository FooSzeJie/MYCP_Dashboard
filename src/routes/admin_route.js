import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../scenes/dashboard";
import LocalAuthority from "../scenes/local Authority/manageLocalAuthority";
import AddLocalAuthority from "../scenes/local Authority/addLocalAuthority";
import EditLocalAuthority from "../scenes/local Authority/edit";
import Users from "../scenes/users/manageUser";
import EditUser from "../scenes/users/edit";
import PayPalPayment from "../components/PayPalPayment";

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/local_authority" element={<LocalAuthority />} />
    <Route path="/local_authority/add" element={<AddLocalAuthority />} />
    <Route path="/local_authority/edit/:lid" element={<EditLocalAuthority />} />
    <Route path="/users" element={<Users />} />
    <Route path="/users/edit/:uid" element={<EditUser />} />
    <Route path="/paypal-payment" element={<PayPalPayment />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AdminRoutes;
