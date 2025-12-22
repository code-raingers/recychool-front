import styled from "styled-components";

const S = {};

const GREEN = "#76C043";
const GREEN_LIGHT = "#EAF6DF";
const BORDER = "#D9D9D9";
const BG = "#F5F5F5";

S.Page = styled.div`
  min-height: 100vh;
  background: ${BG};
`;


S.Body = styled.main`
  padding: 70px 16px 90px;
`;

S.CenterWrap = styled.section`
  max-width: 760px;
  margin: 0 auto;
`;

S.Title = styled.h2`
  text-align: center;
  font-size: 22px;
  font-weight: 800;
  margin: 0 0 22px 0;
`;

S.StateText = styled.p`
  text-align: center;
  margin: 18px 0 0;
  color: ${(p) => (p.$error ? "#D64545" : "#666")};
`;

S.InfoTable = styled.table`
  width: 640px;
  max-width: 100%;
  margin: 0 auto;
  border-collapse: collapse;
  background: #fff;
  border-top: 2px solid #777;

  th,
  td {
    border-bottom: 1px solid ${BORDER};
    padding: 14px 18px;
    font-size: 14px;
  }

  th {
    width: 140px;
    background: #f3f3f3;
    font-weight: 700;
    text-align: center;
    color: #444;
  }
`;

S.ButtonRow = styled.div`
  margin-top: 42px;
  display: flex;
  justify-content: center;
  gap: 26px;

  @media (max-width: 520px) {
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }
`;

S.PrimaryButton = styled.button`
  width: 260px;
  height: 52px;
  border: none;
  border-radius: 4px;
  background: ${GREEN};
  color: #fff;
  font-weight: 700;
  cursor: pointer;

  @media (max-width: 520px) {
    width: 100%;
    max-width: 360px;
  }
`;

S.SecondaryButton = styled.button`
  width: 260px;
  height: 52px;
  border: none;
  border-radius: 4px;
  background: ${GREEN_LIGHT};
  color: #2b2b2b;
  font-weight: 700;
  cursor: pointer;

  @media (max-width: 520px) {
    width: 100%;
    max-width: 360px;
  }
`;



export default S;
