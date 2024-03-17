import React, { useState, useRef } from "react";
import styled from "@emotion/styled";

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
`;

const PlayPauseButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      setPlaying(!videoRef.current.paused);
    }
  };

  return (
    <VideoWrapper onClick={handlePlayPause}>
      <Video ref={videoRef} src={url} controls autoPlay={false} />
      {/* 플레이/퍼즈 버튼 */}
      <PlayPauseButton>{playing ? "Pause" : "Play"}</PlayPauseButton>
    </VideoWrapper>
  );
};

export default VideoPlayer;
