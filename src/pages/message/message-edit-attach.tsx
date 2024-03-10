import AttachCamera from '../../components/AttachCamera';
import AttachButton from '../../components/AttachButton';
import AttachList from '../../components/AttachList';
import Headers from '../../components/Headers';
import NextButton from '../../components/NextButton';
import React, { ChangeEvent, useState } from 'react';
import { useLocation } from 'react-router';

export default function MessageEditAttach() {
  const location = useLocation();
  const state = location.state;

  const [attachList, setAttachList] = useState<any>([
    {
      attachId: 'a-1',
      attachName: 'ASDASDSAD',
      attachSize: '1024',
      attachType: 'video',
      thumbnail: '',
      attach: ''
    },
    {
      attachId: 'a-2',
      attachName: 'FDGFGFDGFDG',
      attachSize: '1024',
      attachType: 'video',
      thumbnail: '',
      attach: ''
    },
    {
      attachId: 'a-3',
      attachName: '435345435',
      attachSize: '1024',
      attachType: 'image',
      thumbnail: '',
      attach: ''
    }
  ]);

  // 첨부파일 삭제
  const onDeleteAttach = (attachId: string) => {
    console.log('attachId : ' + attachId);
    const updateAttachList = attachList.filter((att: { attachId: string }) => attachId !== att.attachId);
    setAttachList(updateAttachList);
  }

  // 첨부파일 추가
  const onChangeAttachFile = (files: any, thumbnail?: string) => {
    
    // 파일에서 값 읽어오기
    const newAttachData = files.map((file: any) => {
      const blob = new Blob([file], { type: file.type }); // Blob 생성자에 배열을 전달하여 Blob 객체 생성
      console.log('type : ' + blob.type);
      const blobType = blob.type.split('/').shift();//타입
      const durationAll = '';

      if(blobType === 'video'){
        // 비디오
        const blobElement = document.createElement(blobType);
        blobElement.addEventListener('loadedmetadata', () => {
            const durationInSeconds = blobElement.duration;
            const durationInMinutes = Math.floor(durationInSeconds / 60);
            const remainingSeconds = Math.floor(durationInSeconds % 60);
            console.log(`비디오  길이: ${durationInMinutes}분 ${remainingSeconds}초`);
            blobElement.remove();
        });

        blobElement.src = URL.createObjectURL(file);
        blobElement.style.display = 'none';

      }else if(blobType === 'audio') {
        // 오디오
        const audioContext = new window.AudioContext();
        const reader = new FileReader();

        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (event.target) {
            audioContext.decodeAudioData(event.target.result as ArrayBuffer, (buffer) => {
              const durationInSeconds = buffer.duration;
              const durationInMinutes = Math.floor(durationInSeconds / 60);
              const remainingSeconds = Math.floor(durationInSeconds % 60);
              console.log(`음성 길이: ${durationInMinutes}분 ${remainingSeconds}초`);
            });
          }
        };

        reader.readAsArrayBuffer(file);
      }
      console.log('thumbnail : ' + thumbnail);
      return {
          attachId: '',
          attachName: file.name,
          attachSize: blob.size,
          attachType: blobType,
          thumbnail: thumbnail,
          attach: blob
      };
    });

    if(newAttachData && newAttachData.length > 0) {
      console.log('newAttachData : ' + JSON.stringify(newAttachData));

      // 새로운 배열에 넣기
      const updateAttachData = [
        ...attachList,
        ...newAttachData
      ];

      setAttachList(updateAttachData);
    }
  }
  console.log('attachList : ' + JSON.stringify(attachList));

  return(
    <>
      <Headers />
      <div>
        추가로 전달할 파일이 있으신가요?
      </div>
      <div>
        영상, 사진, 음성 메모를 추가해 보세요.
      </div>
      {/* 비디오, 사진 */}
      {/* <AttachButton type='video' onChangeAttachFile={onChangeAttachFile} /> */}
      <AttachCamera onChangeAttachFile={onChangeAttachFile} />
      <AttachList attachList={attachList} attachListType='video' onDeleteAttach={onDeleteAttach}/>{/* 첨부파일 보여지는 곳 */}

      {/* 음성 */}
      <AttachButton type='audio' onChangeAttachFile={onChangeAttachFile} />
      <AttachList attachList={attachList} attachListType='audio' onDeleteAttach={onDeleteAttach}/>{/* 첨부파일 보여지는 곳 */}

      <NextButton path='/message/edit-text' title='다음' item={state}></NextButton>
    </>
  );
}
