import styled from 'styled-components';
import { h3Bold, h5Bold, h5Medium, h6Bold, h6Light, h6Medium } from '../../styles/common';
import { Link, NavLink } from 'react-router-dom';
const S = {};

S.LayOut = styled.div`
  width: 1160px;  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`

S.Header = styled.span`
  ${h3Bold}
`
S.HeaderWrap = styled.div`
  width: 1160px;
  display: flex;
  align-items: baseline;
  ${h3Bold}
  margin: 72px 0px;
`
S.Tap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  color: #666666;
  & > .active {
      background-color: ${({ theme }) => theme.PALETTE.primary.green.main};
      color: #fff;
    }
  clip-path: polygon(
    0 0,
    calc(100% - 17px) 0,
    100% 50%,
    calc(100% - 17px) 100%,
    0 100%
  );
`
S.TapDiv = styled.div`
  width: calc(1160px / 4);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 41px;
  ${h5Medium}
`
S.Step = styled(NavLink)`
  width: calc(1160px / 4);
  height: 41px;
  clip-path: polygon(
    0 0,
    calc(100% - 17px) 0,
    100% 50%,
    calc(100% - 17px) 100%,
    0 100%
  );
`
S.ChildrenLayOut = styled.div`
  width: 620px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: baseline;
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
export default S;