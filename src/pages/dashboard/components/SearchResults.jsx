import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { onAddNewSong } from "rdx/playlist";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { IoIosAddCircle, IoIosCheckmarkCircle } from "react-icons/io";
import { SongsCardContainer, SongsCardWrapper, SongsInfoWrapper } from "../styled";

const SongsCard = ({ length, songName, img, onSelectVideo, videoUrl, theyShouldBeAdded = false }) => {
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);

  const matches = useMediaQuery("(max-width:600px)");

  const handleAddManager = () => {
    if (!isAdded) {
      dispatch(onAddNewSong({ songName, img, videoUrl }));
      setIsAdded(true);
      return setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }
  };

  const onAddSong = () => {
    if (matches) {
      setIsAdded(true);
      onSelectVideo(videoUrl);
      return setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }
  };

  return (
    <SongsCardContainer
      style={length === 1 ?
        { height: "auto", cursor: matches ? "pointer" : "default", border: matches && isAdded ? "1px solid rgba(32, 198, 190, 1)" : "none" } :
        { cursor: matches ? "pointer" : "default", border: matches && isAdded ? "1px solid rgba(32, 198, 190, 1)" : "none" }
      }
    >
      <SongsInfoWrapper>
        <div
          style={{
            //width: "30%",
            //width: matches ? "23%" : "30%",
            cursor: "pointer",
            overflow: "hidden",
            height: length === 1 ? "auto" : matches ? "61px" : "65px",
            //height: "auto"
          }}
          onClick={() => onSelectVideo(videoUrl)}
        >
          <img
            src={img}
            style={{
              width: "100%",
              objectFit: "cover",
              height: "100%",
            }}
            alt={songName}
          />
        </div>
        <Box
          component={"div"}
          sx={{
            //width: matches ? "73%" : "70%",
            width: "100%",
            //width: "70%",
            display: "flex",
            // flexDirection: "column",
            justifyContent: "space-between",
          }}
          onClick={onAddSong}
        >
          {
            matches ? (
              <Typography sx={{ width: "100%", height: "100%", overflow: "auto" }} variant="caption">
                {songName}
              </Typography>
            ) : (
              <Fragment>
                <Typography sx={{ width: "87%", height: "100%", overflow: "auto" }} variant="caption">
                  {songName}
                </Typography>
                {
                  theyShouldBeAdded && (
                    <Box
                      component={"div"}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "10px",
                      }}
                    >
                      <Tooltip title="Add song to playlist">
                        <IconButton sx={{ padding: "5px" }} onClick={handleAddManager}>
                          {
                            isAdded ? (
                              <IoIosCheckmarkCircle size={20} color="rgba(32, 198, 190, 1)" />
                            ) : (
                              <IoIosAddCircle size={20} color="white" />
                            )
                          }
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )
                }
              </Fragment>
            )
          }
        </Box>
      </SongsInfoWrapper>
    </SongsCardContainer>
  );
};

const SearchResults = ({ data, onSelectVideo }) => {
  return (
    <SongsCardWrapper>
      {
        data.map((item, index) => (
          <SongsCard
            key={index}
            length={data.length}
            videoUrl={item.videoUrl}
            theyShouldBeAdded={true}
            songName={item.snippet.title}
            onSelectVideo={onSelectVideo}
            img={item.snippet.thumbnails.default.url}
            {...item.snippet}
          />
        ))
      }
    </SongsCardWrapper>
  );
};

export default SearchResults;