import Search from "component/Search";
import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { Box, IconButton, Tooltip } from "@mui/material";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { GlassedColumn, PlayListCardContainer } from "../styled";
import { onSelectPlaylistToPlay, onUpdatePlaylist } from "rdx/playlist";
import CreateNewPlaylist from "component/new-playlist/CreateNewPlaylist";
import { useManagerSubCollections } from "hooks/useManagerSubCollections";

import { onSelectMenu } from "rdx/navmenu";
import { dictionary } from "constants/dictionary";
import { CustomTextArea } from "component/Lyrics";
import toast from "react-hot-toast";

const PlaylistCard = ({ songName, img, songs, playlistId }) => {
  const dispatch = useDispatch();
  const { playlistSelected } = useSelector((state) => state.playlist);

  const onPlayPauseAction = (name) => {
    if (songs.length === 0) {
      toast.error("No songs to play");
      return;
    }
    dispatch(onSelectPlaylistToPlay(name));
    dispatch(onSelectMenu(dictionary.music));
  };

  return (
    <PlayListCardContainer>
      <div style={{ display: "flex", gap: "5px", alignItems: "center", textAlign: "initial" }}>
        <img
          src={img}
          alt={songName}
          style={{ width: "50px", height: "36px", objectFit: "contain" }}
        />
        <div style={{ fontSize: "12px", width: "80%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {songName.toUpperCase()}
        </div>
        <Tooltip title="Select">
          <IconButton onClick={() => onPlayPauseAction(songName)}>
            {
              playlistSelected === songName ? (
                <FaPauseCircle color="rgba(32,198,190,1)" size={20} />
              ) : (
                <FaPlayCircle color="white" size={20} />
              )
            }
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton onClick={() => dispatch(onUpdatePlaylist({ songName, img, songs, playlistId }))}>
            <BsCreditCard2FrontFill color="white" size={20} />
          </IconButton>
        </Tooltip>
      </div>
    </PlayListCardContainer>
  );
};

const MiddleLeft = ({ width }) => {
  const { playlistAction, currentSong, playlistSelected, showLyrics } = useSelector((state) => state.playlist);
  const { middleLeftGlassedColumn } = useSelector((state) => state.layout);
  const { data } = useManagerSubCollections("playlists_videos");
  const [search, setSearch] = useState("");

  return (
    <GlassedColumn
      width={width}
      overflow="hidden"
      direction="column"
      style={middleLeftGlassedColumn}
    >
      {
        showLyrics && currentSong !== null && (
          <Box
            component={"div"}
            sx={{
              display: "flex",
              justifyContent: "center",
              height: "100%",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              }
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "white" }}>
                {currentSong?.name.replaceAll("&amp;", "&") || "No Song selected"}
              </div>
              <CustomTextArea
                name={currentSong?.name.includes("-") ? currentSong?.name.split("-")[1].trim() : currentSong?.name}
                artist={currentSong?.name.includes("-") ? currentSong?.name.split("-")[0].replaceAll("&amp;", "&").trim() : playlistSelected}
              />
            </div>
          </Box>
        )
      }
      {
        playlistAction === null && !showLyrics && (
          <Fragment>
            <Search
              startIcon
              value={search}
              handleChange={(e) => setSearch(e.target.value)}
            />
            <Box
              component={"div"}
              sx={{
                height: "100%",
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                "&::-webkit-scrollbar": {
                  display: "none",
                }
              }}
            >
              {
                data.length > 0 && data.filter(el => el.name.toLowerCase().includes(search.toLowerCase())).map((item, index) => (
                  <PlaylistCard
                    key={index}
                    songs={item.songs}
                    playlistId={item.id}
                    img={item.thumbnail}
                    songName={item.name}
                  />
                ))
              }
            </Box>
          </Fragment>
        )
      }
      {
        playlistAction !== null && !showLyrics && (
          <CreateNewPlaylist
            isMobile={width === "100%"}
          />
        )
      }
    </GlassedColumn>
  );
};

export default MiddleLeft;