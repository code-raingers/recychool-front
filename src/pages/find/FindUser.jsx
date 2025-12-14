import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import S from './style';

const FindUser = () => {
  const url = useLocation();
  const {pathname} = url;
  const checkPage = () => {
    if(pathname.includes("email")){ 
      return "아이디 찾기"
    }else if( pathname.includes("password")){
      return "비밀번호 찾기"
    }
  }
  return (
    <S.LayOut>
      <S.HeaderWrap>
        <S.Header>{checkPage()}</S.Header>
      </S.HeaderWrap>
      <S.Tap>
        <NavLink to={"email"} className={({ isActive }) => isActive ? "active" : ""} >
          <S.TapDiv>
            아이디 찾기
          </S.TapDiv>
        </NavLink>
        <NavLink to={"password"} className={({ isActive }) => isActive ? "active" : ""}>
          <S.TapDiv>
            비밀번호 찾기
          </S.TapDiv>
        </NavLink>
      </S.Tap>
      <Outlet />
    </S.LayOut>
  );
};

export default FindUser;