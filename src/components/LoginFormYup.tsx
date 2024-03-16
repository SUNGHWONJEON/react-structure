import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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

const schema = yup.object().shape({
  name: yup.string().required("이름을 입력하세요."),
  phoneNumber: yup
    .string()
    .matches(/^010[0-9]{8}$/, "010으로 시작하는 11자리의 숫자를 입력하세요.")
    .required("핸드폰 번호를 입력하세요."),
  idFront: yup.string().required("주민등록번호 앞자리를 입력하세요."),
  idBack: yup.string().required("주민등록번호 뒷자리를 입력하세요."),
  password: yup.string().required("비밀번호를 입력하세요."),
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

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
      <InputStyled {...register("name")} placeholder="이름" />
      {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      <InputStyled
        {...register("phoneNumber", { required: true })}
        placeholder="핸드폰 번호"
      />
      {errors.phoneNumber && (
        <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>
      )}
      <InputStyled {...register("idFront")} placeholder="주민등록번호 앞자리" />
      {errors.idFront && <ErrorMessage>{errors.idFront.message}</ErrorMessage>}
      <InputStyled {...register("idBack")} placeholder="주민등록번호 뒷자리" />
      {errors.idBack && <ErrorMessage>{errors.idBack.message}</ErrorMessage>}
      <InputStyled
        type="password"
        {...register("password")}
        placeholder="비밀번호"
      />
      {errors.password && (
        <ErrorMessage>{errors.password.message}</ErrorMessage>
      )}
      <button type="submit">로그인</button>
    </form>
  );
}
