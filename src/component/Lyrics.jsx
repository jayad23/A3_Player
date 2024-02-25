import * as React from "react";
import { Box } from "@mui/material";
import axios from "axios";
export const CustomTextArea = ({ name, artist }) => {
  const [lyric, setLyric] = React.useState(["Finding lyrics..."]);

  React.useEffect(() => {
    setLyric(["Finding lyrics..."]);
    if (name && artist) {
      axios.get(`https://lyrist.vercel.app/api/${name}/${artist}`)
        .then((res) => {
          const splitted = res.data.lyrics.split("\n");
          setLyric(splitted);
        }).catch((err) => {
          console.log("Kz: 🏈 ~ .then ~ err:", err);
          setLyric(["Lyric not found"]);
        });
    }
  }, [name, artist]);

  return (
    <Box
      sx={{
        outline: "none",
        border: "none",
        background: "transparent",
        color: "white",
        width: "100%",
        height: "100%",
      }}
    >

      {
        lyric.map((row, idx) => (
          <div
            key={idx}
            style={{
              fontSize: "16px",
              margin: "5px 0px",
              fontWeight: row.includes("[") ? "bolder" : "normal",
              color: row.includes("[") ? "rgba(32,198,190,1)" : "white"
            }}>
            {row}
          </div>
        ))
      }
    </Box>
  );
};
