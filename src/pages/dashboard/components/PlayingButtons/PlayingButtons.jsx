import { SlLoop } from "react-icons/sl";
import { FaMicrophoneAlt } from "react-icons/fa";
import { TiArrowShuffle } from "react-icons/ti";
import { TbArrowLoopRight } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import { IoMdPlay, IoMdPause } from "react-icons/io";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, IconButton, Tooltip } from "@mui/material";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import CreateNewPlaylistMobile from "component/new-playlist/CreateNewPlaylistMobile";
import { onPausePlay, onPlaySongsInAllPlaylists, onPreviousSong, onRepeatSong, onSelectNextSong, onShowLyrics, toggleSuffle } from "rdx/playlist";
import { useSelector, useDispatch } from "react-redux";
import { RiRepeatOneFill } from "react-icons/ri";
import LyricsModal from "component/LyricsModal";
import { first, second, third } from "./styles";
import toast from "react-hot-toast";

const PlayingButtons = () => {
  const dispatch = useDispatch();
  const [playing, setPlaying] = useState(false);
  const { currentSong, shuffle, showLyrics, loop, suffleAllPlaylists } = useSelector((state) => state.playlist);
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

  const handleRepeatSingle = () => {
    if (disabledAllButtons) return;
    dispatch(onRepeatSong());
  };

  const handleShuffleAllPlaylists = () => {
    if (disabledAllButtons) return;
    dispatch(onPlaySongsInAllPlaylists());
  };

  return (
    <Box
      component={"div"}
      sx={first}
    >
      <Box
        component={"div"}
        sx={second}
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
                  <FaMicrophoneAlt size={18} color={showLyrics ? "rgba(32,198,190,1)" : "white"} />
                </IconButton>
              </Tooltip>
            )
          }

        </Box>
        <Box
          component={"div"}
          sx={third}
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
            ...third,
            mr: 2
          }}
        >
          <IconButton onClick={handleRepeatSingle}>
            {
              loop ? <RiRepeatOneFill size={18} color="rgba(32,198,190,1)" /> : <SlLoop size={18} color="white" />
            }
          </IconButton>
          <Tooltip title="Play all songs in all playlists">
            <IconButton onClick={handleShuffleAllPlaylists}>
              {
                suffleAllPlaylists ? <TbArrowLoopRight size={18} color="rgba(32,198,190,1)" /> : <TbArrowLoopRight size={18} color="white" />
              }
            </IconButton>
          </Tooltip>
          <IconButton
            sx={{
              display: {
                xs: "none",
                sm: "none",
              }
            }}
          >
            <TbArrowLoopRight disabled={disabledAllButtons} size={18} color="#eee" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default PlayingButtons;