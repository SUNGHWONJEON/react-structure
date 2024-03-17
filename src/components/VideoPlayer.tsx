import React, { useState } from "react";
import ReactPlayer from "react-player";
import styled from "@emotion/styled";

// 스타일드 컴포넌트를 사용하여 버튼 스타일링
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

export default function VideoPlayer3(props: VideoPlayerProps) {
  const { url } = props;
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [loading, setLoading] = useState(true);

  const handlePlayPause = () => {
    setPlaying((prevState) => !prevState);
  };

  const handleMute = () => {
    setMuted((prevState) => !prevState);
  };

  const handleReady = () => {
    setLoading(false);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* 영상 로딩 중에는 로딩바 표시 */}
      {loading && <div>Loading...</div>}

      {/* ReactPlayer를 사용하여 비디오 재생 */}
      <ReactPlayer
        url={url}
        playing={playing}
        muted={muted}
        controls
        width="100%"
        height="100%"
        pip={true}
        onReady={handleReady}
      />

      {/* 플레이/퍼즈 버튼 */}
      <PlayPauseButton onClick={handlePlayPause}>
        {playing ? "Pause" : "Play"}
      </PlayPauseButton>

      {/* 뮤트 버튼 */}
      <PlayPauseButton style={{ top: "90%", left: "5%" }} onClick={handleMute}>
        {muted ? "Unmute" : "Mute"}
      </PlayPauseButton>
    </div>
  );
}
