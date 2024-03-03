import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
  title: string;
  path: string;
}

export default function NextButton(props: ButtonProps) {
  const navigate = useNavigate();
  const { title, path } = props;

  const onGotoPage = (path: string) => {
    navigate(path);
  }
  return(
    <>
      <button onClick={() => onGotoPage(path)}>{title}</button>
    </>
  );
}