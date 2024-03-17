import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Player, ControlBar } from "video-react";
import ReactPlayer from "react-player";
import VideoPlayer from "../../components/VideoPlayer";

const ContainerDiv = styled.div`
  margin: 0 auto;
`;

export default function MessagePreview() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleBtn = (): void => {
    setIsPlaying(!isPlaying);
  };
  return (
    <>
      <ContainerDiv>
        <VideoPlayer url={"/video/v1.mp4"} />
      </ContainerDiv>
    </>
  );
}
