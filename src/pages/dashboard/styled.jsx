import styled from "styled-components";
import waveBlack from "assets/wave.black.gif";

export const DashboardContainer = styled.div`
  background-color: black;
  height: 100vh;
  overflow: hidden;
  background-image: url(${waveBlack});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Container = styled.div`
  width: 100%;
  padding: 5px;
  height: ${({ height }) => height};
`;

export const GlassedContainerTop = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 10px;
  height: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
`;

export const GlassedColumn = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 10px;
  height: 100%;
  display: flex;
  gap: 10px;
  width: ${({ width }) => width};
  flex-direction: ${({ direction }) => direction};
  overflow: ${({ overflow }) => overflow || "auto"};
`;

export const SongsCardContainer = styled.div`
  padding: 5px;
  height: 74px;
  //height: 66px;
  overflow: hidden;
  border-radius: 4px;
  &:hover {
    //transform: scale(1.02);
    -webkit-box-shadow: -5px 39px 46px -12px rgba(0,0,0,1);
    -moz-box-shadow: -5px 39px 46px -12px rgba(0,0,0,1);
    box-shadow: -5px 19px 26px -12px rgba(0,0,0,1);
  }
  background: rgba(138, 136, 136, 0.2);

  @media screen and ((max-width:600px)){
    height: 68px;
  }
`;

export const PlayListCardContainer = styled.div`
  padding: 5px;
  cursor: pointer;
  border-radius: 4px;
  background: rgba(138, 136, 136, 0.2);
  //PAY ATTENTION TO THIS WHICH MAY REQUIRE TO BE CHANGED
  height: fit-content;
  
  &:hover {
    border-bottom: 1px solid #090909a8;
    -webkit-box-shadow: -5px 39px 46px -12px rgba(0,0,0,1);
    -moz-box-shadow: -5px 39px 46px -12px rgba(0,0,0,1);
    box-shadow: -5px 19px 26px -12px rgba(0,0,0,1);
  }
  //width: 100%;
`;

export const SongsCardWrapper = styled.div`
  display: grid;
  height: fit-content;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap:30px;
  justify-content: center;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and ((max-width:600px)){
    gap: 20px
  }
`;

export const SongsInfoWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-start;
`;

export const MusicLeftContainer = styled.div`
  width: 70%;
  @media screen and (max-width: 1046px) {
    width: 100%;
  }
`;

export const MusicRightContainer = styled.div`
  width: 30%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  @media screen and (max-width: 1046px) {
    display: none;
  }
`;

