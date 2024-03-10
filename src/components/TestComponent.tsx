
import React, { ChangeEvent } from 'react';

interface testProps {
  children: React.ReactNode
}

export default function TestComponent(props: testProps) {
  const { children } = props;
  
  return(
    <>
      <div>
        {children}
      </div>
    </>
  );
}
