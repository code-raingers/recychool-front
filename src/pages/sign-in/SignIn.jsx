import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useGetUserData from '../../hooks/useGetUserData';
import S from "./style";

const SignIn = () => {
const navigate = useNavigate();
  const { currentUser, isLogin } = useGetUserData();
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [showEmailSend, setShowEmailSend] = useState(false);
  const [showEmailVerify, setShowEmailVerify] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm({ mode: "onChange" });

  const handleSumbmitForm = handleSubmit(
    async (data) => {
      console.log("폼 제출 시작:", data);
      const { userEmail, userPassword } = data;
      console.log("백엔드 URL:", `${process.env.REACT_APP_BACKEND_URL}/auth/login`);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      
      if (!response.ok) {
        if (result?.data?.code === "DEVICE_NOT_TRUSTED") {
          const goVerify = window.confirm(
            `${result.message}\n\n기기 등록화면으로 이동하시겠습니까?`
          );

          if (goVerify) {
            // state로 넘기기(주소에 안 보이게)
            navigate("/identity/verify", { state: { userId: result.data.userId } });
          }
          return;
        }
        alert(result.message || "로그인에 실패했습니다.");
        return;
      }
      const accessToken = result.data?.accessToken;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        navigate("/");
      } else {
        alert("토큰을 받아오지 못했습니다.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
    },
    (errors) => {
      console.log("폼 유효성 검사 실패:", errors);
    }
  );


  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

  const handleEmailBlur = async (e) => {
    await trigger("email");
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin, navigate]);

  return (
    <S.AllLayOut>
      <div>
        <S.Form onSubmit={handleSumbmitForm}>
          <S.InputWrap>
            <S.Input 
              type="text"
              placeholder="이메일"
              readOnly={showEmailSend || showEmailVerify}
              {...register("userEmail", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value: emailRegex,
                  message: "이메일 형식이 올바르지 않습니다.",
                },
              })}
            />
            <S.Input 
              type={isEyeOpen ? "text" : "password"}
              placeholder="비밀번호를 입력하세요"
              name="userPassword"
              {...register("userPassword", {
                required: "비밀번호를 입력해주세요.",
                pattern: {
                  value: passwordRegex,
                  message: "비밀번호는 8자 이상이며 숫자, 영문자, 특수문자(!@#)를 포함해야 합니다.",
                },
              })}
              />
            {errors.userEmail && <div style={{ color: 'red', fontSize: '12px' }}>{errors.userEmail.message}</div>}
            {errors.userPassword && <div style={{ color: 'red', fontSize: '12px' }}>{errors.userPassword.message}</div>}
            </S.InputWrap>
            <S.Button 
              type="submit" 
              disabled={isSubmitting}
              onClick={() => {
                console.log("로그인 버튼 클릭됨");
                console.log("현재 폼 에러:", errors);
                console.log("isSubmitting:", isSubmitting);
              }}
            >
              <span>{isSubmitting ? "로그인 중..." : "로그인"}</span>
            </S.Button>
        </S.Form>
      </div>
      <S.MiddleWrap>
        <S.Hr />
          <S.MiddleText>
            <span>소셜 계정으로 시작해요</span>
          </S.MiddleText>
        <S.Hr />
      </S.MiddleWrap>
      <S.SocialItemWrap>
        <Link to={`${process.env.REACT_APP_BACKEND_URL}/oauth2/authorization/kakao`}>
          <S.SocialItem>
            <img src="/assets/images/social-provider/kakao.png" alt="kakao" />
            카카오로 시작하기
          </S.SocialItem>
        </Link>
        <Link to={`${process.env.REACT_APP_BACKEND_URL}/oauth2/authorization/google`}>
          <S.SocialItem>
              <img src="/assets/images/social-provider/google.png" alt="google" />
              구글로 시작하기
          </S.SocialItem>
        </Link>
        <Link to={`${process.env.REACT_APP_BACKEND_URL}/oauth2/authorization/naver`}>
          <S.SocialItem>
            <img src="/assets/images/social-provider/naver.png" alt="naver" />
            네이버로 시작하기
          </S.SocialItem>
        </Link>
      </S.SocialItemWrap>
      <S.MiddleWrap>
        <S.Hr />
          <S.MiddleText>
            <span>계정을 찾아봐요</span>
          </S.MiddleText>
        <S.Hr />
      </S.MiddleWrap>
      <S.TextWrap>
        <Link to={"/find-user/email"}>아이디 찾기</Link>
        <Link to={"/find-user/password"}>비밀번호 찾기</Link>
        <Link to={"/sign-up"}>회원 가입</Link>
      </S.TextWrap>
    </S.AllLayOut>
  );
};

export default SignIn;