import React from "react";
import { onSelectMenu } from "rdx/navmenu";
import { Box, Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Container, GlassedContainerTop } from "../styled";
import { FaYoutube, FaMusic, FaSpotify } from "react-icons/fa";
import LeftColumnMobile from "component/LeftColumnMobile";
// import { CiMenuBurger } from "react-icons/ci";
// import { ModalComponent } from "component/Modal";
// import { AiOutlineClose } from "react-icons/ai";
// import { FcHeadset } from "react-icons/fc";
// import { dictionary } from "constants/dictionary";

const icons = {
  "youtube": <FaYoutube color="white" />,
  "music": <FaMusic color="white" />,
  "spotify": <FaSpotify color="white" />,
};


const Top = () => {
  const { menuOptions, menuSelected } = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  return (
    <Container height={"10vh"}>
      <GlassedContainerTop>
        <LeftColumnMobile />
        <Box
          component="div"
          sx={{
            gap: "10px",
            display: {
              xs: "none",
              sm: "flex",
            }
          }}
        >
          {
            menuOptions.map(({ name, bg_default, disabled }) => (
              <Button
                key={name}
                disabled={disabled}
                variant="contained"
                sx={{
                  backgroundColor: `${menuSelected === name ? bg_default : "black"}`,
                  color: "white",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: `${bg_default}`,

                  },
                }}
                onClick={() => dispatch(onSelectMenu(name))}
                startIcon={icons[name]}
              >
                {name}
              </Button>
            ))
          }
        </Box>
        <Typography
          component="h1"
          variant="button"
          sx={{ color: "white", fontSize: "1.5rem" }}
        >
          {menuSelected}
        </Typography>
      </GlassedContainerTop>
    </Container>
  );
};

export default Top;