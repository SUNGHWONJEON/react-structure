import React from "react";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";
import axios from "axios";

interface LoginFormInputs {
  name: string;
  phoneNumber: string;
  idFront: string;
  idBack: string;
  password: string;
}

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

export default function LoginFormHook() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post("/api/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        throw new Error("로그인에 실패했습니다.");
      }

      // 로그인 성공 시 처리
    } catch (error) {
      console.error(error);
      // 에러 처리
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputStyled
        {...register("name", { required: true })}
        placeholder="이름"
      />
      {errors.name && <ErrorMessage>이름을 입력하세요.</ErrorMessage>}
      <InputStyled
        {...register("phoneNumber", {
          required: true,
          pattern: /^010[0-9]{8}$/,
        })}
        placeholder="핸드폰 번호"
      />
      {errors.phoneNumber && (
        <ErrorMessage>핸드폰 번호를 숫자로 입력하세요.</ErrorMessage>
      )}
      <InputStyled
        {...register("idFront", { required: true })}
        placeholder="주민등록번호 앞자리"
      />
      {errors.idFront && (
        <ErrorMessage>주민등록번호 앞자리를 입력하세요.</ErrorMessage>
      )}
      <InputStyled
        {...register("idBack", { required: true })}
        placeholder="주민등록번호 뒷자리"
      />
      {errors.idBack && (
        <ErrorMessage>주민등록번호 뒷자리를 입력하세요.</ErrorMessage>
      )}
      <InputStyled
        type="password"
        {...register("password", { required: true })}
        placeholder="비밀번호"
      />
      {errors.password && <ErrorMessage>비밀번호를 입력하세요.</ErrorMessage>}
      <button type="submit">로그인</button>
    </form>
  );
}
