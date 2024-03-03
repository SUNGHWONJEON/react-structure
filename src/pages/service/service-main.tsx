import React from 'react';
import ServiceButton from '../../components/ServiceButton';
import { useNavigate } from 'react-router-dom';

interface ButtonData {
  title: string;
  id: string;
  path: string;
}

export default function ServiceMain() {
  const navigate = useNavigate();
  const buttonList: ButtonData[] = [
    {
      title: '공지사항',
      id: 'service-1',
      path: '/service/notice'
    },
    {
      title: '자주 묻는 질문',
      id: 'service-2',
      path: '/service/faq'
    },
    {
      title: '서비스 이용약관',
      id: 'service-3',
      path: '/service/terms'
    },
    {
      title: '개인정보 처리방침',
      id: 'service-4',
      path: '/service/info'
    },
  ]

  return(
    <>
      <div>아름다운 선물 고객센터</div>
      <div>
        {
          buttonList.map((item) => {
            return(
              <ServiceButton title={item.title} path={item.path} key={item.id} />
            )
          })
        }
      </div>
    </>
  );
}