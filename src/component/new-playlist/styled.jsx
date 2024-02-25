import styled from "styled-components";

export const PlaylistForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

export const FormFieldContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const FormFieldLabel = styled.span`
  font-size: 11px;
  text-transform: uppercase;
  font-weight: bold;
  color: rgba(32, 198, 190, 1);
`;

export const FormFieldInput = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: none;
  outline: none;
`;

export const PictureContainer = styled.div`
  border: 1px solid gray;
  height: 131px;
  cursor: pointer;
  //margin: 11px 0px 0px 0px;
  position: relative;
  overflow: hidden;
`;

export const CameraIconContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const SongsSelected = styled.div`
  height: 400px;
  margin-bottom: 10px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SongSelectedBox900 = {
  marginBottom: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  overflow: "auto",
  //height: { xs: "250px", sm: "265px", lg: "405px" },
  height: "100%",
  "&::-webkit-scrollbar": {
    display: "none",
  },
};

export const SongSelectedBox1080 = {
  marginBottom: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  overflow: "auto",
  height: { xs: "42.5vh", sm: "42.5vh", lg: "57vh" },
  "&::-webkit-scrollbar": {
    display: "none",
  },
};

export const PlaylistSubmitButton = styled.button`
  background: rgba(181, 181, 181, 0.8);
  border: none;
  color: #3d3b3b;
  padding: 10px;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  font-weight: bolder;
  text-transform: uppercase;
  &:hover {
    background: rgba(32, 198, 190, 1);
      color: white;
  };
  width: 100%;
`;