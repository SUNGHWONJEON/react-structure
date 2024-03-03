
import { receiverData } from '@/types/attach.type';
import React, { useEffect } from 'react';

interface ReceiverProps {
  item: receiverData,
  onDeleteReceiver: (receiverId: string) => void;
}

export default function Receiver(props: ReceiverProps) {
  const { item, onDeleteReceiver } = props;
  
  useEffect(()=> {
    
  },[]);
  
  return(
    <>
      <div>
        <span>{ item.relationship }</span>
        <span>{ item.receiverName }</span>
        <span>{ item.receiverPhone }</span>
        <button onClick={() => onDeleteReceiver(item.receiverId)}>X</button>
      </div>
    </>
  );
}
