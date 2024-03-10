
import React, { ChangeEvent } from 'react';

interface attachButtonProps {
  type: string
  onChangeAttachFile: (files: any) => void;
}

export default function AttachButton(props: attachButtonProps) {
  const { type, onChangeAttachFile } = props;
  
  return(
    <>
      <input accept="image/* video/*" onChange={(e) => onChangeAttachFile(Array.from(e.target.files || []))} type="file" />
    </>
  );
}
