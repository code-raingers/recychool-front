import React, { useState } from 'react';
import S from './style';

const Component = ({ agreementStates, onAgreementChange }) => {
  const [agreementAOpen, setAgreementAOpen] = useState(false);
  const [agreementBOpen, setAgreementBOpen] = useState(false);
  const [agreementCOpen, setAgreementCOpen] = useState(false);

  const agreementA = agreementStates?.agreementA || false;
  const agreementB = agreementStates?.agreementB || false;
  const agreementC = agreementStates?.agreementC || false;

  const handleTermsAOnClick = () => {
    setAgreementAOpen((prev) => !prev);
  }
  
  const handleAgreementAClick = () => {
    const newValue = !agreementA;
    onAgreementChange('agreementA', newValue);
  }
  
  const handleTermsBOnClick = () => {
    setAgreementBOpen((prev) => !prev);
  }
  
  const handleAgreementBClick = () => {
    const newValue = !agreementB;
    onAgreementChange('agreementB', newValue);
  }
  
  const handleTermsCOnClick = () => {
    setAgreementCOpen((prev) => !prev);
  }
  
  const handleAgreementCClick = () => {
    const newValue = !agreementC;
    onAgreementChange('agreementC', newValue);
  }



  return (
    <S.LayOut>
      <S.TitleWrap>
        <S.OnlyRowFlex>
          <S.H5Bold>
            [필수]
          </S.H5Bold>
          <S.H5Medium>
            리싸이쿨 기본 이용약관
          </S.H5Medium>
        </S.OnlyRowFlex>
        <S.TitleCategory>
          <S.H5Bold onClick={handleTermsAOnClick} style={{ cursor: 'pointer' }}>
            {!agreementAOpen ? "보기" : "닫기"}
          </S.H5Bold>
          <S.AgreementWrap onClick={handleAgreementAClick}>
            {agreementA ? (
              <>
                <img src='/assets/images/sign-in/agree.png' alt='agree' />
                <S.AgreementText>동의</S.AgreementText>
              </>
            ) : (
              <>
                <img src='/assets/images/sign-in/disagree.png' alt='disagree' />
                <S.DisAgreementText>미동의</S.DisAgreementText>
              </>
            )}
          </S.AgreementWrap>
        </S.TitleCategory>
      </S.TitleWrap>
      
      {agreementAOpen && (
        <S.TermsContent>
          <S.TermsSection>
            <S.SectionTitle>1. 회원가입</S.SectionTitle>
            <S.TermsList>
              <S.TermsItem>회원은 본인 정보로 가입해야 하며, 계정·비밀번호 관리는 회원 책임입니다.</S.TermsItem>
              <S.TermsItem>계정 양도, 대여 등은 금지됩니다.</S.TermsItem>
            </S.TermsList>
          </S.TermsSection>

          <S.TermsSection>
            <S.SectionTitle>2. 서비스 내용</S.SectionTitle>
            <S.TermsList>
              <S.TermsItem>폐교 공간 일반 예약 서비스</S.TermsItem>
              <S.TermsItem>주차 공간 월 단위 예약 서비스</S.TermsItem>
              <S.TermsItem>그 외 예약 조회, 취소 등 회사가 제공하는 부가 기능</S.TermsItem>
            </S.TermsList>
          </S.TermsSection>

          <S.TermsSection>
            <S.SectionTitle>3. 이용자의 의무</S.SectionTitle>
            <S.TermsList>
              <S.TermsItem>시설·비품 파손, 불법행위, 과도한 소음 등 타인에게 피해를 주는 행위를 해서는 안 됩니다.</S.TermsItem>
              <S.TermsItem>회원의 귀책으로 회사 또는 제3자에게 손해가 발생한 경우, 회원이 배상 책임을 집니다.</S.TermsItem>
            </S.TermsList>
          </S.TermsSection>

          <S.TermsSection>
            <S.SectionTitle>4. 책임 제한</S.SectionTitle>
            <S.TermsList>
              <S.TermsItem>천재지변, 통신 장애 등 불가항력 사유로 인한 서비스 중단에 대해 회사는 책임을 지지 않습니다.</S.TermsItem>
              <S.TermsItem>회원·호스트 간 분쟁은 당사자 간 해결을 원칙으로 하되, 회사의 고의 또는 중대한 과실이 있는 경우에 한해 회사가 책임을 집니다.</S.TermsItem>
            </S.TermsList>
          </S.TermsSection>

          <S.TermsSection>
            <S.SectionTitle>5. 개인정보</S.SectionTitle>
            <S.TermsList>
              <S.TermsItem>회사는 서비스 제공을 위해 필요한 최소한의 개인정보만을 수집·이용하며, 자세한 내용은 별도의 개인정보 처리방침을 따릅니다.</S.TermsItem>
            </S.TermsList>
          </S.TermsSection>

          <S.TermsSection>
            <S.SectionTitle>6. 분쟁 및 관할</S.SectionTitle>
            <S.TermsList>
              <S.TermsItem>본 약관은 대한민국 법을 따릅니다.</S.TermsItem>
              <S.TermsItem>분쟁 발생 시 회사 본점 소재지 관할 법원을 제1심 관할 법원으로 합니다.</S.TermsItem>
            </S.TermsList>
          </S.TermsSection>
          <S.AgreeButton 
            onClick={handleAgreementAClick}
            $isAgreed={agreementA}
          >
            {agreementA ? "동의 취소" : "동의하기"}
          </S.AgreeButton>
        </S.TermsContent>
      )}

      {/* [필수] 개인정보 수집 동의 */}
      <S.TitleWrap>
        <S.OnlyRowFlex>
          <S.H5Bold>
            [필수]
          </S.H5Bold>
          <S.H5Medium>
            개인정보 수집 동의
          </S.H5Medium>
        </S.OnlyRowFlex>
        <S.TitleCategory>
          <S.H5Bold onClick={handleTermsBOnClick} style={{ cursor: 'pointer' }}>
            {!agreementBOpen ? "보기" : "닫기"}
          </S.H5Bold>
          <S.AgreementWrap onClick={handleAgreementBClick}>
            {agreementB ? (
              <>
                <img src='/assets/images/sign-in/agree.png' alt='agree' />
                <S.AgreementText>동의</S.AgreementText>
              </>
            ) : (
              <>
                <img src='/assets/images/sign-in/disagree.png' alt='disagree' />
                <S.DisAgreementText>미동의</S.DisAgreementText>
              </>
            )}
          </S.AgreementWrap>
        </S.TitleCategory>
      </S.TitleWrap>

      {agreementBOpen && (
        <S.TermsContent>
          <S.TermsSection>
            <S.SectionTitle>1. 수집 항목</S.SectionTitle>
            <S.TermsList>
              <S.TermsItem>이름(또는 닉네임), 휴대전화번호, 이메일</S.TermsItem>
              <S.TermsItem>예약 정보(이용일시, 이용시간, 장소, 차량번호 등)</S.TermsItem>
              <S.TermsItem>결제에 필요한 결제 정보 및 취소/환불 처리에 필요한 정보</S.TermsItem>
            </S.TermsList>
          </S.TermsSection>

          <S.TermsSection>
            <S.SectionTitle>2. 이용 목적</S.SectionTitle>
            <S.TermsList>
              <S.TermsItem>리싸이쿨 회원 관리 및 본인 확인</S.TermsItem>
              <S.TermsItem>일반 예약 및 주차 예약 신청, 확인, 변경, 취소 안내</S.TermsItem>
              <S.TermsItem>결제 및 환불 처리, 민원/문의 처리</S.TermsItem>
            </S.TermsList>
          </S.TermsSection>

          <S.TermsSection>
            <S.SectionTitle>3. 보유 및 이용 기간</S.SectionTitle>
            <S.TermsList>
              <S.TermsItem>회원 탈퇴 또는 서비스 종료 시까지 보유</S.TermsItem>
              <S.TermsItem>계약/결제/분쟁 처리 관련 정보는 관련 법령에 따라 최대 5년간 보관 후 파기</S.TermsItem>
            </S.TermsList>
          </S.TermsSection>

          <S.TermsSection>
            <S.SectionTitle>4. 동의 거부 권리 및 불이익</S.SectionTitle>
            <S.TermsList>
              <S.TermsItem>귀하는 개인정보 수집·이용에 대한 동의를 거부할 권리가 있습니다.</S.TermsItem>
              <S.TermsItem>다만, 동의를 거부하실 경우 회원가입 및 예약 서비스 이용이 제한될 수 있습니다.</S.TermsItem>
            </S.TermsList>
          </S.TermsSection>

          <S.AgreeButton 
            onClick={handleAgreementBClick}
            $isAgreed={agreementB}
          >
            {agreementB ? "동의 취소" : "동의하기"}
          </S.AgreeButton>
        </S.TermsContent>
      )}

      {/* [선택] 일반 예약(공간 대관) 이용 및 보증금 규정 */}
      <S.TitleWrap>
        <S.OnlyRowFlex>
          <S.H5Bold>
            [선택]
          </S.H5Bold>
          <S.H5Medium>
            일반 예약(공간 대관) 이용 및 보증금 규정
          </S.H5Medium>
        </S.OnlyRowFlex>
        <S.TitleCategory>
          <S.H5Bold onClick={handleTermsCOnClick} style={{ cursor: 'pointer' }}>
            {!agreementCOpen ? "보기" : "닫기"}
          </S.H5Bold>
          <S.AgreementWrap onClick={handleAgreementCClick}>
            {agreementC ? (
              <>
                <img src='/assets/images/sign-in/agree.png' alt='agree' />
                <S.AgreementText>동의</S.AgreementText>
              </>
            ) : (
              <>
                <img src='/assets/images/sign-in/disagree.png' alt='disagree' />
                <S.DisAgreementText>미동의</S.DisAgreementText>
              </>
            )}
          </S.AgreementWrap>
        </S.TitleCategory>
      </S.TitleWrap>

      {agreementCOpen && (
        <S.TermsContent>
          <S.TermsSection>
            <S.SectionTitle>1. 일반 예약 정의</S.SectionTitle>
            <S.TermsList>
              <S.TermsItem>일반 예약이란 폐교 공간을 일정 기간 대여하여 행사, 촬영, 이벤트 등을 진행하는 서비스를 의미합니다.</S.TermsItem>
            </S.TermsList>
          </S.TermsSection>

          <S.TermsSection>
            <S.SectionTitle>2. 보증금 부과</S.SectionTitle>
            <S.TermsList>
              <S.TermsItem>일반 예약 이용 시 시설 보호 및 뒷정리 의무 이행을 위해 보증금이 부과됩니다.</S.TermsItem>
              <S.TermsItem>보증금 결제는 예약 확정의 조건이며, 결제 시 본 규정에 동의한 것으로 간주됩니다.</S.TermsItem>
            </S.TermsList>
          </S.TermsSection>

          <S.TermsSection>
            <S.SectionTitle>3. 뒷정리 의무</S.SectionTitle>
            <S.TermsList>
              <S.TermsItem>이용 종료 후 시설을 원상 복구하고 쓰레기를 정리해야 합니다.</S.TermsItem>
              <S.TermsItem>시설 및 비품에 대한 손상 방지에 최선을 다해야 합니다.</S.TermsItem>
            </S.TermsList>
          </S.TermsSection>

          <S.TermsSection>
            <S.SectionTitle>4. 보증금 반환</S.SectionTitle>
            <S.TermsList>
              <S.TermsItem>이용 종료 후 시설 점검을 완료한 후, 문제가 없을 경우 보증금을 반환합니다.</S.TermsItem>
              <S.TermsItem>반환은 이용 종료일로부터 영업일 기준 3~5일 내 처리됩니다.</S.TermsItem>
            </S.TermsList>
          </S.TermsSection>

          <S.TermsSection>
            <S.SectionTitle>5. 보증금 미반환 사유</S.SectionTitle>
            <S.TermsList>
              <S.TermsItem>뒷정리가 제대로 이루어지지 않은 경우</S.TermsItem>
              <S.TermsItem>시설 또는 비품에 손상이 발생한 경우</S.TermsItem>
              <S.TermsItem>기타 사전 고지된 사유에 해당하는 경우</S.TermsItem>
            </S.TermsList>
          </S.TermsSection>

          <S.AgreeButton 
            onClick={handleAgreementCClick}
            $isAgreed={agreementC}
          >
            {agreementC ? "동의 취소" : "동의하기"}
          </S.AgreeButton>
        </S.TermsContent>
      )}
    </S.LayOut>
  );
};

export default Component;