import Youtube from "./Youtube";
//import mockData from "db/mock.json";
import Search from "component/Search";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import SearchResults from "../SearchResults";
import { GrFormPreviousLink } from "react-icons/gr";
import { IconButton, Tooltip } from "@mui/material";
import { useYouTubeSearch } from "./useYouTubeSearch";
import useMediaQuery from "@mui/material/useMediaQuery";
import { PlayListCardContainer } from "pages/dashboard/styled";

const SearchCard = ({ searchValue, handleSelectSavedResults }) => (
  <PlayListCardContainer onClick={() => handleSelectSavedResults(searchValue)}>
    {searchValue}
  </PlayListCardContainer>
);

const YouTubeManager = () => {
  const matches = useMediaQuery("(max-width:600px)");

  const {
    loading,
    onSearch,
    onGoBack,
    searchValue,
    handleChange,
    searchResults,
    onSelectVideo,
    selectedVideoUrl,
    handleSelectSavedResults
  } = useYouTubeSearch();

  const { openOptionModal, searchValues } = useSelector((state) => state.prevSearches);

  return (
    <Fragment>
      <div style={{ display: "flex", gap: "10px", width: "100%" }}>
        <Tooltip title="Show prev results">
          <IconButton onClick={onGoBack}>
            <GrFormPreviousLink size={16} color="white" />
          </IconButton>
        </Tooltip>
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
      </div>

      {
        selectedVideoUrl && (
          <Youtube
            isMobile={matches}
            url={selectedVideoUrl}
          />
        )
      }
      {
        matches ? (
          <SearchResults
            data={searchResults}
            onSelectVideo={onSelectVideo}
          />
        ) : (
          <Fragment>
            {
              searchResults.length > 0 && !selectedVideoUrl && !openOptionModal && (
                <SearchResults
                  data={searchResults}
                  onSelectVideo={onSelectVideo}
                />
              )
            }
          </Fragment>
        )
      }
      {
        searchValues.length > 0 && openOptionModal && !selectedVideoUrl && (
          <div
            style={{
              top: "67px",
              display: "flex",
              gap: "10px",
              width: "100%",
              flexWrap: "wrap",
              height: searchValues.length > 100 ? "100%" : "auto",
              overflow: "auto",
              justifyContent: "flex-start",
            }}
          >
            {
              searchValues.map((search) => (
                <SearchCard
                  key={search}
                  searchValue={search}
                  handleSelectSavedResults={handleSelectSavedResults}
                />
              ))
            }
          </div>
        )
      }
    </Fragment>
  );
};

export default YouTubeManager;