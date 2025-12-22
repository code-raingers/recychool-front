import styled from "styled-components";
import { h3Light, h3Medium, h4Bold, h4Light, h5Bold, h6Bold, h7Medium } from "../../styles/common";

const S = {};

S.All = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

S.Head = styled.div`
${h3Medium}
`;

S.MyPage = styled.div`
  width: 680px;
  margin-top: 30px;
`;

S.Title = styled.div`
  margin: 40px 0;
  ${h4Light}
`;

S.Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

S.Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  
`;

S.RowHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.Label = styled.div`
  ${h6Bold}
`;

S.ReadOnlyBox = styled.div`
  background: #E0E0E0;
  width: 650px;
  height: 52px;
  border-radius: 8px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  color: #999999;
`;



S.EditBtn = styled.button`
  all: unset;  //내가 선택한 스타일만 적용
  width: 80px;
  height: 32px;
  background-color: ${({ theme }) => theme.PALETTE.primary.green.main};
  color: ${({ theme }) => theme.PALETTE.neutral.white.main};
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #5EA50B;
      
  }

  ${h7Medium}
  display: flex;
  align-items: center;
  justify-content: center;
`;


S.SubmitBtn = styled.button`
  margin-top: 40px;
  height: 52px;
  background-color: ${({ theme }) => theme.PALETTE.primary.green.main};
  color: #FFFFFF;
  ${h5Bold}
  border-radius: 4px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.PALETTE.primary.green.dark};
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

S.UpdateBox = styled.div`
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  width: 650px;
  height: 52px;
  border-radius: 8px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  color: #999999;
`;


export default S;