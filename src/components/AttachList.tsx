
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/css';
import './swiperAttachStyle.css';
import { Pagination } from 'swiper/modules';
import Thumbnails from './Tumbnails';

interface attachProps {
  attachListType: string,
  attachList: any[],
  onDeleteAttach: (attachId: string) => void;
}

export default function AttachList(props: attachProps) {
  const { attachListType, attachList, onDeleteAttach } = props;
  const [myAttachList, setMyAttachList] = useState<any>([]);

  useEffect(() => {
    if (attachListType === 'audio') {
      setMyAttachList(attachList.filter(f => f.attachType === 'audio'));
    } else {
      setMyAttachList(attachList.filter(f => f.attachType === 'video' || f.attachType === 'image'));
    }
  }, [attachList])
  console.log('attachListType : ' + attachListType + '  myAttachList : ' + JSON.stringify(myAttachList));
  return(
    <>
      {/* 비디오, 이미지 */}
      {
        attachListType !== 'audio' && 
        myAttachList && myAttachList.length > 0 &&
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={30}
          modules={[Pagination]}
          className="mySwiper"
        >
          {
            myAttachList.map((item: any, key: number) => {
              return(
                <>
                  <SwiperSlide key={key}>
                    <button onClick={() => onDeleteAttach(item.attachId)}>삭제</button>
                    <Thumbnails item={item} />
                  </SwiperSlide>
                </>
              );
            })
          }
        </Swiper>
      }
      {/* 오디오 */}
      {
        attachListType === 'audio' && 
        myAttachList && myAttachList.length > 0 &&
        myAttachList.map((item: any, key: number) => {
          return(
            <>
              <div key={key}>
                <audio controls src={item.attachPath} />
                <button onClick={() => onDeleteAttach(item.attachId)}>삭제</button>
              </div>
            </>
          );
        })
      }
    </>
  );
}
