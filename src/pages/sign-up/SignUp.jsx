import React from 'react';
import { Outlet } from 'react-router-dom';

const SignIn = () => {
  return (
    <div>
      회원가입 페이지
      <Outlet />
    </div>
  );
};

export default SignIn;