import React, { useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";

const InputStyled = styled.input`
  display: block;
  padding: 0.2rem 0.5rem;
  font-size: 14px;
  border: 1px solid #c7c7c7;
  margin: 0 auto;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.span`
  color: red;
`;

const isValidName = (value: string) => {
  // 이름은 한글 또는 영어만 허용
  return /^[A-Za-z가-힣]+$/.test(value);
};

const isValidPhoneNumber = (value: string) => {
  // 핸드폰 번호는 숫자 11자리
  // return /^\d{11}$/.test(value);
  return /^\d+$/.test(value);
};

export default function LoginForm() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const handleNameChange = (e: any) => {
    const value = e.target.value;
    setName(value);
    if (!isValidName(value)) {
      setNameError("이름은 한글 또는 영어만 입력하세요.");
    } else {
      setNameError("");
    }
  };

  const handlePhoneNumberChange = (e: any) => {
    const value = e.target.value;
    setPhoneNumber(value);
    if (!isValidPhoneNumber(value)) {
      setPhoneNumberError("핸드폰 번호는 숫자 11자리여야 합니다.");
    } else {
      setPhoneNumberError("");
    }
  };

  const handleSubmit = async () => {
    // 유효성 검사 통과 여부 확인
    if (!isValidName(name) || !isValidPhoneNumber(phoneNumber)) {
      // 에러 처리
      console.error("유효성 검사를 통과하지 못했습니다.");
      return;
    }

    try {
      // 여기서부터 로그인 처리
      const response = await axios.post("/api/login", {
        name,
        phoneNumber,
      });
      console.log("로그인 성공:", response);
    } catch (error) {
      console.error("로그인 실패:", error);
      // 에러 처리
    }
  };

  return (
    <div>
      <div>
        <InputStyled
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="이름"
        />
        {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
      </div>
      <div>
        <InputStyled
          type="text"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="핸드폰 번호"
        />
        {phoneNumberError && <ErrorMessage>{phoneNumberError}</ErrorMessage>}
      </div>
      <button onClick={handleSubmit}>로그인</button>
    </div>
  );
}
