import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import S from './style';

const Complete = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.userData || null;

  const handleMoveToLogin = () => {
    navigate("/sign-in");
  };
  const handleMoveToMain = () => {
    navigate("/");
  };

  return (
    <S.LayOut>
      <S.TextWrap>
        <S.H3>가입 완료</S.H3>
        <S.H5>회원가입이 완료 되었습니다.</S.H5>
        <S.H6>가입한 이메일 계정 : {userData?.userEmail || ''}</S.H6>
      </S.TextWrap>
      <S.ButtonWrap>
        <S.ButtonLogin onClick={handleMoveToLogin}>로그인 페이지로 이동하기</S.ButtonLogin>
        <S.ButtonMain onClick={handleMoveToMain}>메인으로 이동하기</S.ButtonMain>
      </S.ButtonWrap>
    </S.LayOut>
  );
};

export default Complete;