import React from "react";
import { squircle } from "ldrs";
squircle.register();

const Loader = ({ size, color = "black" }) => (
  <l-squircle
    size={size}
    stroke="5"
    stroke-length="0.15"
    bg-opacity="0.1"
    speed="0.9"
    color={color}
  ></l-squircle>
);

export default Loader;