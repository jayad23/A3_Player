import React from "react";
import { Box } from "@mui/material";
import { Container } from "../styled";
import MiddleLeft from "./MiddleLeft";
import MiddleRight from "./MiddleRight";
import useMediaQuery from "@mui/material/useMediaQuery";

const Middle = () => {
  const matches = useMediaQuery("(max-width:600px)");
  return (
    <Container height={"80vh"}>
      <Box
        component={"div"}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          gap: "10px"
        }}
      >
        {
          !matches && (
            <MiddleLeft width="30%" />
          )
        }
        <MiddleRight width={matches ? "100%" : "70%"} />
      </Box>
    </Container>
  );
};

export default Middle;