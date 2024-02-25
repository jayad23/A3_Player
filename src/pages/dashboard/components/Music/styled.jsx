import styled from "styled-components";

export const MusicManagerMainContainer = styled.div`
  height: 100%;
  display: flex;
  gap: 8px;
  overflow: hidden;
`;

export const SongNameContainer = styled.div`
  width: 80%;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: rgba(32,198,190,1);
`;

export const SongNameAndSearchContainer = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px",
  alignItems: "center",
  //border: "1px solid yellow",
  height: "7vh",
};

export const SearchResultContainer = {
  height: "100%",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  "&::-webkit-scrollbar": {
    display: "none",
  }
};

export const songCardContainer = {
  height: "22vh",
  overflowY: "auto",
  overflowX: "hidden",
  boder: "1px solid indigo",
  display: "flex",
  flexDirection: "column",
  //border: "1px solid red",
  gap: "8px",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  paddingBottom: "10px"
};

export const SongInformationWrapper = {
  display: "flex",
  gap: "5px",
  alignItems: "center",
  textAlign: "initial",
  justifyContent: "space-between",
};

export const ImgTextWrapper = {
  display: "flex",
  gap: "5px",
  alignItems: "center",
  width: "85%",
};

export const textWrapper = {
  fontSize: "12px",
  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const textWrapperAlt = {
  fontSize: "12px",
  width: "30%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
};

export const songImage = {
  width: "50px",
  height: "36px",
  objectFit: "contain"
};