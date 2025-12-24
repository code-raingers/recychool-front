import React, { useEffect, useMemo, useState } from "react";
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

const ENABLE_DAYS_BEFORE = 7;

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
        // const res = await fetch(
        //   `${process.env.REACT_APP_BACKEND_URL}/private/payment/page?reserveId=${reserveId}`,
        //   {
        //     method: "GET",
        //     credentials: "include", // ⭐ 이 한 줄이 핵심
        //   }
        // );


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

  // 날짜 차이 계산(연장 버튼 활성화 판단용)
  const canExtend = useMemo(() => {
    if (!dto) return false;
    if (dto.reserveType !== "PARKING") return false;
    if (!dto.endDate) return false;

    const [y, m, d] = dto.endDate.split("-").map(Number);
    const end = new Date(y, m - 1, d);
    end.setHours(0, 0, 0, 0);

    const enable = new Date(end);
    enable.setDate(enable.getDate() - ENABLE_DAYS_BEFORE);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // enableDate(종료일-7일)부터 종료일까지 활성화
    return today >= enable && today <= end;
  }, [dto]);

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
    navigate("/", { replace: true });
  };

  // 연장 결제 이동(7일 전부터만)
  const handleGoExtend = () => {
    if (!canExtend) {
      alert(`연장은 종료일 ${ENABLE_DAYS_BEFORE}일 전부터 가능합니다.`);
      return;
    }
    navigate(`/payment/${reserveId}?extend=true`);
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
              <S.CompleteTd>{Number(dto.amount).toLocaleString()}원</S.CompleteTd>
            </S.CompleteRow>

            <S.CompleteRow>
              <S.CompleteTh>결제상태</S.CompleteTh>
              <S.CompleteTd>결제 완료</S.CompleteTd>
            </S.CompleteRow>
          </S.CompleteTable>

          <S.CompleteButtonRow>
            <S.CompletePrimaryButton
              type="button"
              disabled={isParking ? !canExtend : false}
              onClick={() => {
                if (isParking) {
                  handleGoExtend();
                } else {
                  handleCancelReserve();
                }
              }}
            >
              {leftButtonText}
            </S.CompletePrimaryButton>

            <S.CompleteSecondaryButton
              type="button"
              onClick={() => navigate("/", { replace: true })}
            >
              메인 페이지로 이동
            </S.CompleteSecondaryButton>
          </S.CompleteButtonRow>
        </S.CompleteCard>
      </S.CompleteWrap>
    </S.Page>
  );
};

export default CompleteConfirm;
