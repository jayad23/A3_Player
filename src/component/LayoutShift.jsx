import React, { useState } from "react";
import { BsLayoutWtf } from "react-icons/bs";
import { AiFillLayout } from "react-icons/ai";
import { RiLayoutRight2Fill } from "react-icons/ri";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { onChangeLayout, onRevertToOriginalLayout } from "rdx/layout";

const initialStyle = {
  position: "absolute",
  top: 0,
  right: 0,
};

const LayoutShift = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const changeLayout = () => {
    dispatch(onChangeLayout());
    setToggle(false);
  };

  const revertLayout = () => {
    dispatch(onRevertToOriginalLayout());
    setToggle(false);
  };

  return (
    <Box
      component="div"
      sx={initialStyle}
    >
      {
        toggle ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <IconButton onClick={() => setToggle(false)}>
              <BsLayoutWtf size={20} color="white" />
            </IconButton>
            <Tooltip title="Original Layout">
              <IconButton onClick={revertLayout}>
                <AiFillLayout size={20} color="white" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Widen player">
              <IconButton onClick={changeLayout}>
                <RiLayoutRight2Fill size={20} color="white" />
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
          <IconButton onClick={() => setToggle(true)}>
            <BsLayoutWtf size={20} color="white" />
          </IconButton>
        )
      }
    </Box>
  );
};

export default LayoutShift;