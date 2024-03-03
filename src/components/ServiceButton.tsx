import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
  title: string;
  path: string;
}

export default function ServiceButton(props: ButtonProps) {
  const navigate = useNavigate();
  const { title, path } = props;

  const onGotoServicePage = (path: string) => {
    console.log('path : ' + path);
    navigate(path);
  }

  return(
    <>
      <button onClick={() => onGotoServicePage(path)}>{title}</button>
    </>
  );
}