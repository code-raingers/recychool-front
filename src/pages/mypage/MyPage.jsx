import React from 'react';
import S from "./style";

const MyPage = () => {
  return (
    <S.All>
      <S.Head>계정관리</S.Head>

      <S.MyPage>
        <S.Title>정보 수정</S.Title>

        <S.Content>
          <S.Row>
            <S.Label>이름</S.Label>
            <S.ReadOnlyBox>홍길동</S.ReadOnlyBox>
          </S.Row>

          <S.Row>
            <S.Label>생년월일</S.Label>
            <S.ReadOnlyBox>2025.02.01</S.ReadOnlyBox>
          </S.Row>

          <S.Row>
            <S.Label>본인 확인 이메일</S.Label>
            <S.ReadOnlyBox>gk1234@gmail.com</S.ReadOnlyBox>
          </S.Row>

          <S.Row>
            <S.RowHeader>
              <S.Label>전화번호</S.Label>
              <S.EditBtn>수정하기</S.EditBtn>
            </S.RowHeader>
            <S.UpdateBox>휴대폰 번호 ‘-’ 제외하고 입력</S.UpdateBox> 
          </S.Row>

          <S.Row>
            <S.RowHeader>
              <S.Label>비밀번호</S.Label>
              <S.EditBtn>수정하기</S.EditBtn>
            </S.RowHeader>
            <S.UpdateBox>************</S.UpdateBox>
          </S.Row>

          <S.SubmitBtn>완료하기</S.SubmitBtn>
        </S.Content>
      </S.MyPage>
    </S.All>
  );
};

export default MyPage;