import React, { useEffect } from 'react';
import { messageData } from '../../types/attach.type';
import MessageCard from '../../components/MessageCard';
import { useParams } from 'react-router-dom';

export default function MessageEdit() {
  const param = useParams();

  //param.msgId로 데이터베이스 검색 후 cardList에 담기!! == exaple은 msg-1이라 가정
  const cardList: messageData[] = [
    {
      msgId: 'msg-1',
      msgText: '사랑한당',
      createDate: new Date('2024/01/09'),
      modifyDate: new Date('2024/01/09'),
      deleteDate: null,
      attach: [
        {
          msgId: 'msg-1',
          attachId: 'att-1',
          attachName: 'love.jpg',
          attachSize: 20230,
          attachType: 'img',
          attachPath: '../sds'
        },
        {
          msgId: 'msg-1',
          attachId: 'att-2',
          attachName: 'love22.jpg',
          attachSize: 20230,
          attachType: 'img',
          attachPath: '../sds'
        }
      ]
    }
  ]

  useEffect(() => {
    console.log('param : ' + param.msgId);
  }, [])

  // 1. 첨부파일 삭제 및 재 첨부
  // 2. 메시지 수정
  
  const onDeleteAttach = (attachId: string) => {
    console.log('첨부파일 아이디 : ' + attachId);
  }

  return(
    <>
      <div>메시지 수정</div>
      <div>배경 템플릿</div>
      <div>--------------------</div>
      
      <div>첨부파일</div>
      <div>--------------------</div>
      {
        cardList && cardList.length > 0 && cardList.map((item) => {
          return (
            <MessageCard item={item} key={item.msgId} onDeleteAttach={onDeleteAttach}/>
          )
        })
      }
    </>
  );
}
