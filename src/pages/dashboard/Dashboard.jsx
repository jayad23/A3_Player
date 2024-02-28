import React from "react";
import Top from "./components/Top";
import Middle from "./components/Middle";
import Bottom from "./components/Bottom";
import { DashboardContainer } from "./styled";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { showTop, showBottom } = useSelector((state) => state.layout);
  return (
    <DashboardContainer>
      {showTop && <Top />}
      <Middle />
      {showBottom && <Bottom />}
    </DashboardContainer>
  );
};

export default Dashboard;