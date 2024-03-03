import { PlaylistForm, FormFieldContainer, FormFieldInput, FormFieldLabel, PictureContainer, CameraIconContainer, PlaylistSubmitButton, SongSelectedBox900, playlistContainerSx, firstBoxSx, divAsForm, songsCounterBoxSx, spanCount, divInMobile } from "./styled";
import { useManagerSubCollections } from "hooks/useManagerSubCollections";
import React, { useRef, useState, useEffect, Fragment } from "react";
import { PlayListCardContainer } from "pages/dashboard/styled";
import { onRemoveSong, onResetValues } from "rdx/playlist";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { TbCameraPlus } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { cleaningString } from "helper";
import Loader from "component/Loader";
import { v4 } from "uuid";

const FormField = ({ id, label, type, value, onChange }) => {
  return (
    <FormFieldContainer>
      <FormFieldLabel htmlFor={id}>
        {label}
      </FormFieldLabel>
      <FormFieldInput
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={label}
      />
    </FormFieldContainer>
  );
};

const PlaylistCard = ({ songName, img, id }) => {
  const dispatch = useDispatch();

  return (
    <PlayListCardContainer>
      <div style={{ display: "flex", gap: "5px", alignItems: "center", textAlign: "initial" }}>
        <img
          src={img}
          alt={songName}
          style={{ width: "50px", height: "36px", objectFit: "contain" }}
        />
        <div style={{ fontSize: "12px", width: "80%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {songName}
        </div>
        <Tooltip title="Remove">
          <IconButton onClick={() => dispatch(onRemoveSong(id))}>
            <MdDelete color="white" size={20} />
          </IconButton>
        </Tooltip>
      </div>
    </PlayListCardContainer>
  );
};

const CreateNewPlaylist = ({ isMobile }) => {
  const dispatch = useDispatch();
  const imgInputRef = useRef(null);
  const [playlistName, setPlaylistName] = useState("");
  const [image, setImage] = useState({ name: "", url: null });
  const { playlistAction, songsToBeSaved, playsListInformation } = useSelector((state) => state.playlist);
  const { onUpdatePlaylistsVideos, loading } = useManagerSubCollections("playlists_videos");

  useEffect(() => {
    if (playsListInformation && playlistAction === "update") {
      setPlaylistName(playsListInformation.playlistName);
      setImage(playsListInformation.playlistImage);
    }
  }, [playsListInformation]);

  const handleImageClick = () => {
    imgInputRef.current.click();
    imgInputRef.current.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage({ name: file.name, url: reader.result });
      };
      reader.readAsDataURL(file);
    };
  };

  const handleImageUrl = (url) => {
    setImage({ name: url, url });
  };

  const handleManagerAction = () => {
    const playlistId = playsListInformation?.playlistId || v4();
    onUpdatePlaylistsVideos(playlistId, {
      id: playlistId,
      thumbnail: image.url,
      name: playlistName,
      songs: songsToBeSaved.map(el => ({
        ...el,
        songName: cleaningString(el.songName),
        lyrics: "",
        mp364: "",
        timesPlayed: 1
      })),
      author: localStorage.getItem("userId"),
    });
  };

  return (
    <PlaylistForm>
      <Box
        component={"div"}
        sx={playlistContainerSx}
      >
        <Box
          component={"div"}
          sx={firstBoxSx}
        >
          <PictureContainer onClick={handleImageClick}>
            <CameraIconContainer style={image.url ? { height: "130px" } : {}} >
              {
                image.url ? (
                  <img
                    src={image.url}
                    alt="playlist"
                    style={{ height: "130px" }}
                  />
                ) : (
                  <TbCameraPlus color="white" size={20} />
                )
              }
            </CameraIconContainer>
            <input
              type="file"
              name="myImage"
              ref={imgInputRef}
              style={{ display: "none" }}
              accept="image/png, image/gif, image/jpeg"
            />
          </PictureContainer>
        </Box>
        <Box
          component={"div"}
          sx={divAsForm}>
          <Box
            component={"div"}
            sx={songsCounterBoxSx}
          >
            <span style={spanCount}>{songsToBeSaved.length}</span>
          </Box>
          <FormField
            type="text"
            id="playlistName"
            label="Playlist name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
          <FormField
            type="text"
            id="imageUrl"
            label="Image URL"
            value={image.name}
            onChange={(e) => handleImageUrl(e.target.value)}
          />
        </Box>
      </Box>
      <Box sx={SongSelectedBox900}>
        {
          songsToBeSaved.length > 0 && songsToBeSaved.map((song) => (
            <PlaylistCard
              id={song.id}
              key={song.id}
              img={song.img}
              songName={song.songName}
            />
          ))
        }
      </Box>
      {
        isMobile ? (
          <Box
            component={"div"}
            sx={divInMobile}
          >
            <PlaylistSubmitButton
              type="button"
              onClick={() => dispatch(onResetValues())}
            >
              Return
            </PlaylistSubmitButton>
            <PlaylistSubmitButton type="button" onClick={handleManagerAction}>
              {
                loading ? (
                  <Loader size={20} color="white" />
                ) : (
                  <Fragment>
                    {playlistAction} playlist
                  </Fragment>
                )
              }
            </PlaylistSubmitButton>
          </Box>
        ) : (
          <PlaylistSubmitButton
            type="button"
            onClick={handleManagerAction}
          >
            {
              loading ? (
                <Loader size={20} color="white" />
              ) : (
                <Fragment>
                  {playlistAction} playlist
                </Fragment>
              )
            }
          </PlaylistSubmitButton>
        )
      }
    </PlaylistForm>
  );
};

export default CreateNewPlaylist;