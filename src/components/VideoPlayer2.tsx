import styled from "@emotion/styled";
import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  playlist: string[]; // 재생 목록
}

const MusicPlayerWrap = styled.div`
  position: relative;
  border-radius: 10px;
  width: 328px;
  height: 180px;
  left: 50%;
  transform: translate(-50%, 20%);
  z-index: 2;
  .player {
    position: absolute;
    top: 0%;
    left: 0px;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow: hidden;
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 5px;
  width: 100%;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: var(--font-sm);
  color: #fff;
  &:disabled {
    display: none;
  }
  input {
    width: 100%;
    height: 3px;
    border-radius: 10px;
    background: linear-gradient(
      to right,
      #fff var(--progress),
      rgba(250, 250, 250, 0.5) 0
    );

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 10px;
      height: 10px;
      background: #fff;
      border-radius: 50%;
    }
  }
`;

export default function VideoPlayer2(props: VideoPlayerProps) {
  const { playing, setPlaying, playlist } = props;
  const playerRef = useRef<ReactPlayer>(null); // ReactPlayer의 ref 속성에 삽입해 메소드 제어 (변경된 재생 시간에 따른 실제 영상 재생 위치)
  const [played, setPlayed] = useState<number>(0); // 현재 재생 시간 (0부터 0.999999, 퍼센트로 표기된 총 재생 시간 대비 현재 시간 값)
  const [duration, setDuration] = useState<number>(0); // 총 재생 시간
  const [ready, setReady] = useState<boolean>(false); // onReady에서 영상이 로드된 상태값을 받아 사용
  const [curr, setCurr] = useState<string>("/video/v2.mov");

  const onEnded = () => {
    setCurr("https://youtu.be/ZXmoJu81e6A?si=cqMWOLxy-4PF0dxg");
    setPlaying(true);
  };

  // formatTime 함수 '분:초' 형태로 리턴
  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  return (
    <>
      <MusicPlayerWrap>
        <ReactPlayer
          url={curr} // 링크 배열로 삽입 가능(종료 시 onEnded없이도 자동으로 다음 인덱스의 링크 재생)
          ref={playerRef} // 실제 영상 재생 위치 조절
          className="player"
          playing={playing} // 재생 상태, true - 재생중 / false - 일시 중지
          controls={false} // 유튜브 재생바 노출 여부
          width="100%"
          height="100%"
          onEnded={onEnded} // 현재 영상 종료 시
          onReady={() => setReady(true)} // 영상이 로드되어 준비된 상태
          onDuration={(duration: number) => setDuration(duration)} // 총 재생 시간
          onProgress={({ played }: { played: number }) => setPlayed(played)} // 현재 재생 시간
        />
        <ProgressBar>
          <time dateTime="P1S">{formatTime(played * duration)}</time>
          <input
            type="range"
            min="0"
            max="0.999999"
            step="any"
            value={played}
            disabled={!ready}
            style={{ "--progress": `${played * 100}%` } as React.CSSProperties}
            onChange={(e) => {
              setPlayed(parseFloat(e.target.value)); // 재생 포인트 위치 실시간 변경
              playerRef.current?.seekTo(parseFloat(e.target.value)); // 실제 영상 재생 위치 실시간 변경
            }}
          />
          <time dateTime="P1S">{formatTime(duration)}</time>
        </ProgressBar>
      </MusicPlayerWrap>
    </>
  );
}
