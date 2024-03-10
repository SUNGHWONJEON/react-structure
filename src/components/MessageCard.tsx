
import React, { useEffect } from 'react';
import { messageData } from '@/types/attach.type';

interface MessageCardProps {
  item: messageData;
  onDeleteAttach: (attathId: string) => void;
}

//export default function MessageCard(props: { item: messageData }) {
export default function MessageCard(props: MessageCardProps) {

  //const { item } = props;
  const { item, onDeleteAttach } = props;

  const formattedDate = (date: Date) => {
    return date.toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  }
  
  return(
    <>
      <div>
        메시지 리스트
      </div>
      <div>
        <div>
          글 : <b>{ item.msgText }</b>
        </div>
      </div>
      <div>
        {
          item && item.attach && item.attach.length > 0 && 
          item.attach.map((att) => {
            console.log('att.attachId : ' + att.attachId);
            return(
              <div key={att.attachId}>
                <div>
                  첨부파일 이름
                  {
                    att.attachName
                  }
                </div>
                <button onClick={() => onDeleteAttach(att.attachId)}>x</button>
              </div>
            )
          })
        }
        <div>
          날짜 : <b>{ formattedDate(item.createDate) }</b>
        </div>
      </div>
    </>
  );
}
