import React from "react";
import { DashboardContainer } from "./styled";
import Top from "./components/Top";
import Middle from "./components/Middle";
import Bottom from "./components/Bottom";

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Top />
      <Middle />
      <Bottom />
    </DashboardContainer>
  );
};

export default Dashboard;