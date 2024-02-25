import React, { Fragment, useState } from "react";
import { Button, IconButton, Tooltip } from "@mui/material";
import { FaMicrophoneAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { CustomTextArea } from "./Lyrics";
import { MdClose } from "react-icons/md";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //top: 0,
  width: "90%",
  bgcolor: "#0000005b",
  //height: "100%",
  height: "80vh",
  overflow: "auto",
  border: "none",
  boxShadow: 24,
  p: 4,
};


const LyricsModal = () => {
  const [open, setOpen] = useState(false);
  const { currentSong, playlistSelected } = useSelector((state) => state.playlist);

  const handleShowLyrics = () => {
    if (currentSong !== null) {
      return setOpen(true);
    }
    toast.error("No song selected");
  };

  return (
    <Fragment>
      <Tooltip title="Find Lyrics">
        <IconButton onClick={handleShowLyrics}>
          <FaMicrophoneAlt size={18} color={open ? "rgba(32,198,190,1)" : "white"} />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        //sx={{ boxShadow: "none" }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component={"div"}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button sx={{ bg: "none" }} onClick={() => setOpen(false)} variant="contained">
              <MdClose size={20} color="rgba(32,198,190,1)" />
            </Button>
          </Box>
          <CustomTextArea
            name={currentSong?.name.includes("-") ? currentSong?.name.split("-")[1].trim() : currentSong?.name}
            artist={currentSong?.name.includes("-") ? currentSong?.name.split("-")[0].replaceAll("&amp;", "&").trim() : playlistSelected}
          />
        </Box>
      </Modal>
    </Fragment>
  );
};

export default LyricsModal;