import styled from 'styled-components';
import { h6Bold, h6Light, h6Medium } from '../../styles/common';
import { Link } from 'react-router-dom';
const S = {};
S.Input = styled.input`
  width: 440px;
  height: 55px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  
  &:focus {
    border-color: ${({ theme }) => theme.PALETTE.primary.green.main};
    outline: none;
  }
  ${h6Medium}
`
S.InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
S.Button = styled.button`
  width: 440px;
  height: 40px;
  border-radius: 4px;
  border: none;
  background-color: ${({ theme }) => theme.PALETTE.primary.green.main};
  color: ${({ theme }) => theme.PALETTE.neutral.white.main};
  cursor: pointer;
  ${h6Bold}
  
  &:hover:not(:disabled) {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
S.Form =styled.form`
  display: flex;
  flex-direction: column;
  gap: 26px;
`
S.MiddleWrap = styled.div`
  width: 440px;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
S.Hr = styled.hr`
  width: 120px;
  margin: 0 auto;
  border: 0cap.5 solid #9e9e9e;
`
S.MiddleText = styled.div`
  width: 183px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #9e9e9e;;
  ${h6Light}
  margin-top: 26px;
  margin-bottom: 26px;
`
S.SocialItemWrap = styled.div`
  width: 420px;
  display: flex;
  /* height: 72px; */
  /* gap: 72px; */
  justify-content: space-between;
  & img {
    width: 50px;
    height: 50px;
  }
`
S.SocialItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  ${h6Medium}
`

S.AllLayOut = styled.div`
  height: 100vh;           /* 화면 전체 높이 사용 */
  width: 100vw;  
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`

S.LinkBasic = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};
  :visited{
    text-decoration: none;
    color: ${({ theme }) => theme.PALETTE.neutral.black.secondary};
  }
`
S.TextWrap = styled.div`
  margin-top: 24px;
  display: flex;
  width: 420px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
`
export default S;