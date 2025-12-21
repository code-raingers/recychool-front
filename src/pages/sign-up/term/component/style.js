import styled from 'styled-components';
import { h3Bold, h3Light, h5Bold, h5Medium, h6Bold, h6Light, h6Medium, h7Light } from '../../../../styles/common';
import { Link, NavLink } from 'react-router-dom';
const S = {};

S.LayOut = styled.div`
  width: 680px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: baseline;
  gap: 24px;
`
S.H3 = styled.h3`
  ${h3Light}
`
S.H5Medium = styled.h5`
  ${h5Medium}
`
S.H5Bold = styled.h5`
  ${h5Bold}
`
S.H6 = styled.h6`
  ${h6Light}
`
S.TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
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
`
S.OnlyRowFlex = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: center;
  align-items: center;
`
S.TitleCategory = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`
S.TitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  ${h5Bold}
  margin-bottom: 0;
`

S.AgreementWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  & img {
    width: 18px;
    height: 18px;
  }
`
S.AgreementText = styled.p`
  color: ${({ theme }) => theme.PALETTE.secondary.blue.main};
`
S.DisAgreementText = styled.p`
  color: ${({ theme }) => theme.PALETTE.secondary.pink.main};
`

S.TermsContent = styled.div`
  width: 100%;
  margin-top: 24px;
  padding: 24px;
  /* background-color: #f9f9f9; */
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  ${h7Light}
`

S.TermsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

S.SectionTitle = styled.h6`
  ${h6Bold}
  margin-bottom: 4px;
`

S.TermsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #333;
`

S.TermsItem = styled.li`
  ${h6Light}
  position: relative;
  padding-left: 16px;
  
  &::before {
    content: "-";
    position: absolute;
    left: 0;
  }
`

S.AgreeButton = styled.button`
  width: 680px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${h5Bold}
  color: #fff;
  background-color: ${({ theme, $isAgreed }) => 
    $isAgreed 
      ? theme.PALETTE.secondary.pink.main 
      : theme.PALETTE.secondary.blue.main};
  border-radius: 4px;
  border: none;
  cursor: pointer;
  margin-top: 24px;
  
  &:hover {
    opacity: 0.9;
  }
`

export default S;