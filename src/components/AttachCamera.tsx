import React, { useRef, useState, useCallback, useEffect } from 'react';
import dayjs from 'dayjs';

interface attachCameraProps {
  onChangeAttachFile: (files: any, thumbnail?: string) => void;
}

export default function AttachCamera(props: attachCameraProps) {
  const { onChangeAttachFile } = props;
  const videoRef = useRef<HTMLVideoElement>(null); // 비디오 레프
  const thumbnailCanvasRef = useRef<HTMLCanvasElement | null>(null); // 썸네일 캔버스
  const mediaRecorder = useRef<MediaRecorder | null>(null); // 미디어 리코더
  const videoChunks = useRef<Blob[]>([]); // 비디오 []
  const [mimeType, setMimeType] = useState<string>('video/webm'); // 비디오 타입
  const [isRecording, setIsRecording] = useState<boolean>(false); // 레코딩 중인지 boolean
  const [showCompleted, setShowCompleted] = useState<boolean>(false); // 완료 되었는지 boolean
  const [thumbnail, setThumbnail] = useState<string>('');

  // 권한 얻기 및 미디어 녹화 시작
  const startRecording = useCallback(async () => {
    try {
      const videoConstraints: MediaStreamConstraints = {
        audio: false,
        video: true,
      };

      const videoStream = await navigator.mediaDevices.getUserMedia(
        videoConstraints
      );

      if (videoRef.current) {
        videoRef.current.srcObject = videoStream;
      }

      // MediaRecorder 추가
      const combinedStream = new MediaStream([
        ...videoStream.getVideoTracks(),
      ]);

      const recorder = new MediaRecorder(combinedStream, {
        mimeType: mimeType,
      });

      recorder.ondataavailable = (e) => {
        if (typeof e.data === 'undefined') return;
        if (e.data.size === 0) return;
        videoChunks.current.push(e.data);
      };

      mediaRecorder.current = recorder;
      mediaRecorder.current?.start();
      console.log('recorder : ' + JSON.stringify(recorder));
    } catch (err) {
      console.log(err);
    }
  }, [mimeType]);


  const handleStartRecording = () => {
    setIsRecording(true);
    startRecording();
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setShowCompleted(true);
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      captureThumbnail();
    }
  };

  const handleCompleted = () => {
    setShowCompleted(false);
    const videoBlob = new Blob(videoChunks.current, { type: 'video/webm' });
    onChangeAttachFile(videoChunks.current, thumbnail);
    videoChunks.current = [];
  };

  const captureThumbnail = () => {
    if (!videoRef.current || !thumbnailCanvasRef.current) return;
  
    const canvas = thumbnailCanvasRef.current;
    const context = canvas.getContext('2d');
  
    if (context) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // 캔버스 컨텐츠를 url 로 변경
      const thumbnailDataUrl = canvas.toDataURL('image/png');
      setThumbnail(thumbnailDataUrl);
      return thumbnailDataUrl;
    }
  };

  // 비디오 다운로드 
  const downloadVideo = () => {
    const blob = new Blob(videoChunks.current, { type: mimeType });
    const videoUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `My video - ${dayjs().format('YYYYMMDD')}.webm`;
    link.href = videoUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const displaySet = () => {
    const display = !isRecording ? 'none' : 'block';
    return display;
  };

  const sendToServer = () => {
    const videoBlob = new Blob(videoChunks.current, { type: 'video/webm' });
    const formData = new FormData();
    formData.append('video', videoBlob);
  } 

  return (
    <div className="camera-container">
      {!isRecording && !showCompleted && (
        <button onClick={handleStartRecording}>Start Recording</button>
      )}
      {isRecording && (
        <button onClick={handleStopRecording}>Stop Recording</button>
      )}
      {!isRecording && showCompleted && (
        <>
          <button onClick={handleCompleted}>Completed</button>
          {thumbnail && (
            <img src={thumbnail} alt="Thumbnail" />
          )}
        </>
      )}
      <video ref={videoRef} className="camera-video" autoPlay={isRecording} style={{ display: displaySet() }}/>
      
      <canvas ref={thumbnailCanvasRef} style={{ display: 'none' }} />
      <button onClick={downloadVideo}>Download</button>
    </div>
  );
}
