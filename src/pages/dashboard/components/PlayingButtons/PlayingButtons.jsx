import { SlLoop } from "react-icons/sl";
import { MdLyrics } from "react-icons/md";
import { TiArrowShuffle } from "react-icons/ti";
import { TbArrowLoopRight } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import { IoMdPlay, IoMdPause } from "react-icons/io";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, IconButton, Tooltip } from "@mui/material";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

import { useSelector, useDispatch } from "react-redux";
import { onPausePlay, onPreviousSong, onSelectNextSong, onShowLyrics, toggleSuffle } from "rdx/playlist";
import LyricsModal from "component/LyricsModal";
import toast from "react-hot-toast";
import CreateNewPlaylistMobile from "component/new-playlist/CreateNewPlaylistMobile";

const PlayingButtons = () => {
  const [playing, setPlaying] = useState(false);
  const dispatch = useDispatch();
  const { currentSong, shuffle, showLyrics } = useSelector((state) => state.playlist);
  const matches = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (currentSong !== null) {
      setPlaying(true);
    }
  }, [currentSong]);

  const handlePlayPause = () => {
    setPlaying(!playing);
    dispatch(onPausePlay(playing ? "pause" : "play"));
  };

  const disabledAllButtons = currentSong === null;

  const handleFindLyrics = () => {
    if (currentSong !== null) {
      return dispatch(onShowLyrics());
    }
    toast.error("No song selected");
  };

  return (
    <Box
      component={"div"}
      sx={{
        width: {
          xs: "100%",
          md: "70%"
        },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component={"div"}
        sx={{
          width: {
            xs: "100%",
            sm: "55%",
            md: "75%"
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Box>
          {
            matches && (
              <CreateNewPlaylistMobile />
            )
          }
          <IconButton disabled={disabledAllButtons} onClick={() => dispatch(toggleSuffle())}>
            <TiArrowShuffle size={18} color={shuffle ? "rgba(32,198,190,1)" : "white"} />
          </IconButton>
          {
            matches ? (
              <LyricsModal />
            ) : (
              <Tooltip title="Find Lyrics">
                <IconButton onClick={handleFindLyrics}>
                  <MdLyrics size={18} color={showLyrics ? "rgba(32,198,190,1)" : "white"} />
                </IconButton>
              </Tooltip>
            )
          }

        </Box>
        <Box
          component={"div"}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IconButton disabled={disabledAllButtons} onClick={() => dispatch(onPreviousSong({ idx: currentSong.index }))}>
            <GrFormPrevious color={"white"} />
          </IconButton>
          <IconButton disabled={disabledAllButtons} onClick={handlePlayPause}>
            {
              playing ? <IoMdPause size={30} color="white" /> : <IoMdPlay size={30} color="white" />
            }
          </IconButton>
          <IconButton disabled={disabledAllButtons} onClick={() => dispatch(onSelectNextSong({ idx: currentSong.index + 1 }))}>
            <GrFormNext color="white" />
          </IconButton>
        </Box>
        <Box
          component={"div"}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IconButton>
            <SlLoop disabled={disabledAllButtons} size={18} color="#eee" />
          </IconButton>
          <IconButton>
            <TbArrowLoopRight disabled={disabledAllButtons} size={18} color="#eee" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default PlayingButtons;