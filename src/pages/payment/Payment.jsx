import React, { useMemo, useState } from "react";
import S from "./style";
import PaymentForm from "./PaymentForm";
import PaymentSummary from "./PaymentSummary";

import * as PortOne from "@portone/browser-sdk/v2";


const Payment = () => {
  const [payType, setPayType] = useState("GENERAL");

  // 더미 데이터
  const user = { name: "홍길동", email: "test@test.com", phone: "010-0000-0000" };
  const school = { name: "동탄초등학교", address: "서울시 강남구" };
  const reserve = { reserveType: "PARKING", startDate: "2026-01-12" }; 

  const totalPrice = useMemo(() => {
    return reserve.reserveType === "PARKING" ? 300 : 500;
  }, [reserve.reserveType]);

const handlePay = async () => {
  try {
    const response = await PortOne.requestPayment({
      storeId: "store-c5481931-3202-4119-b7f9-2d877d2e7ef1",         
      channelKey: "channel-key-f7346641-df69-43cd-9724-16e58094f5ef",        
      paymentId: `payment-${Date.now()}`,
      orderName: "주차 예약 결제",
      totalAmount: totalPrice,
      currency: "KRW",
      payMethod: payType === "GENERAL" ? "CARD" : payType,
      customer: {
        name: user.name,
        email: user.email,
        phoneNumber: user.phone,
      },
    });

    // 결제 성공
    console.log("결제 성공:", response);
    console.log("paymentId:", response.paymentId);

  } catch (error) {
    // 결제 실패 / 취소
    console.error("결제 실패:", error);
  }
};




  return (
    <S.Page>
      <S.Grid>
        <S.Left>
          <PaymentForm
            user={user}
            reserve={reserve}
            payType={payType}
            setPayType={setPayType}
          />
        </S.Left>

        <S.Right>
          <PaymentSummary
            school={school}
            reserve={reserve}
            totalPrice={totalPrice}
            onClickPay={handlePay}
          />
        </S.Right>
      </S.Grid>
    </S.Page>
  );
};

export default Payment;
