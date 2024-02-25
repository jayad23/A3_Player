import React, { Fragment, useState } from "react";
import { Button, IconButton } from "@mui/material";
import { MdLyrics } from "react-icons/md";
import { useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import toast from "react-hot-toast";
import { CustomTextArea } from "./Lyrics";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //top: 0,
  width: 500,
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
      <IconButton onClick={handleShowLyrics}>
        <MdLyrics size={18} color={open ? "rgba(32,198,190,1)" : "white"} />
      </IconButton>
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
            <Button onClick={() => setOpen(false)} variant="contained" color="error">
              Close
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