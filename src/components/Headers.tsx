
import React from 'react';

export default function Headers() {

  const onHistoryGo = () => {
    history.go(-1);
  }

  return(
    <>
      <button onClick={onHistoryGo}>이전</button>
    </>
  );
}
