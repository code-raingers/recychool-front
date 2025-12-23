import React from "react";
import S from "./style";

const PaymentSummary = ({ school, reserve, totalPrice, onClickPay }) => {
  const purposeLabel = reserve.reserveType === "PARKING" ? "주차" : "장소";

  return (
    <S.SummarySticky>
      <S.SummaryCard>
        <S.SummaryTitle>나의 예약 정보</S.SummaryTitle>
        <S.SummaryLine />

        <S.SummaryGrid>
          <S.SummaryKey>학교 이름</S.SummaryKey>
          <S.SummaryVal>{school.name}</S.SummaryVal>

          <S.SummaryKey>위치</S.SummaryKey>
          <S.SummaryVal>{school.address}</S.SummaryVal>

          <S.SummaryKey>시작날짜</S.SummaryKey>
          <S.SummaryVal>{reserve.startDate || "-"}</S.SummaryVal>

          <S.SummaryKey>종료날짜</S.SummaryKey>
          <S.SummaryVal>{reserve.endDate || "-"}</S.SummaryVal>

          <S.SummaryKey>목적</S.SummaryKey>
          <S.SummaryVal>{purposeLabel}</S.SummaryVal>

          <S.SummaryKey>결제 금액</S.SummaryKey>
          <S.SummaryValPrice>{totalPrice.toLocaleString()}원</S.SummaryValPrice>
        </S.SummaryGrid>

        <S.PayButton onClick={onClickPay}>결제하기</S.PayButton>
      </S.SummaryCard>
    </S.SummarySticky>
  );
};

export default PaymentSummary;
