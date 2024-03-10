import { userData } from '@/types/attach.type';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function IntroCustomer() {
  const navigate = useNavigate();
  
  //유저데이터는 맨처음에
  const user: userData = {
    userId: 'user-1',
    userName: '홍길동',
    userPhone: '0102222222',
    userEmail: 'donki@naver.com',
    createDate: new Date('2024/01/09'),
    modifyDate: new Date('2024/02/09'),
    deleteDate: null
  }

  const onClick = () => {
    navigate('/message');
  }
  
  return(
    <>
      <button onClick={onClick}>드가자</button>
    </>
  );
}
