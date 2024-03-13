import { useYouTubeSearch } from "pages/dashboard/components/YouTube/useYouTubeSearch";
import { useManagerSubCollections } from "hooks/useManagerSubCollections";
import SearchResults from "pages/dashboard/components/SearchResults";
import { MdCreateNewFolder, MdClose } from "react-icons/md";
import { Button, IconButton } from "@mui/material";
import React, { Fragment, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import { cleaningString } from "helper";
import Loader from "component/Loader";
import Search from "component/Search";
import Box from "@mui/material/Box";
import toast from "react-hot-toast";
import { v4 } from "uuid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //top: 0,
  width: "90%",
  bgcolor: "#000000c5",
  //height: "100%",
  height: "calc(100vh - 20px)",
  overflow: "auto",
  border: "2px solid rgba(32,198,190,1)",
  boxShadow: 24,
  padding: "20px 26px",
  borderRadius: "10px",
  "&::-webkit-scrollbar": {
    display: "none",
  }

};


const CreateNewPlaylistMobile = () => {
  const [open, setOpen] = useState(false);
  const { playlists_videos } = useSelector((state) => state.playlist);
  const [playlistSelected, setPlaylistSelected] = useState("create_new_playlist");
  const [newPlaylistValues, setNewPlaylistValues] = useState({ playlistName: "", songs: [], thumbnail: "", author: "" });

  const {
    loading,
    onSearch,
    //onGoBack,
    searchValue,
    handleChange,
    searchResults,
    //onSelectVideo,
    //selectedVideoUrl,
    //handleSelectSavedResults
  } = useYouTubeSearch();

  const handlePlaylistSelected = (value) => {
    setPlaylistSelected(value);
    const songs = playlists_videos.find((playlist) => playlist.name === value);
    setNewPlaylistValues({ playlistName: value, songs: songs.songs || [], thumbnail: songs.thumbnail || "", author: songs.author || "" });
  };

  const unSelectSong = (id) => {
    const songs = newPlaylistValues.songs.filter((song) => song.id !== id);
    setNewPlaylistValues({ ...newPlaylistValues, songs });
  };

  const onSelectVideo = (video) => {
    const videoSelected = searchResults.find((result) => result.videoUrl === video);
    const songToBeAdded = {
      lyrics: "",
      timesPlayed: 1,
      img: videoSelected.snippet.thumbnails.default.url,
      videoUrl: videoSelected.videoUrl,
      mp364: "",
      songName: cleaningString(videoSelected.snippet.title),
      id: v4()
    };
    setNewPlaylistValues({
      ...newPlaylistValues,
      thumbnail: newPlaylistValues.thumbnail === "" ? videoSelected.snippet.thumbnails.high.url : newPlaylistValues.thumbnail,
      songs: [...newPlaylistValues.songs, songToBeAdded]
    });
  };

  const { onUpdatePlaylistsVideos, loading: loadingCreate } = useManagerSubCollections("playlists_videos");

  const handleCreatePlaylist = () => {

    if (newPlaylistValues.playlistName === "" || newPlaylistValues.songs.length === 0) {
      toast.error("Please select a playlist name and at least one song");
      return;
    }
    const newPlaylistId = v4();
    onUpdatePlaylistsVideos(newPlaylistId, {
      id: newPlaylistId,
      thumbnail: newPlaylistValues.thumbnail,
      name: newPlaylistValues.playlistName,
      songs: newPlaylistValues.songs,
      author: localStorage.getItem("userId"),
    });
  };
  return (
    <Fragment>
      <IconButton onClick={() => setOpen(true)}>
        <MdCreateNewFolder size={18} color={open ? "rgba(32,198,190,1)" : "white"} />
      </IconButton>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component={"div"}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <form style={{ width: "100%" }} onSubmit={onSearch}>
              <Search
                endIcon
                loading={loading}
                name="searchValue"
                value={searchValue}
                handleChange={handleChange}
              />
              <button
                type="submit"
                style={{ display: "none" }}
              >
                Search
              </button>
            </form>
            <Button sx={{ background: "none" }} onClick={() => setOpen(false)} variant="contained">
              <MdClose size={18} color="rgba(32,198,190,1)" />
            </Button>
          </Box>
          <Box
            component="section"
            sx={{
              mt: 1,
              color: "white"
            }}
          >
            <Box
              component={"div"}
              sx={{
                display: "flex",
                gap: "8px",
                flexDirection: "column",
              }}
            >
              <label htmlFor="created_playlist">Playlist Selected</label>
              <select
                id="created_playlist"
                onChange={(e) => handlePlaylistSelected(e.target.value)}
                style={{
                  border: "1px solid lightgray",
                  padding: "8px",
                  borderRadius: "6px",
                  outline: "none",
                  autoComplete: "off",
                }}
              >
                <option value="create_new_playlist">Create new playlist</option>
                {
                  playlists_videos.map((playlist) => (
                    <option
                      key={playlist.name}
                      value={playlist.name}
                    >
                      {playlist.name}
                    </option>
                  ))
                }
              </select>
            </Box>
            <Box
              component={"div"}
              sx={{
                display: "flex",
                gap: "8px",
                flexDirection: "column",
                mt: 2,
              }}
            >
              <label style={{ color: playlistSelected !== "create_new_playlist" ? "#615f5f" : "white" }} htmlFor="new_created_playlist">New playlist:</label>
              <input
                id="new_created_playlist"
                disabled={playlistSelected !== "create_new_playlist"}
                style={{
                  border: playlistSelected !== "create_new_playlist" ? "none" : "1px solid lightgray",
                  padding: "8px",
                  borderRadius: "6px",
                  outline: "none",
                }}
                autoComplete="off"
                type="text"
                value={newPlaylistValues.playlistName}
                onChange={(e) => setNewPlaylistValues({ ...newPlaylistValues, playlistName: e.target.value })}
              />
            </Box>
            <Box
              component={"div"}
              sx={{
                display: "flex",
                gap: "8px",
                flexDirection: "column",
                mt: 2,
              }}
            >
              <span>Songs: </span>
              <Box
                component="div"
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: "5px",
                  border: "1px solid white",
                  padding: "3px",
                  borderRadius: "6px",
                  height: "auto",
                  minHeight: "30px",
                  maxHeight: "100px",
                  overflow: "auto",
                  backgroundColor: "white",
                  flexWrap: "wrap",
                }}
              >
                {
                  newPlaylistValues.songs.map((song) => (
                    <span
                      key={song.id}
                      style={{
                        color: "white",
                        backgroundColor: "rgba(32,198,190,1)",
                        height: "30px",
                        padding: "2px 6px",
                        borderRadius: "3px",
                        width: "fit-content",
                        position: "relative",
                      }}
                    >
                      {song.songName}
                      <Box
                        component="span"
                        sx={{ position: "absolute", top: "-2px", right: 0 }}
                      >
                        <IconButton
                          sx={{
                            padding: 0,
                            "&:hover": {
                              backgroundColor: "white"
                            }
                          }}
                          onClick={() => unSelectSong(song.id)}
                        >
                          <IoMdCloseCircle />
                        </IconButton>
                      </Box>
                    </span>
                  ))
                }
              </Box>
            </Box>
          </Box>
          <Box
            component="section"
            sx={{
              mt: 2,
              height: "47%",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              color: "white"
            }}
          >
            <SearchResults
              data={searchResults}
              onSelectVideo={onSelectVideo}
            />
          </Box>
          <Button
            variant="contained"
            type="button"
            sx={{
              mt: 2,
              width: "100%",
              backgroundColor: "rgba(32,198,190,0.8)",
              "&:hover": {
                backgroundColor: "rgba(32,198,190,1)",
              }
            }}
            onClick={handleCreatePlaylist}
          >
            {
              loadingCreate ? (
                <Loader size={20} color="white" />
              ) : (
                <Fragment>
                  {playlistSelected !== "create_new_playlist" ? "Update" : "Create"} playlist
                </Fragment>
              )
            }
          </Button>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default CreateNewPlaylistMobile;