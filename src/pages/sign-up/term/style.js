import styled from 'styled-components';
import { h3Bold, h3Light, h5Bold, h5Medium, h6Bold, h6Light, h6Medium } from '../../../styles/common';
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
  width: 680px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${h5Bold}
  color: #fff;
  background-color: ${({ theme }) => theme.PALETTE.primary.green.main};
  border-radius: 4px;
  :hover{
    cursor: pointer;
  }
  margin-top: 24px;
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

export default S;