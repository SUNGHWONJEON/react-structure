import React, { useState, useEffect } from 'react';
import { messageData } from '../../types/attach.type';
import MessageCard from '../../components/MessageCard';
import { useParams } from 'react-router-dom';
import { on } from 'process';

export default function MessageEdit() {
  const param = useParams();
  const [msgPage, setMsgPage] = useState<number>(1);
  const [visiblePrevBtn, setVisiblePrevBtn] = useState<boolean>(false);
  const [visibleNextBtn, setVisibleNextBtn] = useState<boolean>(true);

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

    
    if(msgPage === 1) {
      setVisiblePrevBtn(false);
      setVisibleNextBtn(true);
    }else if(msgPage === 3) {
      setVisiblePrevBtn(true);
      setVisibleNextBtn(false);
    }else{
      setVisiblePrevBtn(true);
      setVisibleNextBtn(true);
    }

  }, [msgPage])

  // 1. 첨부파일 삭제 및 재 첨부
  // 2. 메시지 수정
  
  const onDeleteAttach = (attachId: string) => {
    console.log('첨부파일 아이디 : ' + attachId);
  }

  const onPrevHistory = () => {
    history.go(-1);
  }

  const onNavigation = (type: string) => {
    if (type === 'prev') {
      if (msgPage > 1) {
        const page = msgPage - 1
        setMsgPage(page);
      }
    } else {
      if (msgPage < 3) {
        const page = msgPage + 1
        setMsgPage(page);
      }
    }

    console.log('msgPage : ' + msgPage);
  }

  return(
    <>
      <div>메시지 수정</div>
      <button onClick={onPrevHistory}>이전으로</button>
      {
        msgPage === 1 && (
          <>
            <div>배경 템플릿</div>
          </>
        )
      }
      {
        msgPage === 2 && (
          <>
            <div>글쓰기</div>
          </>
        )
      }
      {
        msgPage === 3 && (
          <>
            <div>첨부파일</div>
          </>
        )
      }
      <button onClick={() => onNavigation('prev')}>이전페이지</button>
      <button onClick={() => onNavigation('next')}>다음페이지</button>
      {/* {
        cardList && cardList.length > 0 && cardList.map((item) => {
          return (
            <MessageCard item={item} key={item.msgId} onDeleteAttach={onDeleteAttach}/>
          )
        })
      } */}
    </>
  );
}
