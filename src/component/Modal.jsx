
import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "10%",
  width: "60px",
  height: "fit-content",
  //overflow: { xs: "scroll", sm: "none" },
  bgcolor: "rgb(0,0,0 / 30%)",
  boxShadow: 0,
  //p: 2,
  marginLeft: 0.7,
  borderRadius: "0px 10px 10px 0px",
  TransitionEvent: 0.3,
  overflow: "hidden",
};

// eslint-disable-next-line react/prop-types
export const ModalComponent = ({ open, handleClose, children }) => {

  return (
    <Modal
      open={open}
      onClose={handleClose}
      //sx={{ boxShadow: "none" }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {children}
      </Box>
    </Modal>
  );
};
