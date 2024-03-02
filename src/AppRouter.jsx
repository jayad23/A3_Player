import React, { useState, useEffect, Suspense, lazy } from "react";
import { AccountBox } from "pages/auth/components/accountBox";
import { Routes, Route, Navigate } from "react-router-dom";
import { useValidJWT } from "hooks/useValidateJWT";
import { useNavigate } from "react-router-dom";
import Loading from "pages/info/Loading";
const AuthLayout = lazy(() => import("pages/auth/Layout"));
const Dashboard = lazy(() => import("pages/dashboard/Dashboard"));


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
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  );
};