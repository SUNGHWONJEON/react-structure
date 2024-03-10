import NextButton from '../../components/NextButton';
import Headers from '../../components/Headers';
import MessageTextField from '../../components/MessageTextField';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';

export default function MessageEditText() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  
  return(
    <>
      <Headers />
      <MessageTextField />
      <NextButton path='/message/edit-attach' title='다음' item={state}></NextButton>
    </>
  );
}
