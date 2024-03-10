import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import './swiperCardStyle.css';
import { EffectCards } from 'swiper/modules';

interface cardProps {
  swiperList: string[],
  onSelectMessageBg: (bgId: number) => void;
}

export default function SwiperCard(props: cardProps) {
  const { swiperList, onSelectMessageBg } = props;
  
  return (
    <>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {
          swiperList.map((item, key) => {
            return(
              <>
                <SwiperSlide key={key}>
                  <button onClick={() => onSelectMessageBg(key)}>
                    <img src={item}></img>
                  </button>
                </SwiperSlide>
              </>
            )
          })
        }
        
      </Swiper>
    </>
  );
}
