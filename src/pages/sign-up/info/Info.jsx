import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import S from './style';

const Info = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const verificationData = location.state?.verificationData || null;
  
  // 본인확인 데이터 - verificationData에서 직접 가져오기
  const userName = verificationData?.userName || '';
  const userBirthday = verificationData?.userBirthday || '';
  const userPhone = verificationData?.userPhone || '';

  useEffect(() => {
    console.log('받은 본인확인 데이터:', verificationData);
    if (!verificationData) {
      alert("본인확인을 먼저 완료해주세요.");
      // 필요시 리다이렉트
    }
  }, [verificationData]);
  
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({
    hasAlphabet: false,
    hasNumber: false,
    hasSpecialChar: false,
    minLength: false,
  });
  const [email, setEmail] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailCheckMessage, setEmailCheckMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [verifyCode, setVerifyCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verifyCodeCount, setVerifyCodeCount] = useState(0);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // 이메일 유효성 검사
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateEmail = (emailValue) => {
    if (!emailValue.trim()) {
      setEmailError("이메일을 입력해주세요.");
      return false;
    }
    if (!emailRegex.test(emailValue)) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
      return false;
    }
    setEmailError("");
    return true;
  };

  // 3분 타이머
  const initialTime = 3 * 60 * 1000; // 3분
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  // 타이머 포맷팅 (mm:ss)
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  const handleComplete = async () => {
    // 필수 데이터 검증
    if (!userName || !userBirthday || !userPhone) {
      alert("본인확인 정보가 없습니다. 이전 단계로 돌아가주세요.");
      return;
    }

    if (!email || !emailVerified) {
      alert("이메일을 입력하고 중복확인을 완료해주세요.");
      return;
    }

    if (!isVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }

    if (!password || !isPasswordValid()) {
      alert("비밀번호를 올바르게 입력해주세요.");
      return;
    }

    if (!isPasswordMatch()) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // User 데이터 구성
    // userBirthday를 Java Date 타입에 맞는 형식으로 변환
    // Java의 Date는 "yyyy-MM-dd" 형식의 문자열을 받을 수 있음
    let formattedBirthday = null;
    if (userBirthday) {
      try {
        // 문자열인 경우 (YYYY-MM-DD 형식) - 그대로 사용
        if (typeof userBirthday === 'string') {
          // YYYY-MM-DD 형식 검증
          const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
          if (dateRegex.test(userBirthday)) {
            formattedBirthday = userBirthday;
          } else {
            throw new Error('날짜 형식이 올바르지 않습니다. YYYY-MM-DD 형식이어야 합니다.');
          }
        }
        // Date 객체인 경우
        else if (userBirthday instanceof Date) {
          const year = userBirthday.getFullYear();
          const month = String(userBirthday.getMonth() + 1).padStart(2, '0');
          const day = String(userBirthday.getDate()).padStart(2, '0');
          formattedBirthday = `${year}-${month}-${day}`;
        } else {
          throw new Error('유효하지 않은 날짜 형식');
        }
      } catch (error) {
        console.error('날짜 변환 오류:', error);
        alert("생년월일 형식이 올바르지 않습니다.");
        return;
      }
    }

    // 모든 필수 필드가 있는지 확인
    if (!formattedBirthday) {
      alert("생년월일 정보가 없습니다.");
      return;
    }

    // 모든 필수 필드 검증
    if (!userName || !email || !password || !userPhone || !formattedBirthday) {
      alert("모든 필수 정보를 입력해주세요.");
      return;
    }

    const userData = {
      userName: userName,
      userEmail: email,
      userPassword: password,
      userPhone: userPhone,
      userBirthday: formattedBirthday, // YYYY-MM-DD 형식의 문자열
    };

    console.log('전송할 User 데이터:', userData);
    console.log('userBirthday 값:', formattedBirthday, '타입:', typeof formattedBirthday);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(userData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "회원가입 중 에러가 발생했습니다.");
        return;
      }

      // 성공 시 complete 페이지로 이동하며 User 데이터 전달
      navigate("/sign-up/complete", {
        state: {
          userData: userData,
        }
      });
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  }
  // 타이머 useEffect
  useEffect(() => {
    let intervalId;
    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1000);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      alert("인증 시간이 만료되었습니다. 다시 인증요청을 눌러주세요.");
      setTimeLeft(initialTime);
      setIsCodeSent(false);
      setVerifyCode(false);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft, initialTime]);

  const handleCheckExistEmail = async () => {
    // 이메일 유효성 검사
    if (!validateEmail(email)) {
      return;
    }

    // 이메일 중복 확인 API 호출 (API 엔드포인트 확인 필요)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/exists/cehck-email?email=${email}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const result = await response.json();
      
      if (!response.ok) {
        // 이미 사용 중인 이메일
        setEmailCheckMessage("이미 사용 중인 이메일입니다.");
        setEmailVerified(false);
      } 
      if(response.ok){
        // 사용 가능한 이메일
        setEmailCheckMessage("사용 가능한 이메일입니다.");
        setEmailVerified(true);
      }
    } catch (error) {
      console.error("이메일 확인 오류:", error);
      setEmailCheckMessage("이메일 확인 중 오류가 발생했습니다.");
      setEmailVerified(false);
    }
  }

  const handleGetVerifyEmailCode = async () => {
    // 이메일 유효성 검사
    if (!validateEmail(email)) {
      return;
    }

    if (!emailVerified) {
      alert("이메일 중복확인을 먼저 진행해주세요.");
      return;
    }

    if (verifyCodeCount >= 3) {
      alert("인증 회수 3회를 초과하였습니다. 조금 있다 다시 시도해주세요.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/codes/email?toEmail=${email}`,
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

      alert("입력하신 이메일로 인증코드가 발송되었습니다.");
      setVerifyCodeCount(verifyCodeCount + 1);
      setIsCodeSent(true);
      setVerifyCode(true);
      setIsRunning(true);
      setTimeLeft(initialTime);
    } catch (error) {
      console.error("인증코드 전송 오류:", error);
      alert("인증코드 전송 중 오류가 발생했습니다.");
    }
  }

  const handleConfirmCode = async () => {
    if (!verificationCode.trim()) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/codes/verify?userAuthentificationCode=${verificationCode}`,
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
        alert("인증 확인되었습니다.");
        setIsVerified(true);
      } else {
        alert("인증번호가 다릅니다.");
        setVerificationCode("");
      }
    } catch (error) {
      console.error("인증 확인 오류:", error);
      alert("인증 확인 중 오류가 발생했습니다.");
    }
  }

  const validatePassword = (value) => {
    const errors = {
      hasAlphabet: !/[a-zA-Z]/.test(value),
      hasNumber: !/[0-9]/.test(value),
      hasSpecialChar: !/[!@#$%^&*]/.test(value),
      minLength: value.length < 8,
    };
    setPasswordErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length > 0) {
      validatePassword(value);
    } else {
      setPasswordErrors({
        hasAlphabet: false,
        hasNumber: false,
        hasSpecialChar: false,
        minLength: false,
      });
    }
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const isPasswordValid = () => {
    return !Object.values(passwordErrors).some(error => error) && password.length >= 8;
  };

  const isPasswordMatch = () => {
    return password === passwordConfirm && passwordConfirm.length > 0;
  };

  return (
    <S.LayOut>
      <S.TextWrap>
        <S.H3>정보 입력</S.H3>
        <S.H5>서비스 이용에 필요한 정보를 입력해주세요.</S.H5>
        <S.H6>리싸이쿨의 서비스 이용을 위한 회원님의 정보가 필요합니다.</S.H6>
      </S.TextWrap>
      {/* class 1 이랑 같은 뎁스에 있는 박스들 이름, 생년월일 ... p 태그들 h6Bold 사용 */}
      {/* input placeholder 혹은 이미 입력받은 값은 div 태그들은 인풋이랑 같은 디자인의 border + borderradius h7Medium color #999999 */}
      <S.FieldWrap>
        <S.FieldLabel>이름</S.FieldLabel>
        <S.FieldValue>
          {userName || ''}
        </S.FieldValue>
      </S.FieldWrap>
      <S.FieldWrap>
        <S.FieldLabel>생년월일</S.FieldLabel>
        <S.FieldValue>
          {userBirthday || ''}
        </S.FieldValue>
      </S.FieldWrap>
      <S.FieldWrap>
        <S.FieldLabel>전화번호</S.FieldLabel>
        <S.FieldValue>
          {userPhone || ''}
        </S.FieldValue>
      </S.FieldWrap>
        <S.EmailInputWrap>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <S.Label>이메일</S.Label>
            <S.VerifyButton onClick={handleCheckExistEmail}>이메일 중복확인</S.VerifyButton>
          </div>
          <S.Input 
            placeholder='이메일'
            value={email}
            onChange={(e) => {
              const value = e.target.value;
              setEmail(value);
              setEmailCheckMessage(''); // 입력 시 메시지 초기화
              setEmailError(''); // 입력 시 에러 초기화
              setEmailVerified(false); // 입력 시 인증 상태 초기화
            }}
            disabled={isVerified}
          />
          {emailError && (
            <S.EmailErrorText>{emailError}</S.EmailErrorText>
          )}
          {emailCheckMessage && !emailError && (
            <S.EmailCheckMessage $isAvailable={emailVerified}>
              {emailCheckMessage}
            </S.EmailCheckMessage>
          )}
        </S.EmailInputWrap>
        <S.EmailInputWrap>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <S.Label>이메일 인증</S.Label>
            {!isCodeSent ? 
              <S.VerifyButton 
                onClick={handleGetVerifyEmailCode}
                disabled={!emailVerified || verifyCodeCount >= 3}
              >
                이메일 인증요청
              </S.VerifyButton> : 
              <S.VerifyButton 
                onClick={handleConfirmCode}
                disabled={isVerified}
              >
                인증 확인하기
              </S.VerifyButton>
            }
          </div>
          {isCodeSent && (
            <>
              <S.Input 
                placeholder='인증번호를 입력해주세요.'
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                disabled={isVerified}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>남은 시간</span>
                  {isRunning && timeLeft > 0 && (
                    <S.TimerText>{formatTime(timeLeft)}</S.TimerText>
                  )}
                </div>
                <div 
                  style={{ cursor: 'pointer' }}
                  onClick={handleGetVerifyEmailCode}
                >
                  인증 재요청
                </div>
              </div>
            </>
          )}
        </S.EmailInputWrap>
          <S.InputWrap>
            <S.Label>비밀번호</S.Label>
            <S.Input 
              placeholder='비밀번호를 입력해주세요.' 
              type='password'
              value={password}
              onChange={handlePasswordChange}
            />
            {password.length > 0 && (
              <S.ErrorWrap>
                {passwordErrors.hasAlphabet && (
                  <S.ErrorText>알파벳을 포함해야 합니다.</S.ErrorText>
                )}
                {passwordErrors.hasNumber && (
                  <S.ErrorText>숫자를 포함해야 합니다.</S.ErrorText>
                )}
                {passwordErrors.hasSpecialChar && (
                  <S.ErrorText>특수문자를 포함해야 합니다. (!@#$%^&* )</S.ErrorText>
                )}
                {passwordErrors.minLength && (
                  <S.ErrorText>비밀번호가 너무 짧습니다. 비밀번호는 8글자 이상이어야 합니다.</S.ErrorText>
                )}
                {!isPasswordValid() && password.length > 0 && (
                  <S.ErrorText>비밀번호의 형식의 오류가 있습니다.</S.ErrorText>
                )}
              </S.ErrorWrap>
            )}
          </S.InputWrap>
          <S.InputWrap>
            <S.Label>비밀번호 확인</S.Label>
            <S.Input 
              placeholder='입력한 비밀번호를 재입력해주세요.' 
              type='password'
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
            />
            {passwordConfirm.length > 0 && !isPasswordMatch() && (
              <S.ErrorText>비밀번호가 일치하지 않습니다.</S.ErrorText>
            )}
          </S.InputWrap>
      <S.NextStep onClick={handleComplete}>다음으로</S.NextStep>
    </S.LayOut>
  );
};

export default Info;