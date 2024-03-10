import React from 'react';
import { useNavigate } from 'react-router-dom';

interface thumbnailsProps {
  item: any;
}

export default function Thumbnails(props: thumbnailsProps) {
  const navigate = useNavigate();
  const { item } = props;
  console.log('item.name : ' + item.attachName );
  console.log('item : ' + JSON.stringify(item));
  const onGotoServicePage = (path: string) => {
    console.log('path : ' + path);
    navigate(path);
  }

  return(
    <>
      <div>첨부파일 이름 {item.attachName}</div>
      <div>
        <img src={item.thumbnail} />
      </div>
      {
        item.duration && item.duration > 0 && 
        <>
          <span>{item.duration}</span>
        </>
      }
    </>
  );
}