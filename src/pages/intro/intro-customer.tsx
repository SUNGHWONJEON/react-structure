import { userData } from "@/types/attach.type";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import LoginForm from "../../components/LoginForm";

const ContainerWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100vh;
`;

export default function IntroCustomer() {
  const navigate = useNavigate();

  //유저데이터는 맨처음에
  const user: userData = {
    userId: "user-1",
    userName: "홍길동",
    userPhone: "0102222222",
    userEmail: "donki@naver.com",
    createDate: new Date("2024/01/09"),
    modifyDate: new Date("2024/02/09"),
    deleteDate: null,
  };

  const handleGoToMessage = () => {
    navigate("/message");
  };

  return (
    <>
      <ContainerWrapper>
        <LoginForm />
        <button onClick={handleGoToMessage}>메시지 작성</button>
      </ContainerWrapper>
    </>
  );
}
