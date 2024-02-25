import "./style.css";
import React from "react";
import Loader from "./Loader";
import { Box, IconButton } from "@mui/material";
import { FaSearch, FaYoutube } from "react-icons/fa";

const divStyles = {
  gap: "10px",
  padding: "5px",
  display: "flex",
  borderRadius: "6px",
  alignItems: "center",
  border: "1px solid lightgray",

};

const inputStyles = {
  width: "100%",
  padding: "5px",
  border: "none",
  outline: "none",
  color: "white",
  fontWeight: "bold",
  background: "transparent",
};

const buttonStyles = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
};

const Search = ({ startIcon, endIcon, youtube, name, value, handleChange, loading }) => {
  return (
    <Box
      sx={divStyles}
      component={"div"}
    >
      {startIcon && (<FaSearch />)}
      <input
        type="text"
        name={name}
        value={value}
        autoComplete="off"
        style={inputStyles}
        onChange={handleChange}
        className="custom_search_input"
      />
      {
        youtube && (
          <IconButton>
            <FaYoutube size={20} color="white" />
          </IconButton>
        )
      }
      {endIcon && (
        <button
          style={buttonStyles}
        >
          {
            loading
              ? <Loader size={20} color="white" />
              : <FaSearch size={20} color="white" />
          }
        </button>
      )}
    </Box>
  );
};

export default Search;