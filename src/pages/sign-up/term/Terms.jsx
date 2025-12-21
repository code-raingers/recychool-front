import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import S from './style';
import Component from './component/Component';

const Terms = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const verificationData = location.state?.verificationData || null;
  
  const [agreementStates, setAgreementStates] = useState({
    agreementA: false,
    agreementB: false,
    agreementC: false,
  });

  const handleAgreementChange = (agreementType, value) => {
    setAgreementStates((prev) => ({
      ...prev,
      [agreementType]: value,
    }));
  };

  const handleNextStep = () => {
    // 필수 약관 확인 (agreementA: 리싸이쿨 기본 이용약관, agreementB: 개인정보 수집 동의)
    if (!agreementStates.agreementA || !agreementStates.agreementB) {
      alert("필수 동의해야 가입가능합니다.");
      return;
    }

    // 필수 약관이 모두 동의되었으면 다음 단계로 이동 (본인확인 데이터 전달)
    navigate("/sign-up/info", { 
      state: { 
        verificationData: verificationData 
      } 
    });
  };

  return (
    <S.LayOut>
      <S.TextWrap>
        <S.H3>약관 동의</S.H3>
        <S.H5>이용 약관을 확인해주세요.</S.H5>
        <S.H6>리싸이쿨의 서비스 이용을 위한 약관 동의가 필요합니다.</S.H6>
      </S.TextWrap>
      <Component 
        agreementStates={agreementStates}
        onAgreementChange={handleAgreementChange}
      />
      <S.NextStep onClick={handleNextStep}>다음으로</S.NextStep>
    </S.LayOut>
  );
};

export default Terms;