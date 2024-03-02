import React, { Fragment } from "react";
import existingData from "./data.json";
import SearchResults from "../dashboard/components/SearchResults";

const Admin = () => {
  console.log(existingData);
  const data = existingData["Alkolyricoz"];
  console.log("Kz: 🏈 ~ Admin ~ data:", data.songs);
  const handleSongSelected = (value) => {
    console.log("Song selected: ", value);
  };

  return (
    <Fragment>
      <h1>Admin</h1>
      <SearchResults
        data={data.songs.map(song => ({ ...song, snippet: { title: song.songName, thumbnails: { default: { url: song.img } } } }))}
        onSelectVideo={handleSongSelected}
      />
    </Fragment>
  );
};

export default Admin;