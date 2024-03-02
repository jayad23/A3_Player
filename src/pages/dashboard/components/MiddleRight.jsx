import React from "react";
import MiddleLeft from "./MiddleLeft";
import { useSelector } from "react-redux";
import { GlassedColumn } from "../styled";
import MusicManager from "./Music/MusicManager";
import { dictionary } from "constants/dictionary";
import YouTubeManager from "./YouTube/YouTubeManager";
import Admin from "pages/admin/Admin";

const ComponentRenderer = {
  [dictionary.youtube]: <YouTubeManager />,
  [dictionary.music]: <MusicManager />,
  [dictionary.admin]: <Admin />
};

const MiddleRight = ({ width }) => {
  const { menuSelected } = useSelector((state) => state.menu);
  const { middleRightGlassedColumn } = useSelector((state) => state.layout);

  return (
    <GlassedColumn
      width={width}
      direction="column"
      overflow="hidden"
      style={middleRightGlassedColumn}
    >
      {menuSelected === "playlists" && width === "100%" && (
        <MiddleLeft width="100%" />
      )}
      {ComponentRenderer[menuSelected]}
    </GlassedColumn>
  );
};

export default MiddleRight;