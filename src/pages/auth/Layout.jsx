import React from "react";
import { Outlet } from "react-router";
import styled from "styled-components";
import waves from "assets/waves.gif";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background: url(${waves});
  background-position: center;
  background-size: cover;
`;

const Layout = () => {
  return (
    <AppContainer>
      <Outlet />
    </AppContainer>
  );
};

export default Layout;