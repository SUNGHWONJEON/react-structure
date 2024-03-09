import { messageData } from '@/types/attach.type';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
  title: string;
  path: string;
  item: unknown;
}

export default function NextButton(props: ButtonProps) {
  const navigate = useNavigate();
  const { title, path, item } = props;

  const onGotoPage = (path: string) => {
    navigate(path, { state: item });
  }
  return(
    <>
      <button onClick={() => onGotoPage(path)}>{title}</button>
    </>
  );
}