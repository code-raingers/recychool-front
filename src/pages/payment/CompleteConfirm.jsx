import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import S from "./style";

const formatKoreanDate = (yyyyMMdd) => {
  if (!yyyyMMdd) return "-";
  const [y, m, d] = yyyyMMdd.split("-").map(Number);
  return `${y}년 ${m}월 ${d}일`;
};

const formatRange = (start, end) => {
  if (!start) return "-";
  if (!end) return formatKoreanDate(start);
  return `${formatKoreanDate(start)} - ${formatKoreanDate(end)}`;
};

const CompleteConfirm = () => {
  const navigate = useNavigate();
  const { reserveId } = useParams();

  const [dto, setDto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReserve = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/private/payment/page?reserveId=${reserveId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (!res.ok) {
          console.log("예약 조회 실패", res.status);
          setDto(null);
          return;
        }

        const json = await res.json();
        setDto(json.data);
      } finally {
        setLoading(false);
      }
    };

    fetchReserve();
  }, [reserveId]);

  const handleCancelReserve = async () => {
  const ok = window.confirm("예약을 취소할까요?");
  if (!ok) return;

  const res = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/private/schools/reserves/${reserveId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );

  if (!res.ok) {
    alert("예약 취소에 실패했습니다.");
    return;
  }

  alert("예약 취소가 완료되었습니다.");
  navigate("/"); 
};

  if (loading) return null;
  if (!dto) return null;

  const isParking = dto.reserveType === "PARKING";
  const title = isParking ? "주차 예약 내역" : "장소 예약 내역";

  const dateText = isParking
    ? formatRange(dto.startDate, dto.endDate)
    : formatKoreanDate(dto.startDate);

  const leftButtonText = isParking ? "연장 하기" : "예약 취소";

  return (
    <S.Page>
      <S.CompleteWrap>
        <S.CompleteCard>
          <S.CompleteTitle>{title}</S.CompleteTitle>
          <S.CompleteDivider />

          <S.CompleteTable>
            <S.CompleteRow>
              <S.CompleteTh>예약자명</S.CompleteTh>
              <S.CompleteTd>{dto.userName}</S.CompleteTd>
            </S.CompleteRow>

            <S.CompleteRow>
              <S.CompleteTh>이용날짜</S.CompleteTh>
              <S.CompleteTd>{dateText}</S.CompleteTd>
            </S.CompleteRow>

            <S.CompleteRow>
              <S.CompleteTh>학교명</S.CompleteTh>
              <S.CompleteTd>{dto.schoolName}</S.CompleteTd>
            </S.CompleteRow>

            <S.CompleteRow>
              <S.CompleteTh>이용요금</S.CompleteTh>
              <S.CompleteTd>
                {Number(dto.amount).toLocaleString()}원
              </S.CompleteTd>
            </S.CompleteRow>

            <S.CompleteRow>
              <S.CompleteTh>결제상태</S.CompleteTh>
              <S.CompleteTd>결제 완료</S.CompleteTd>
            </S.CompleteRow>
          </S.CompleteTable>

          <S.CompleteButtonRow>
            <S.CompletePrimaryButton
              type="button"
              onClick={() => {
                if (isParking) {
                  // 연장 결제
                  navigate(`/payment/${reserveId}?extend=true`);
                } else {
                  handleCancelReserve();
                }
              }}
            >
              {leftButtonText}
            </S.CompletePrimaryButton>

            <S.CompleteSecondaryButton type="button" onClick={() => navigate("/")}>
              메인 페이지로 이동
            </S.CompleteSecondaryButton>


          </S.CompleteButtonRow>
        </S.CompleteCard>
      </S.CompleteWrap>
    </S.Page>
  );
};

export default CompleteConfirm;