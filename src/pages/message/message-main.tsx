import { insuranceData } from '@/types/attach.type';
import React, { useEffect } from 'react';
import InsuranceCard from '../../components/InsuranceCard';
import { useNavigate } from 'react-router-dom';

export default function MessageMain() {
  const navigate = useNavigate();
  const insuranceList: insuranceData[] = [
    {
      msgId: 'msg-1',
      insuranceName: '걱정없는 치매보험(무)',
      insuranceNumber: '202734455'
    },
    {
      msgId: 'msg-2',
      insuranceName: '더 좋은 생명보험(무)',
      insuranceNumber: '202323232'
    }
  ]
  
  useEffect(()=> {
  
  },[]);
  
  //증권번호 입력
  const onGotoMessageWrite = (msgId: string) => {
    console.log('증권번호 : ' + msgId);
    //navigate('/message/edit/' + msgId);//메시지 수정 페이지 이동
    navigate('/message/receiver/' + msgId);//메시지 수신자 등록 페이지 이동
  }
  
  return(
    <>
      <div>
        <h3>아름다운 선물을 전해주세요</h3>
        <h5>소중한 가족에게 메시지를 남길수 있습니다.</h5>
      </div>
      <div>
        {
          insuranceList.map((item) => {
            return(
              <InsuranceCard item={item} key={item.insuranceNumber} onGotoMessageWrite={onGotoMessageWrite}/>
            )
          })
        }
      </div>
    </>
  );
}
