import { FaYoutube, FaMusic, FaSpotify } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, Fragment } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Box, IconButton } from "@mui/material";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdLogOut } from "react-icons/io";
import { onSelectMenu } from "rdx/navmenu";
import { ModalComponent } from "./Modal";

const iconsXsMenu = {
  youtube: FaYoutube,
  music: FaMusic,
  spotify: FaSpotify
};

const LeftColumnMobile = () => {
  const { menuOptions } = useSelector((state) => state.menu);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  // const onManageAction = () => {
  //   if (playlistAction === null) {
  //     setOpen(false);
  //     return dispatch(onCreateNewPlaylist());
  //   }

  //   return dispatch(onResetValues());
  // };

  const onHandleMenu = (menu) => {
    const menuClicked = menu === "music" ? "playlists" : menu;
    dispatch(onSelectMenu(menuClicked));
    setOpen(false);
  };

  return (
    <Fragment>
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          display: {
            xs: "flex",
            sm: "none",
          }
        }}
      >
        {
          open ? <AiOutlineClose color="white" /> : <CiMenuBurger color="white" />
        }
      </IconButton>
      {
        open && (
          <ModalComponent
            open={open}
            handleClose={() => setOpen(false)}
          >
            <Box
              component="div"
              sx={{
                gap: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white"
              }}
            >
              {
                menuOptions.filter(el => el.name !== "spotify").map(({ name, bg_default, disabled }) => (
                  <IconButton
                    key={name}
                    disabled={disabled}
                    onClick={() => onHandleMenu(name)}
                  >
                    {iconsXsMenu[name]({ color: bg_default })}
                  </IconButton>
                ))
              }
              <Box>
                <IconButton
                //onClick={() => dispatch(onManageAction())}
                >
                  <IoMdLogOut size={26} />
                </IconButton>
              </Box>
            </Box>
          </ModalComponent>
        )
      }
    </Fragment>
  );
};

export default LeftColumnMobile;