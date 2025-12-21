import styled from 'styled-components';
import { h3Bold, h3Light, h5Bold, h5Medium, h6Bold, h6Light, h6Medium, h7Medium } from '../../../styles/common';
import { Link, NavLink } from 'react-router-dom';
const S = {};

S.LayOut = styled.div`
  width: 680px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: baseline;
  margin-top: 72px;
  position: relative;
`
S.H3 = styled.h3`
  ${h3Light}
`
S.H5 = styled.h5`
  ${h5Medium}
`
S.H6 = styled.h6`
  ${h6Light}
`
S.TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 48px;
`
S.TapWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 36px 0;
  :hover{
    cursor: pointer;
  }
`
S.Tap = styled.div`
  display: flex;
  gap: 2px;
  justify-content: center;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  width: 150px;
  height: 51px;
  & img{
    width: 30px;
  }
  :hover{
    cursor: pointer;
  }
`
S.NextStep = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${h5Bold}
  color: #fff;
  background-color: ${({ theme }) => theme.PALETTE.primary.green.main};
  border-radius: 4px;
  margin-top: 24px;
  :hover{
    cursor: pointer;
  }
`

S.ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`

S.InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-bottom: 24px;
`

S.EmailInputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  margin-bottom: 24px;
`

S.Label = styled.p`
  ${h6Bold}
  margin: 0;
`

S.Input = styled.input`
  width: 100%;
  height: 52px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 0 12px;
  box-sizing: border-box;
  ${h7Medium}
  color: #333;
  
  &::placeholder {
    color: #999999;
  }
  
  &:focus {
    border-color: ${({ theme }) => theme.PALETTE.primary.green.main};
    outline: none;
  }
  
  &:disabled {
    background-color: #f5f5f5;
    color: #999999;
    cursor: not-allowed;
  }
`

S.ErrorWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

S.ErrorText = styled.div`
  color: ${({ theme }) => theme.PALETTE.warn.red.main};
  font-size: 12px;
  ${h6Light}
`

S.FieldWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
`

S.FieldLabel = styled.p`
  ${h6Bold}
  margin: 0;
`

S.FieldValue = styled.div`
  width: 100%;
  height: 52px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 0 12px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  ${h7Medium}
  color: #999999;
`

S.VerifyButton = styled.div`
  width: 130px;
  height: 42px;
  border-radius: 10px;
  border: 1px solid ${({ theme, disabled }) => 
    disabled ? '#ccc' : theme.PALETTE.secondary.blue.light};
  display: flex;
  align-items: center;
  justify-content: center;
  ${h7Medium}
  color: ${({ theme, disabled }) => 
    disabled ? '#999' : theme.PALETTE.secondary.blue.main};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  
  &:hover {
    background-color: ${({ theme, disabled }) => 
      disabled ? 'transparent' : theme.PALETTE.secondary.blue.light};
  }
`

S.TimerText = styled.span`
  color: ${({ theme }) => theme.PALETTE.primary.green.main};
  font-weight: bold;
  font-size: 16px;
`

S.EmailCheckMessage = styled.div`
  width: 100%;
  text-align: center;
  ${h7Medium}
  color: ${({ theme, $isAvailable }) => 
    $isAvailable 
      ? theme.PALETTE.secondary.blue.main 
      : theme.PALETTE.secondary.pink.main};
  margin-top: 4px;
`

S.EmailErrorText = styled.div`
  width: 100%;
  text-align: center;
  ${h7Medium}
  color: ${({ theme }) => theme.PALETTE.warn.red.main};
  margin-top: 4px;
`

export default S;