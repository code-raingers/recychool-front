import React, { useEffect, useState } from 'react';
import S from './style';
import { useSelector } from "react-redux";


const Movie = () => {
  const API = process.env.REACT_APP_BACKEND_URL;
  const currentUser = useSelector((state) => state.user?.currentUser);
  const userId = currentUser?.id;

  const [schools, setSchools] = useState([]);
  const [selectedSchoolId, setSelectedSchoolId] = useState(null);
  const [remainingSeats, setRemainingSeats] = useState(null);
  const [countLoading, setCountLoading] = useState(false);

  // 1) 학교 목록 조회
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch(`${API}/reservations/movie-schools`);
        const json = await res.json();
        if (!res.ok) throw new Error(json?.message || '학교 목록 조회 실패');

        const list = Array.isArray(json.data) ? json.data : [];
        setSchools(list);

        if (list.length > 0) setSelectedSchoolId(list[0].id);
        else setSelectedSchoolId(null);
      } catch (e) {
        console.error(e);
        setSchools([]);
      }
    };
    fetchSchools();
  }, []);

  // 2) 학교 선택될 때마다: 잔여좌석 조회
  const fetchRemainingSeats = async () => {
    if (selectedSchoolId == null) return;
    
    setCountLoading(true);
    try {
      const res = await fetch(`${API}/reservations/count/${selectedSchoolId}`);
      const json = await res.json();
      if (!res.ok) throw new Error('좌석 조회 실패');
      setRemainingSeats(Number(json.data)-1);
    } catch (e) {
      console.error(e);
      setRemainingSeats(null);
    } finally {
      setCountLoading(false);
    }
  };

  useEffect(() => {
    fetchRemainingSeats();
  }, [selectedSchoolId]);


const handleReservation = async () => {
  if (!userId) {
    alert("로그인이 필요합니다! (Redux에 currentUser가 없어요)");
    // 원하면 로그인 페이지로 이동
    // navigate("/sign-in");
    return;
  }

  if (!selectedSchoolId) {
    alert("학교를 먼저 선택해주세요!");
    return;
  }

  try {
    const movieTitle = encodeURIComponent("코렐라인");
    const url = `${API}/reservations/write?schoolId=${selectedSchoolId}&movieTitle=${movieTitle}&userId=${userId}`;

    const res = await fetch(url, {
      method: "POST",
      credentials: "include", // ✅ 로그인 쿠키/세션 쓰면 필수
    });

    // 서버가 JSON이 아니라 HTML을 줄 때도 있어서 안전하게 처리
    const contentType = res.headers.get("content-type") || "";
    let data = null;

    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();
      console.error("JSON 아닌 응답:", text.slice(0, 300));
    }

    if (res.ok) {
      alert("예약 성공!");
      fetchRemainingSeats();
    } else {
      alert(data?.message || `예약 실패 (status=${res.status})`);
    }
  } catch (error) {
    console.error(error);
    alert("서버 오류가 발생했습니다.");
  }
};


  return (
    <div>
      <S.MainWrap>
        <S.BannerWrap>
          <S.ContentRow>
            <S.MapPane>
              <img src="/assets/images/school.png" alt="학교 지도" />
            </S.MapPane>

            <S.SidePane>
              <S.InfoCard>
                <S.InfoHeaderWrap>
                  <S.InfoHeaderLeft>
                    <img src="/assets/images/movie-icon.png" alt="영화 아이콘" />
                  </S.InfoHeaderLeft>
                  <S.InfoCardTitleWrap>
                    <p>이번달 영화</p>
                  </S.InfoCardTitleWrap>
                </S.InfoHeaderWrap>

                <S.InfoCardMiddleWrap>
                  <img src="/assets/images/movie1.png" alt="영화 포스터" />
                </S.InfoCardMiddleWrap>

                <S.InfoCardFloorWrap>
                  <S.InfoCardMovie><p>제목</p></S.InfoCardMovie>
                  <S.InfoCardTitle><p>코렐라인</p></S.InfoCardTitle>
                </S.InfoCardFloorWrap>
              </S.InfoCard>

              <S.ReservationCard>
                <S.ReservationTitle><p>행사</p></S.ReservationTitle>

                <S.ReservationRow>
                  <S.ReservationLabel>시간</S.ReservationLabel>
                  <S.ReservationSeat>18:00 ~ 19:41</S.ReservationSeat>
                </S.ReservationRow>

                <S.ReservationRow>
                  <S.ReservationLabel>학교</S.ReservationLabel>
                  <S.ReservationSelect
                    value={selectedSchoolId ?? ''}
                    onChange={(e) => setSelectedSchoolId(Number(e.target.value))}
                    disabled={schools.length === 0}
                  >
                    {schools.length === 0 ? (
                      <option value="">학교 없음</option>
                    ) : (
                      schools.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.schoolName ?? s.name ?? `학교(${s.id})`}
                        </option>
                      ))
                    )}
                  </S.ReservationSelect>
                </S.ReservationRow>

                <S.ReservationRow>
                  <S.ReservationLabel>좌석</S.ReservationLabel>
                  <S.ReservationSeat>
                    {countLoading ? '조회중...' : `${remainingSeats ?? '-'}석`}
                  </S.ReservationSeat>
                </S.ReservationRow>

                <S.ReservationRow>
                  <S.ReservationButton onClick={handleReservation}>
                    예약하기
                  </S.ReservationButton>
                </S.ReservationRow>
              </S.ReservationCard>
            </S.SidePane>
          </S.ContentRow>    
        </S.BannerWrap>
<S.Content>
          <S.SchoolInfo>
            <S.ListTitle>12월 18일 자동차 극장</S.ListTitle>
            
            <S.CardGrid>
              {/* 1번 카드 */}
              <S.Card>
                <S.CardIcon>
                  <img src="/assets/images/red.png" alt="위치 아이콘" />
                </S.CardIcon>
                <S.CardImg>
                   <img src="/assets/images/movieschool1.png" alt="학교" />
                </S.CardImg>

                <S.SchoolName>양평초</S.SchoolName>
                <S.InfoLine><img src="/assets/images/marker.png" alt="학교 주소" /><span>경기도 포천시 영중면 전영로1429번길 5</span></S.InfoLine>
                <S.InfoLine><img src="/assets/images/phone.png" alt="전화" /><span>031-539-0033</span></S.InfoLine>
              </S.Card>

              {/* 2번 카드 */}
              <S.Card>
                <S.CardIcon>
                  <img src="/assets/images/blue.png" alt="위치 아이콘" />
                </S.CardIcon>
                <S.CardImg>
                  <img src="/assets/images/movieschool2.jpg" alt="학교" />
                </S.CardImg>

                <S.SchoolName>덕수고</S.SchoolName>
                <S.InfoLine><img src="/assets/images/marker.png" alt="학교 주소" /><span>서울특별시 성동구 왕십리로 199</span></S.InfoLine>
                <S.InfoLine><img src="/assets/images/phone.png" alt="전화" /><span>02-2286-3704</span></S.InfoLine>
              </S.Card>

              {/* 3번 카드 */}
              <S.Card>
                <S.CardIcon>
                  <img src="/assets/images/yellow.png" alt="위치 아이콘" />
                </S.CardIcon>
                <S.CardImg>
                   <img src="/assets/images/movieschool3.png" alt="학교" />
                </S.CardImg>
                
                <S.SchoolName>구.백성초</S.SchoolName>
                <S.InfoLine><img src="/assets/images/marker.png" alt="학교 주소" /><span>경기도 안성시 백성2길 59</span></S.InfoLine>
                <S.InfoLine><img src="/assets/images/phone.png" alt="전화" /><span>031-678-5271</span></S.InfoLine> 
              </S.Card>
            </S.CardGrid>
          </S.SchoolInfo>
        </S.Content>
      </S.MainWrap>
    </div>
  );
};

export default Movie;