import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import * as PortOne from "@portone/browser-sdk/v2";

import S from "./style";
import PaymentForm from "./PaymentForm";
import PaymentSummary from "./PaymentSummary";

const Payment = () => {
  const navigate = useNavigate();
  const { reserveId } = useParams();

  const [payType, setPayType] = useState("GENERAL");
  const [school, setSchool] = useState(null);
  const [reserve, setReserve] = useState(null);

  const isExtend =
    new URLSearchParams(window.location.search).get("extend") === "true";

  const reduxUser = useSelector((state) => state.user.currentUser);

  const user = useMemo(
    () => ({
      name: reduxUser?.userName ?? "",
      email: reduxUser?.userEmail ?? "",
    }),
    [reduxUser]
  );

  useEffect(() => {
    const fetchReserve = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/private/payment/page?reserveId=${reserveId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!res.ok) return;

      const json = await res.json();
      const dto = json.data;

      setSchool({
        name: dto.schoolName,
        address: dto.schoolAddress,
      });

      setReserve({
        id: dto.reserveId,
        reserveType: dto.reserveType,
        startDate: dto.startDate,
        endDate: dto.endDate,
        amount: dto.amount,
      });
    };

    fetchReserve();
  }, [reserveId]);

  const totalPrice = useMemo(() => {
    if (!reserve) return 0;
    return reserve.amount;
  }, [reserve]);

  if (!reduxUser || !school || !reserve) return null;

  const getPortOnePayType = () => {
    if (payType === "GENERAL") {
      return {
        channelKey: process.env.REACT_APP_PORTONE_CHANNEL_CARD,
        payMethod: "CARD",
      };
    }
    if (payType === "KAKAO") {
      return {
        channelKey: process.env.REACT_APP_PORTONE_CHANNEL_KAKAOPAY,
        payMethod: "EASY_PAY",
        easyPayProvider: "KAKAOPAY",
      };
    }
    if (payType === "TOSS") {
      return {
        channelKey: process.env.REACT_APP_PORTONE_CHANNEL_TOSSPAY,
        payMethod: "EASY_PAY",
        easyPayProvider: "TOSSPAY",
      };
    }
    throw new Error("Unknown payType");
  };

  const handlePay = async () => {
    try {
      const paymentId = `payment-${Date.now()}`;
      const { channelKey, payMethod, easyPayProvider } = getPortOnePayType();

      const paymentRequest = {
        storeId: process.env.REACT_APP_PORTONE_STORE_ID,
        channelKey,
        paymentId,
        orderName:
          reserve.reserveType === "PARKING"
            ? "주차 예약 결제"
            : "장소 대여 결제",
        totalAmount: totalPrice,
        currency: "CURRENCY_KRW",
        payMethod,
        customer: {
          fullName: user.name,
          email: user.email,
        },
      };

      if (payMethod === "EASY_PAY") {
        paymentRequest.easyPay = { easyPayProvider };
      }

      const response = await PortOne.requestPayment(paymentRequest);

      // 결제창 종료 / 취소
      if (!response) {
        alert("결제가 취소되었습니다.");
        return;
      }

      // 결제 성공 여부 검증
      if (response.status !== "PAID") {
        alert("결제가 완료되지 않았습니다.");
        return;
      }

      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/private/payment/complete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            reserveId: reserve.id,
            impUid: response.paymentId,
            merchantUid: paymentId,
            paymentType: payType,
            amount: totalPrice,
            extend: isExtend,
          }),
        }
      );

      if (!res.ok) {
        alert("결제 처리에 실패했습니다.");
        return;
      }

      alert("결제가 완료되었습니다.");
      navigate(`/complete/${reserve.id}?extend=${isExtend}`);
    } catch (error) {
      console.error(error);
      alert("결제 중 오류가 발생했습니다.");
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
