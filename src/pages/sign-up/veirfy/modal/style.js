import styled from 'styled-components';
const S = {};

S.ModalLayOut = styled.div`
  width: 640px;
  height: 720px;
  background-color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 크기 상관없이 중앙 정렬 */
  border-radius: 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
`

S.ModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 90%;
`

S.ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: center;
  padding-top: 20px;
`

S.CancelButton = styled.button`
  flex: 1;
  height: 66px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  
  &:hover {
    background-color: #f5f5f5;
  }
`

S.CompleteButton = styled.button`
  flex: 1;
  height: 66px;
  border: none;
  border-radius: 4px;
  background-color: ${({ theme, disabled }) => 
    disabled ? '#ccc' : theme.PALETTE.primary.green.main};
  color: #fff;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  font-size: 16px;
  font-weight: 500;
  
  &:hover {
    opacity: ${({ disabled }) => disabled ? 1 : 0.9};
  }
`

S.Input = styled.input`
  width: 100%;
  height: 66px;
  border: 1px solid gray;
  border-radius: 10px;
  padding-left: 12px;
  padding-right: 12px;
  box-sizing: border-box;
`
S.InputWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: baseline;
  gap: 12px;
`
S.InputLayout = styled.div`
  /* width: 640px; */
  width: 100%;
  /* height: 80%; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`
S.VerifyButton = styled.div`
  width: 100%;
  height: 66px;
  border-radius: 4px;
  background-color: ${({ theme, disabled }) => 
    disabled ? '#ccc' : theme.PALETTE.secondary.blue.main};
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  
  &:hover {
    opacity: ${({ disabled }) => disabled ? 1 : 0.9};
  }
`

S.PhoneLabelWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

S.TimerText = styled.div`
  color: ${({ theme }) => theme.PALETTE.primary.green.main};
  font-weight: bold;
  font-size: 16px;
`

S.ErrorText = styled.div`
  color: red;
  font-size: 12px;
  margin-top: -8px;
`

S.SuccessText = styled.div`
  color: ${({ theme }) => theme.PALETTE.primary.green.main};
  font-size: 14px;
  font-weight: 500;
`

export default S;