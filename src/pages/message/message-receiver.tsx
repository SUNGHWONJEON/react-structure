import React, { useEffect, useState } from 'react';
import { receiverData } from '../../types/attach.type';
import Receiver from '../../components/Receiver';
import { useParams } from 'react-router-dom';
import AddReceiver from '../../components/AddReceiver';
import NextButton from '../../components/NextButton';

export default function MessageReciever() {
  const { msgId } = useParams<{ msgId: string }>();
  const [receiverList, setReceiverList] = useState<receiverData[]>([
    {
      receiverId: '1213123',
      receiverName: '김똥개',
      relationship: '자녀',
      receiverPhone: '01034569788'
    },
    {
      receiverId: '2323232',
      receiverName: '김변견',
      relationship: '자녀',
      receiverPhone: '01055555555'
    }
  ])
  //param.msgId로 데이터베이스 검색 후 receiverList에 담기!! == exaple은 msg-1이라 가정
  
  
  useEffect(()=> {
    console.log('param : ' + msgId);
  },[]);

  const onAddReceiver = (list: receiverData) => {
    setReceiverList([...receiverList, list]);
    console.log('수신자 추가 : ' + JSON.stringify(receiverList));
  }

  const onDeleteReceiver = (receiverId: string) => {
    console.log('수신자 아이디 : ' + receiverId);
    const updateList = receiverList.filter(item => item.receiverId != receiverId);
    setReceiverList(updateList);
  }
  
  /*
  const updateList = message.msgList.filter(item => item.msgId !== id);
  const updateMessage = {
    ...message,
    msgList: updateList
  }
  const index = messageOrigin.msgList.findIndex(el => String(el.msgId) === String(tempNewData.msgId));
  newSaveData = {
                ...messageOrigin,
                msgList: [
                    tempNewData,
                    ...messageOrigin.msgList
                ]
            }
  //input값이 바뀔때마다 value값 저장
    const onChanged = (val) => {
        console.log('val : ' + val);
        setInputValue((prevValues) => ({
            ...prevValues,
            [val.name]: val.value
        }))
    }
  */
  
  return(
    <>
      <div>
        수신자 등록
      </div>
      <AddReceiver onAddReceiver={onAddReceiver}/>
      <div>
        {
          receiverList && receiverList.length > 0 && receiverList.map((item) => {
            return (
              <Receiver item={item} key={item.receiverId} onDeleteReceiver={onDeleteReceiver}/>
            )
          })
        }
      </div>
      <NextButton path={'/message/edit/' + msgId} title={'다음'}/>
    </>
  );
}
