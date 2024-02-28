import React, { useState } from "react";
import { BsLayoutWtf } from "react-icons/bs";
import { AiFillLayout } from "react-icons/ai";
import { Box, IconButton } from "@mui/material";
import { RiLayoutRight2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { onChangeLayout, onRevertToOriginalLayout } from "rdx/layout";

const initialStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  zIndex: 1000,
};

const LayoutShift = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const { revertPlaylistWithSearch } = useSelector((state) => state.layout);
  const { menuSelected } = useSelector((state) => state.menu);

  const changeLayout = () => {
    dispatch(onChangeLayout(menuSelected));
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
            {
              revertPlaylistWithSearch ? (
                <IconButton onClick={revertLayout}>
                  <AiFillLayout size={20} color="white" />
                </IconButton>
              ) : (
                <IconButton onClick={changeLayout}>
                  <RiLayoutRight2Fill size={20} color="white" />
                </IconButton>
              )
            }
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