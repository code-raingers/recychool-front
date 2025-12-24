import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import ReserveMap from "./components/ReserveMap";
import S from "./style";


// 예약 페이지 조회 
const fetchReservePage = async ({ queryKey }) => {
  const [, schoolId, reserveType] = queryKey;

  if (!schoolId || !reserveType) return null; 

  const res = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/public/schools/${schoolId}/${reserveType.toLowerCase()}`
  );

  if (!res.ok) {
    throw new Error("예약 페이지 조회 실패");
  }

  return res.json(); // ApiResponseDTO 그대로 반환
};

//  학교 좌표 조회  
const fetchSchoolCoordinate = async ({ queryKey }) => {
  const [, schoolId] = queryKey;

  const res = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/public/schools/${schoolId}/coordinate`
  );

  if (!res.ok) {
    throw new Error("학교 좌표 조회 실패");
  }

  const result = await res.json();
  return result.data; // ApiResponseDTO의 data만 반환
};

// 주차 날짜별 카운트 조회 
const fetchParkingCounts = async ({ queryKey }) => {
  const [, schoolId] = queryKey;

  const res = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/public/schools/${schoolId}/parking/counts`
  );

  if (!res.ok) {
    throw new Error("주차 날짜별 카운트 조회 실패");
  }

  const result = await res.json();
  return result.data; 
};

//  Reserve 컴포넌트  
const Reserve = ({ reserveType }) => {
  const { schoolId } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);

  // 예약 페이지 데이터 
  const {
    data: reserveResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reservePage", schoolId, reserveType],
    queryFn: fetchReservePage,
    enabled: !!schoolId && !!reserveType,
  });

  const reserveData = reserveResponse?.data;

  // 학교 좌표 데이터 
  const { data: coord } = useQuery({
    queryKey: ["schoolCoordinate", schoolId],
    queryFn: fetchSchoolCoordinate,
    enabled: !!schoolId,
  });

  // 주차 날짜별 예약 수 (PARKING일 때만) 
  const { data: parkingCountMap = {} } = useQuery({
    queryKey: ["parkingCounts", schoolId],
    queryFn: fetchParkingCounts,
    enabled: reserveType === "PARKING" && !!schoolId,
  });

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러 발생</div>;

  return (
    <S.Page>

      <S.Container>
        <S.ContentRow>
          <LeftPanel
            data={reserveData}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            dateCountMap={parkingCountMap} 
          />

          <RightPanel
            data={reserveData}
            type={reserveType}
            selectedDate={selectedDate}
          />
        </S.ContentRow>

        <S.MapSection>
          {coord && (
            <ReserveMap
              key={`${coord.lat}-${coord.lng}`}
              lat={coord.lat}
              lng={coord.lng}
            />
          )}
        </S.MapSection>
      </S.Container>
    </S.Page>
  );
};

export default Reserve;
