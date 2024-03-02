import { Box } from "@mui/material";
import { DashboardContainer } from "pages/dashboard/styled";
import React from "react";

const Loading = () => {
  return (
    <DashboardContainer>
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          fontSize: "2rem",
          color: "white",
        }}
      >
        Loading...
      </Box>
    </DashboardContainer>
  );
};

export default Loading;