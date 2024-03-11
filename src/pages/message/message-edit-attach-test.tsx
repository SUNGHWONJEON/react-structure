import AttachCamera from '../../components/AttachCamera';
import AttachButton from '../../components/AttachButton';
import AttachList from '../../components/AttachList';
import Headers from '../../components/Headers';
import NextButton from '../../components/NextButton';
import React, { ChangeEvent, useState } from 'react';
import { useLocation } from 'react-router';
import TestComponent from '../../components/TestComponent';

export default function MessageEditAttachTest() {
  const location = useLocation();
  const state: any = location.state;

  const [attachList, setAttachList] = useState<any[]>([]);

  // 첨부파일 삭제
  const onDeleteAttach = (attachId: string) => {
    const updateAttachList = attachList.filter(att => attachId !== att.attachId);
    setAttachList(updateAttachList);
  };

  // 비디오 썸네일 생성 함수
  const generateThumbnail = (video: HTMLVideoElement): string => {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL();
  };

  // 첨부파일 추가
  const onChangeAttachFile = (files: FileList | null, thumbnail?: string) => {
    if (!files) return;

    Array.from(files).forEach(file => {
      const blob = new Blob([file], { type: file.type });
      const blobType = file.type.split('/').shift();

      if (blobType === 'video') {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => {
          video.play();
          setTimeout(()=>{
            video.pause();
            const thumbnail = generateThumbnail(video);
            const newAttach = {
              attachId: '',
              attachName: file.name,
              attachSize: blob.size,
              attachType: blobType,
              thumbnail: thumbnail,
              attach: blob
            };
            setAttachList(prevList => [...prevList, newAttach]);
          }, 500);
          
        };
        video.src = URL.createObjectURL(file);
      } else {
        // Handle other types of files here
      }
    });
  };

  return (
    <>
      <Headers />
      <div>추가로 전달할 파일이 있으신가요?</div>
      <div>영상, 사진, 음성 메모를 추가해 보세요.</div>
      {/* <img src="/img/swiper_1.png"></img> */}
      {/* <video controls style={{ maxWidth: '100%' }}>
        <source src={'/video/v2.mov'} type="video/webm"/>
        <source src={'/video/v2.mov'} type="video/mp4"/>
        Your browser does not support the video tag.
      </video> */}
      
      {/* 비디오 */}
      <AttachButton type="video" onChangeAttachFile={onChangeAttachFile} />
      <AttachList attachList={attachList} attachListType="video" onDeleteAttach={onDeleteAttach} />

      {/* 음성 */}
      <AttachButton type="audio" onChangeAttachFile={onChangeAttachFile} />
      <AttachList attachList={attachList} attachListType="audio" onDeleteAttach={onDeleteAttach} />

      <NextButton path="/message/edit-text" title="다음" item={state} />
      <TestComponent>
        <div>칠드런</div>
      </TestComponent>
    </>
  );
}
