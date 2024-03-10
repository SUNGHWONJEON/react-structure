
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import Headers from '../../components/Headers';
import SwiperCard from '../../components/SwiperCard';
import NextButton from '../../components/NextButton';

export default function MessageEditBg() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const swiperList = [
    '/img/swiper_1.png',
    '/img/swiper_2.png',
    '/img/swiper_2.png',
    '/img/swiper_2.png',
    '/img/swiper_2.png',
  ]

  console.log('state: ' + JSON.stringify(state));

  const onSelectMessageBg = (bgId: number) => {
    console.log('bgId : ' + bgId);
  }
  return(
    <>
      <Headers />
      <SwiperCard swiperList={swiperList} onSelectMessageBg={onSelectMessageBg} />
      <NextButton path='/message/edit-text' title='다음' item={state}></NextButton>
    </>
  );
}
