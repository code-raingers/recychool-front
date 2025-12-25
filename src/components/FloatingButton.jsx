import React, { useState } from "react";
import S from "./style";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const FloatingButton = () => {
  const navigate = useNavigate();

  const currentUser = useSelector(state => state.user?.currentUser);
  const userId = currentUser?.id;
  const token = localStorage.getItem("accessToken");

  const [open, setOpen] = useState(false);
  const [placeList, setPlaceList] = useState([]);
  const [isSchoolOpen, setIsSchoolOpen] = useState(false);

  /* 달력 버튼 */
  const toggleMenu = () => {
    setOpen(prev => !prev);
    setPlaceList([]);
    setIsSchoolOpen(false);
  };

  /* 행사 버튼 */
  const handleEventClick = async () => {
    if (!userId) return;

    try {
      const res = await fetch(
        `${BACKEND_URL}/reservations/my/${userId}`,
        { credentials: "include" }
      );

      if (!res.ok) return;

      const json = await res.json();
      const list = Array.isArray(json.data) ? json.data : [];

      if (list.length > 0) {
        navigate("/movie/reservation");
      }
    } catch (e) {
      console.error(e);
    }
  };

  /* 주차 버튼 */
  const handleParkingClick = async () => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/private/schools/parking/reserves`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) return;

      const json = await res.json();
      const reserveId = json.data;

      if (reserveId) {
        navigate(`/complete/${reserveId}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  /* 학교 버튼 (토글) */
  const handleSchoolClick = async () => {
    // 이미 열려 있으면 닫기
    if (isSchoolOpen) {
      setIsSchoolOpen(false);
      setPlaceList([]);
      return;
    }

    try {
      const res = await fetch(
        `${BACKEND_URL}/private/schools/place/reserves`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) return;

      const json = await res.json();
      const list = Array.isArray(json.data) ? json.data : [];

      if (list.length === 0) return;

      setPlaceList(list);
      setIsSchoolOpen(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <S.FloatingWrapper>

      {open && (
        <S.SubFloatingButton>

          {/*  학교 버튼 + 학교 이미지 */}
          <S.SchoolButtonWrapper>

            <S.SubFloatingButton3 onClick={handleSchoolClick}>
              <img src="/assets/images/schooll.png" alt="학교" />
            </S.SubFloatingButton3>

            {isSchoolOpen && (
              <S.SchoolFloationButton>
                {placeList.map(item => (
                  <S.SchoolFloationButton1
                    key={item.reserveId}
                    onClick={() => navigate(`/complete/${item.reserveId}`)}
                  >
                    <S.SchoolImage
                      src={`${BACKEND_URL}/images/${item.schoolImageName}`}
                      alt="학교"
                    />
                  </S.SchoolFloationButton1>
                ))}
              </S.SchoolFloationButton>
            )}

          </S.SchoolButtonWrapper>

          {/* 행사 */}
          <S.SubFloatingButton2 onClick={handleEventClick}>
            <img src="/assets/images/movie-icon.png" alt="행사" />
          </S.SubFloatingButton2>

          {/* 주차 */}
          <S.SubFloatingButton1 onClick={handleParkingClick}>
            <img src="/assets/images/car.png" alt="자동차" />
          </S.SubFloatingButton1>

        </S.SubFloatingButton>
      )}

      {/* 달력 */}
      <S.FloatingButton onClick={toggleMenu}>
        <img src="/assets/images/calender.png" alt="달력" />
      </S.FloatingButton>

    </S.FloatingWrapper>
  );
};

export default FloatingButton;
