import React, { useEffect, useState } from 'react';
import S from './style';
import { useNavigate } from 'react-router-dom';

const Modal = ({ onClose, onComplete }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userBirthday, setUserBirthday] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errors, setErrors] = useState({});
  
  const initialTime = 3 * 60 * 1000; // 3분
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  // 유효성 검사 함수
  const validateForm = () => {
    const newErrors = {};
    
    if (!userName.trim()) {
      newErrors.userName = "이름을 입력해주세요.";
    }
    
    if (!userPhone.trim()) {
      newErrors.userPhone = "전화번호를 입력해주세요.";
    } else if (!/^[0-9]{11}$/.test(userPhone)) {
      newErrors.userPhone = "전화번호는 하이픈 없이 11자리 숫자로 입력해주세요.";
    }
    
    if (!userBirthday) {
      newErrors.userBirthday = "생년월일을 선택해주세요.";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 타이머 포맷팅 (mm:ss)
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // 타이머 useEffect
  useEffect(() => {
    let intervalId;
    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1000);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      alert("인증 시간이 만료되었습니다. 다시 인증받기를 눌러주세요.");
      setTimeLeft(initialTime);
      setIsCodeSent(false);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft, initialTime]);

  const handleCancel = () => {
    onClose();
  };

  const handleWriteUserName = (e) => {
    setUserName(e.target.value);
    if (errors.userName) {
      setErrors({ ...errors, userName: "" });
    }
  };

  const handleWriteUserPhone = (e) => {
    // 하이픈 제거하고 숫자만 허용
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 11) {
      setUserPhone(value);
      if (errors.userPhone) {
        setErrors({ ...errors, userPhone: "" });
      }
    }
  };

  const handleWriteUserBirthday = (e) => {
    setUserBirthday(e.target.value);
    if (errors.userBirthday) {
      setErrors({ ...errors, userBirthday: "" });
    }
  };

  const handleWriteVerificationCode = (e) => {
    // 영문 대소문자와 숫자만 허용
    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
    if (value.length <= 8) {
      setVerificationCode(value);
    }
  };

  // 인증받기 버튼 클릭
  const handleToGetVerifyCode = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/codes/sms?phoneNumber=${userPhone}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "인증코드 전송에 실패했습니다.");
        return;
      }

      setIsCodeSent(true);
      setIsRunning(true);
      setTimeLeft(initialTime);
      alert("인증코드가 전송되었습니다.");
    } catch (error) {
      console.error("인증코드 전송 오류:", error);
      alert("인증코드 전송 중 오류가 발생했습니다.");
    }
  };

  // 인증 확인 버튼 클릭
  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.trim().length !== 8) {
      alert("인증번호 8자리를 입력해주세요.");
      return;
    }
    
    const codeToVerify = verificationCode;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/codes/verify?userAuthentificationCode=${codeToVerify}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "인증 확인에 실패했습니다.");
        return;
      }

      if (result.data?.verified) {
        setIsVerified(true);
        setIsRunning(false);
        alert("인증이 완료되었습니다.");
      } else {
        alert("인증번호가 일치하지 않습니다.");
        setVerificationCode(""); // 인증 실패 시 입력 초기화
      }
    } catch (error) {
      console.error("인증 확인 오류:", error);
      alert("인증 확인 중 오류가 발생했습니다.");
    }
  };

  // 완료하기 버튼 클릭
  const handleComplete = () => {
    // 유효성 검사
    if (!validateForm()) {
      return;
    }

    // 휴대폰 인증 완료 여부 확인
    if (!isVerified) {
      alert("휴대폰 인증을 완료해주세요.");
      return;
    }

    const verificationResult = {
      userName,
      userPhone,
      userBirthday,
      verified: isVerified,
      timestamp: new Date().toISOString(),
    };
    onComplete(verificationResult);
    onClose();
  };

  return (
    <S.ModalLayOut>
      <S.ModalContent>
        <S.InputLayout>
          <S.InputWrap>
            <p>이름</p>
            <S.Input 
              type='text'
              placeholder='이름'
              value={userName}
              onChange={handleWriteUserName}
            />
            {errors.userName && <S.ErrorText>{errors.userName}</S.ErrorText>}
          </S.InputWrap>
          
          <S.InputWrap>
            <p>생년월일</p>
            <S.Input 
              type='date' 
              placeholder='생년월일'
              value={userBirthday}
              onChange={handleWriteUserBirthday}
            />
            {errors.userBirthday && <S.ErrorText>{errors.userBirthday}</S.ErrorText>}
          </S.InputWrap>
          
          <S.InputWrap>   
            <S.PhoneLabelWrap>
              <div>전화번호</div>
              {isCodeSent && isRunning && (
                <S.TimerText>{formatTime(timeLeft)}</S.TimerText>
              )}
            </S.PhoneLabelWrap>
            <S.Input 
              placeholder='01012341234'
              value={userPhone}
              onChange={handleWriteUserPhone}
              maxLength={11}
            />
            {errors.userPhone && <S.ErrorText>{errors.userPhone}</S.ErrorText>}
            <S.VerifyButton 
              onClick={handleToGetVerifyCode}
              disabled={!userName || !userPhone || !userBirthday || (isCodeSent && isRunning)}
            >
              {isCodeSent ? "인증 확인" : "인증받기"}
            </S.VerifyButton>
          </S.InputWrap>
          
          {isCodeSent && (
            <S.InputWrap>   
              <div>인증확인란</div>
              <S.Input 
                type='text'
                placeholder='인증번호 8자리를 입력해주세요. (영문, 숫자)'
                value={verificationCode}
                onChange={handleWriteVerificationCode}
                maxLength={8}
              />
              <S.VerifyButton 
                onClick={() => handleVerifyCode()}
                disabled={verificationCode.length !== 8 || isVerified}
              >
                인증하기
              </S.VerifyButton>
              {isVerified && <S.SuccessText>인증이 완료되었습니다.</S.SuccessText>}
            </S.InputWrap>
          )}
        </S.InputLayout>
      </S.ModalContent>
      <S.ButtonWrap>
        <S.CancelButton onClick={handleCancel}>
          취소하기
        </S.CancelButton>
        <S.CompleteButton 
          onClick={handleComplete}
        >
          완료하기
        </S.CompleteButton>
      </S.ButtonWrap>
    </S.ModalLayOut>
  );
};

export default Modal;