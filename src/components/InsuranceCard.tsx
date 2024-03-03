
import React, { useEffect } from 'react';
import { insuranceData } from '@/types/attach.type';

interface InsuranceCardProps {
  item: insuranceData;
  onGotoMessageWrite: (msgId: string) => void;
}

export default function InsuranceCard(props: InsuranceCardProps) {
  const { item, onGotoMessageWrite } = props;
  
  return(
    <>
      <button onClick={() => onGotoMessageWrite(item.msgId) }>
        <div>v</div>
        <div>
          <div>{ item.insuranceName }</div>
          <div>증권번호 <b>{ item.insuranceNumber }</b></div>
        </div>
      </button>
    </>
  );
}
