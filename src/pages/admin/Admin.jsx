import { Box, Button } from "@mui/material";
import { FormFieldLabel } from "component/new-playlist/styled";
//import { PlayListCardContainer } from "pages/dashboard/styled";
import { BsFillSendArrowUpFill } from "react-icons/bs";
import React, { Fragment, useState } from "react";
import ReactPlayer from "react-player";
import SearchResults from "../dashboard/components/SearchResults";

const styles = {
  input: {
    padding: "8px",
    border: "none",
    outline: "none",
    borderRadius: "4px",
    width: "300px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "calc(300px + 16px)",
    border: "1px solid #e0e0e0",
    padding: "8px",
  },
  container: {
    display: "flex",
    gap: "20px"
  }
};

const Admin = () => {
  const [values, setValues] = useState({ songName: "", videoUrl: "", img: "" });
  return (
    <Fragment>
      <h1>Admin</h1>
      <Box
        component="div"
        sx={styles.container}
      >
        <form style={styles.form}>
          <FormFieldLabel htmlFor="name_song">
            Name of the song:
          </FormFieldLabel>
          <input
            type="text"
            tabIndex={1}
            id="name_song"
            style={styles.input}
            placeholder="Name of the song"
            value={values.songName}
            onChange={(e) => setValues({ ...values, songName: e.target.value })}
          />
          <FormFieldLabel htmlFor="video_url">
            Video URL:
          </FormFieldLabel>
          <input
            type="text"
            tabIndex={2}
            id="video_url"
            style={styles.input}
            values={values.videoUrl}
            placeholder="Name of the song"
            onChange={(e) => setValues({ ...values, videoUrl: e.target.value })}
          />
          <FormFieldLabel htmlFor="song_img">
            Img:
          </FormFieldLabel>
          <input
            type="text"
            tabIndex={2}
            id="song_img"
            style={styles.input}
            values={values.img}
            placeholder="Name of the song"
            onChange={(e) => setValues({ ...values, img: e.target.value })}
          />
          <Button
            tabIndex={3}
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              background: "indigo",
              "&:hover": {
                background: "indigo",
              }
            }}
            endIcon={<BsFillSendArrowUpFill size={20} color="white" />}
          >
            Add Song
          </Button>
        </form>
        <Box
          component="div"
          sx={{ border: "1px solid white", width: "380px" }}
        >
          <ReactPlayer
            url={values.videoUrl}
            width="100%"
            height="100%"
            controls
            playing
          />
        </Box>
      </Box>
      <SearchResults
        data={[
          {
            videoUrl: values.videoUrl,
            snippet: {
              title: values.songName,
              thumbnails: {
                default: {
                  url: values.img
                }
              }
            },
          },
          {
            videoUrl: values.videoUrl,
            snippet: {
              title: values.songName,
              thumbnails: {
                default: {
                  url: values.img
                }
              }
            },
          }
        ]}
      />
    </Fragment>
  );
};

export default Admin;