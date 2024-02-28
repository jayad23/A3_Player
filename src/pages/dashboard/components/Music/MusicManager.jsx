import Search from "component/Search";
import ReactPlayer from "react-player";
import React, { Fragment } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { useMusicManager } from "./useMusicManager";
import { Box, IconButton, Tooltip } from "@mui/material";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
//import playing_waves_gif from "assets/playing_waves_two.gif";
import music_playing from "assets/music_playing.gif";
import { MusicLeftContainer, MusicRightContainer, PlayListCardContainer } from "../../styled";
import { ImgTextWrapper, MusicManagerMainContainer, SearchResultContainer, SongInformationWrapper, SongNameAndSearchContainer, SongNameContainer, songCardContainer, songImage, textWrapper } from "./styled";
import LayoutShift from "component/LayoutShift";
import { useSelector } from "react-redux";

const PlaylistCard = ({ id, songName, img, onSongSelected, currentSong }) => {
  const update = currentSong === songName;

  return (
    <PlayListCardContainer onClick={() => onSongSelected(id)}>
      <div style={SongInformationWrapper}>
        <Box
          component="article"
          sx={update ? {
            ...ImgTextWrapper,
            width: "65%",
          } : {
            ...ImgTextWrapper,
            width: "80%",
          }
          }
        >
          <img
            src={img}
            alt={songName}
            style={songImage}
          />
          <div style={textWrapper}>
            {songName.toUpperCase().replaceAll("&QUOT;", "").replaceAll("&AMP;", "&")}
          </div>
        </Box>
        {
          update && (
            <div style={{ width: "10%", height: "35px" }}>
              <img
                src={music_playing}
                alt={songName}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "fill"
                }}
              />
            </div>
          )
        }
        <Tooltip title="Add in playlist">
          <IconButton >
            <IoIosAddCircle color="white" size={20} />
          </IconButton>
        </Tooltip>
      </div>
    </PlayListCardContainer>
  );
};

const SongCard = ({ id, songName, img, onSongSelected, currentSong }) => {
  return (
    <PlayListCardContainer>
      <div style={SongInformationWrapper}>
        <Box
          component="article"
          sx={ImgTextWrapper}
        >
          <img
            src={img}
            alt={songName}
            style={songImage}
          />
          <Box component="div" sx={textWrapper}>
            {songName.toUpperCase().replaceAll("&QUOT;", "").replaceAll("&AMP;", "&")}
          </Box>
        </Box>

        <Tooltip title="Select">
          <IconButton onClick={() => onSongSelected(id)}>
            {
              currentSong === songName ? (
                <FaPauseCircle color="rgba(32,198,190,1)" size={20} />
              ) : (
                <FaPlayCircle color="white" size={20} />
              )
            }
          </IconButton>
        </Tooltip>
      </div>
    </PlayListCardContainer>
  );
};


const MusicManager = () => {
  const {
    loop,
    findSong,
    mediaRef,
    onNextSong,
    onFindSong,
    currentSong,
    onSongSelected,
    playlistSelectedToPlay,
    loading,
    onSearch,
    searchValue,
    handleChange,
    searchResults,
    onSelectSongFromSearch
  } = useMusicManager();
  const { musicLeftContainer, videoPlayerStyles, playingInformation, revertPlaylistWithSearch } = useSelector((state) => state.layout);
  return (
    <MusicManagerMainContainer>
      <MusicLeftContainer
        style={musicLeftContainer}
      >
        <Box
          component={"div"}
          sx={videoPlayerStyles}
        >
          {
            currentSong && (
              <ReactPlayer
                playing
                controls
                loop={loop}
                ref={mediaRef}
                width={"100%"}
                height={"100%"}
                url={currentSong.url}
                className="react-player"
                onEnded={() => onNextSong(currentSong.index + 1)}
              />
            )
          }
          <LayoutShift />
        </Box>
        <Box
          component="article"
          sx={SongNameAndSearchContainer}
          style={playingInformation.currentSong}
        >
          {
            currentSong && (
              <Fragment>
                <SongNameContainer>
                  NOW PLAYING: {currentSong.name.toUpperCase().replaceAll("&QUOT;", "").replaceAll("&AMP;", "&")}
                </SongNameContainer>
                <Search
                  startIcon
                  color="white"
                  value={findSong}
                  handleChange={onFindSong}
                />
              </Fragment>
            )
          }
        </Box>
        <Box
          component={"div"}
          sx={songCardContainer}
          style={playingInformation.songsCard}
        >
          {
            playlistSelectedToPlay.filter(song => song.songName.toLowerCase().includes(findSong.toLowerCase())).map((song) => (
              <SongCard
                key={song.id}
                id={song.id}
                img={song.img}
                songName={song.songName}
                currentSong={currentSong?.name}
                onSongSelected={onSongSelected}
              />
            ))
          }
        </Box>
      </MusicLeftContainer>
      <MusicRightContainer style={revertPlaylistWithSearch ? { width: `calc(100% - ${musicLeftContainer.width})` } : {}}>
        {
          revertPlaylistWithSearch && (
            <Box
              component={"div"}
              sx={{ ...songCardContainer, height: "auto", maxHeight: "50%" }}
            >
              {
                playlistSelectedToPlay.filter(song => song.songName.toLowerCase().includes(findSong.toLowerCase())).map((song) => (
                  <SongCard
                    key={song.id}
                    id={song.id}
                    img={song.img}
                    songName={song.songName}
                    currentSong={currentSong?.name}
                    onSongSelected={onSongSelected}
                  />
                ))
              }
            </Box>
          )
        }
        <form
          onSubmit={onSearch}
          style={{ marginBottom: "10px" }}
        >
          <Search
            youtube
            color="white"
            loading={loading}
            value={searchValue}
            handleChange={handleChange}
          />
          <button
            type="submit"
            style={{ display: "none" }}
          >
            Submit
          </button>
        </form>
        <Box
          component={"div"}
          sx={SearchResultContainer}
        >
          {
            searchResults.length > 0 && searchResults.map((result, index) => (
              <PlaylistCard
                key={result.uid}
                id={result.uid}
                index={index}
                currentSong={currentSong?.name}
                songName={result.snippet.title}
                onSongSelected={onSelectSongFromSearch}
                img={result.snippet.thumbnails.default.url}
              />
            ))
          }
        </Box>
      </MusicRightContainer>
    </MusicManagerMainContainer>
  );
};

export default MusicManager;