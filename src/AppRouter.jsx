import React, { useState, useEffect } from "react";
import AuthLayout from "pages/auth/Layout";
import Dashboard from "pages/dashboard/Dashboard";
import { useValidJWT } from "hooks/useValidateJWT";
import { AccountBox } from "pages/auth/components/accountBox";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const AppRouter = () => {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const { onGetJWT } = useValidJWT();
  const navigate = useNavigate();
  const [defaultRoute, setDefaultRoute] = useState(null);
  const tokenChanged = localStorage.getItem("jwt");

  useEffect(() => {
    const onCheck = async () => {
      const tokenIsValid = await onGetJWT();
      if (tokenIsValid) {
        setIsTokenValid(true);
        navigate("/dashboard");
        setDefaultRoute("/dashboard");
      } else {
        setIsTokenValid(false);
        setDefaultRoute("/auth/login");
      }
    };
    onCheck();

  }, [tokenChanged]);

  return (
    <Routes>
      {
        isTokenValid ? (
          <Route path="/dashboard" element={<Dashboard />} />
        ) : (
          <Route path="/auth" element={<AuthLayout />} >
            <Route path="login" element={<AccountBox />} />
          </Route>
        )
      }
      <Route path="*" element={<Navigate to={defaultRoute} />} />
    </Routes>
  );
};