import Loader from "component/Loader";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { CgBrowse } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { useGetPreviousSearches } from "hooks/useGetPreviousSearches";
import { onPopulateSearches, onToggleSearchesModal } from "rdx/prevSearches";

const CommonSearches = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { onGetPreviousSearches } = useGetPreviousSearches();
  const { openOptionModal } = useSelector((state) => state.prevSearches);

  const onShowSearches = async () => {
    if (!openOptionModal) {
      setLoading(true);
      const previous = await onGetPreviousSearches();
      const searchesKeys = Object.keys(previous);
      dispatch(onPopulateSearches({ values: previous, searchValues: searchesKeys }));
      return setLoading(false);
    }
    dispatch(onToggleSearchesModal(!openOptionModal));
  };

  return (
    <Button
      //startIcon={<FaSearch />}
      startIcon={
        loading ? (
          <Loader size={20} color="white" />
        ) : (
          <CgBrowse />
        )
      }
      onClick={onShowSearches}
      variant="contained"
      sx={{
        backgroundColor: "rgba(32,198,190,1)",
        color: "white",
        "&:hover": {
          transition: "all 0.4s ease",
          backgroundColor: "rgba(47,64,182,1)",
        },
        visibility: {
          xs: "hidden",
          sm: "hidden",
          md: "visible",
          lg: "visible",
          xl: "visible",
        }
      }}
    >
      Prev Searches
    </Button>
  );
};

export default CommonSearches;