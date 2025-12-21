import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUser, setUserStatus } from '../../../../modules/user';
import S from './style';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)
  const { currentUser, isLogin } = user;
  const { id } = currentUser

  const defaultUser = {
    id: 0,
    userName: "",
    userBirthday: new Date(),
    userEmail: "",
    userPhone: "",
    userNickname: "",
    userProvider: "",
  }

  const handleLogOutOnClick = async () => {
    const accessToken = localStorage.getItem("accessToken"); // 너희 저장 위치에 맞게 바꿔

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/private/users/logout`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        }
      }
    );
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      console.error("로그아웃 실패:", data);
      alert("로그아웃에 실패했습니다.");
      return;
    }
    // 클라에서도 accessToken 제거 (서버는 블랙리스트 처리하지만 클라도 정리)
    localStorage.removeItem("accessToken");
    dispatch(setUser(defaultUser));
    dispatch(setUserStatus(false));
    navigate("/sign-in");
    alert("로그아웃되었습니다.");
  }
  
  return (
    <S.HeaderWrap>
      <S.InnerWrap>
        <Link to={"/"}>
          <img src='/assets/images/logofina.png' />
        </Link>



        <S.RightWrap>
          {isLogin ? (
            <>
              <S.MyPageWrap>
                <Link to={"/my-page"}>마이페이지</Link>
              </S.MyPageWrap>
              <S.LogOut>
                <div onClick={handleLogOutOnClick}>로그아웃</div>
              </S.LogOut>
            </>
          ) : (
            <>
              <S.loginWrap>
                <Link to={"/sign-in"}>
                  <span>로그인</span>
                </Link>

              </S.loginWrap>
              <S.SignInWrap>
                <Link to={"/sign-up"}>
                  <span>회원가입</span>
                </Link>
              </S.SignInWrap>
            </>
          )}
        </S.RightWrap>
      </S.InnerWrap>
    </S.HeaderWrap>

    
  );
};

export default Header;