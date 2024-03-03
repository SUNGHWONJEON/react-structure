import { receiverData } from '@/types/attach.type';
import React, { useState } from 'react';

interface ReceiverProps {
  onAddReceiver: (list: receiverData) => void;
}

export default function AddReceiver(props: ReceiverProps) {
  const { onAddReceiver } = props;
  const [tempReceiverList, setTempReceiverList] = useState<receiverData>({
    receiverId: String(new Date()),
    receiverName: '',
    relationship: '',
    receiverPhone: ''
  });
  
  const onChangeRelation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('관계 : ' + e.target.value);
    setTempReceiverList({
      ...tempReceiverList,
      relationship: e.target.value
    });
  }

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('이름 : ' + e.target.value);
    setTempReceiverList({
      ...tempReceiverList,
      receiverName: e.target.value
    });
  }

  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('전화번호 : ' + e.target.value);
    setTempReceiverList({
      ...tempReceiverList,
      receiverPhone: e.target.value
    });
  }

  return(
    <>
      <div>
        <div>누구에게 보내고 싶으세요?</div>
        <select onChange={onChangeRelation} value={tempReceiverList?.relationship}>
          <option>자녀</option>
          <option>부인</option>
          <option>친구</option>
        </select>
        <input type='text' placeholder='이름을 입력하세요' onChange={onChangeName} value={tempReceiverList?.receiverName}/>
        <input type='text' placeholder='전화번호를 입력하세요' onChange={onChangePhone} value={tempReceiverList?.receiverPhone}/>
      </div>
      <button onClick={() => onAddReceiver(tempReceiverList)}>수신자 추가</button>
    </>
  );
}