import React from "react";
import { Box } from "@mui/material";
import ReactPlayer from "react-player";

const Youtube = ({ url, isMobile }) => {
  const height = isMobile ?
    "287vh" :
    {
      xs: "40vh",
      sm: "35vh",
      md: "55vh",
      lg: "69.7vh"
    };
  return (
    <Box
      component={"div"}
      sx={{
        // width: "100%",
        height: height,
      }}
    >
      <ReactPlayer
        className="react-player"
        url={url}
        width={"100%"}
        height={"100%"}
        playing
        controls
      />
    </Box>
  );
};

export default Youtube;