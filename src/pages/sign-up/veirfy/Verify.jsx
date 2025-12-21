import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import S from './style';
import Modal from './modal/Modal';

const Verify = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  const handleClickToOpenVerificate = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleVerificationComplete = (result) => {
    console.log('인증 결과:', result);
    setVerificationResult(result);
    // 인증 완료 후 입력한 사용자 정보 저장
    if (result.userName && result.userPhone && result.userBirthday) {
      console.log('사용자 정보:', {
        userName: result.userName,
        userPhone: result.userPhone,
        userBirthday: result.userBirthday
      });
    }
  };

  const handleComplete = () => {
    // 휴대폰 인증 완료 여부 확인
    if (!verificationResult || !verificationResult.verified) {
      if (!openModal) {
        handleClickToOpenVerificate();
        alert("휴대폰 인증을 완료해주세요.");
      } else {
        alert("모달에서 휴대폰 인증을 완료하고 완료하기를 눌러주세요.");
      }
      return;
    }

    // 인증 완료 후 데이터 확인
    if (verificationResult.userName && verificationResult.userPhone && verificationResult.userBirthday) {
      // 본인확인 데이터를 state로 전달하며 다음 단계로 이동
      navigate("/sign-up/terms", {
        state: {
          verificationData: {
            userName: verificationResult.userName,
            userPhone: verificationResult.userPhone,
            userBirthday: verificationResult.userBirthday
          }
        }
      });
    } else {
      alert("이름, 생년월일, 전화번호를 모두 입력해주세요.");
    }
  };

  useEffect(() => {
    console.log('모달 상태:', openModal);
  }, [openModal]);

  useEffect(() => {
    if (verificationResult) {
      console.log('인증 완료 결과:', verificationResult);
      // 인증 결과를 활용하는 로직을 여기에 추가할 수 있습니다
    }
  }, [verificationResult]);

  return (
    <S.LayOut>
      {openModal && (
        <>
          <S.ModalOverlay onClick={handleCloseModal} />
          <Modal 
            onClose={handleCloseModal} 
            onComplete={handleVerificationComplete}
          />
        </>
      )}
      <S.TapWrap>
      <S.TextWrap>
        <S.H3>본인확인</S.H3>
        <S.H5>고객님의 본인확인을 진행해주세요.</S.H5>
        <S.H6>리싸이쿨의 서비스 이용을 위해 본인확인이 필요합니다.</S.H6>
      </S.TextWrap>
      <div>
        <S.Tap onClick={handleClickToOpenVerificate}>
          <img src="/assets/images/social-provider/phone.png" alt="phone" />
          문자 인증하기
        </S.Tap>
      </div>
        
      </S.TapWrap>
      <S.NextStep onClick={handleComplete}>
        완료하기
      </S.NextStep>
    </S.LayOut>
  );
};

export default Verify;