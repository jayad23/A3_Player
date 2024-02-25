import React from "react";
import { Box, Button } from "@mui/material";
import { RiPlayListFill } from "react-icons/ri";
import { useSelector, useDispatch, } from "react-redux";
import { Container, GlassedContainerTop } from "../styled";
import { onCreateNewPlaylist, onResetValues } from "rdx/playlist";
import PlayingButtons from "./PlayingButtons/PlayingButtons";

const Bottom = () => {
  const dispatch = useDispatch();
  const { playlistAction } = useSelector((state) => state.playlist);

  const onManageAction = () => {
    if (playlistAction === null) {
      return dispatch(onCreateNewPlaylist());
    }

    return dispatch(onResetValues());
  };

  return (
    <Container height={"10vh"}>
      <GlassedContainerTop>
        <Box
          component={"div"}
          sx={{
            width: "30%",
            display: {
              xs: "none",
              md: "inline-flex"
            }
          }}
        >
          <Button
            variant="contained"
            endIcon={<RiPlayListFill />}
            onClick={() => onManageAction()}
            sx={{
              backgroundColor: "rgba(32,198,190,1)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(47,64,182,1)",
              }
            }}
          >
            {
              playlistAction !== null ? "Playlists" : "Create Playlist"
            }
          </Button>
        </Box>
        <Box
          component={"div"}
          sx={{
            width: {
              xs: "100%",
              md: "70%"
            },
            display: "flex",
          }}
        >
          <PlayingButtons />
          <Box
            component={"div"}
            sx={{
              border: "1px solid red",
              width: "30%",
              visibility: "hidden",
              display: {
                xs: "none",
                sm: "none",
                md: "inline-flex"
              }
            }}
          >
            Controles de Volumen
          </Box>
        </Box>
      </GlassedContainerTop>
    </Container>
  );
};

export default Bottom;