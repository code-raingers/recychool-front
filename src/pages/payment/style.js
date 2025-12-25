import styled from "styled-components";
import * as C from "../../styles/common";

const S = {};

/* =============================
 * Page / Layout
 * ============================= */
S.Page = styled.div`
  width: 100%;
`;

S.Grid = styled.div`
  width: 1160px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  gap: 160px;
  box-sizing: border-box;
`;

S.Left = styled.section`
  width: 560px;
  flex: 0 0 560px;
`;

S.Right = styled.aside`
  width: 440px;
  flex: 0 0 440px;
`;

/* =============================
 * Left Sections
 * ============================= */
S.LeftWrap = styled.div`
  padding-top: 40px;
`;

S.Block = styled.section`
  margin-bottom: 64px;
`;

S.BlockTitle = styled.h2`
  margin: 0 0 14px;
  font-size: 22px;
  font-weight: 800;
  color: #111;
`;

S.BlockLine = styled.div`
  height: 1px;
  background: #e9e9e9;
`;

/* 이용자 정보 */
S.InfoGrid = styled.div`
  margin-top: 26px;
  display: grid;
  grid-template-columns: 120px 1fr;
  row-gap: 22px;
  align-items: center;
`;

S.InfoLabel = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #111;
`;

S.InfoValue = styled.div`
  font-size: 15px;
  color: #666;
`;

/* =============================
 * 결제 방법 선택
 * ============================= */
S.PayList = styled.div`
  margin-top: 26px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

S.PayRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;
  cursor: pointer;
`;

S.PayLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

S.PayIcon = styled.div`
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  flex: 0 0 36px;
`;

S.PayIconImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
`;

S.PayText = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #111;
`;

/* 라디오 */
S.RadioOuter = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 999px;
  border: 2px solid ${(p) => (p.$checked ? "#111" : "#c9c9c9")};
  display: grid;
  place-items: center;
  box-sizing: border-box;
`;

S.RadioInner = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: ${(p) => (p.$checked ? "#111" : "transparent")};
`;

/* =============================
 * 환불 규정
 * ============================= */
S.RefundGrid = styled.div`
  margin-top: 26px;
  display: grid;
  grid-template-columns: 120px 1fr;
  row-gap: 18px;
  align-items: center;
`;

S.RefundLeft = styled.div`
  font-size: 15px;
  font-weight: 800;
  color: #111;
`;

S.RefundRight = styled.div`
  font-size: 15px;
  color: #666;
`;

/* =============================
 * Right Summary Card
 * ============================= */
S.SummarySticky = styled.div`
  padding-top: 40px;
  position: sticky;
  top: 24px;
`;

S.SummaryCard = styled.div`
  border: 1px solid #dcdcdc;
  border-radius: 24px;
  padding: 36px 32px;
  background: #fff;
  box-sizing: border-box;
`;

S.SummaryTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 26px;
  font-weight: 900;
  color: #111;
`;

S.SummaryLine = styled.div`
  height: 1px;
  background: #e9e9e9;
  margin-bottom: 24px;
`;

S.SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  row-gap: 20px;
  column-gap: 18px;
`;

S.SummaryKey = styled.div`
  font-size: 15px;
  font-weight: 800;
  color: #111;
  line-height: 1.4;
`;

S.SummaryVal = styled.div`
  font-size: 15px;
  color: #666;
  text-align: right;
  line-height: 1.4;
`;

S.SummaryValPrice = styled.div`
  ${C.h4Bold}
  color: ${({ theme }) => theme.PALETTE.secondary.pink.main};
  text-align: right;
`;

S.PayButton = styled.button`
  width: 100%;
  height: 60px;
  margin-top: 36px;
  border: none;
  border-radius: 12px;
  background: ${({ theme }) => theme.PALETTE.primary.green.main};
  color: #fff;
  font-size: 18px;
  font-weight: 800;
  cursor: pointer;
`;

/* =============================
 * CompleteConfirm
 * ============================= */
S.CompleteWrap = styled.div`
  width: 920px;
  margin: 0 auto;
  padding: 110px 0 140px;
  box-sizing: border-box;
`;

S.CompleteCard = styled.section`
  width: 100%;
`;

S.CompleteTitle = styled.h1`
  margin: 0;
  text-align: center;
  ${C.h3Medium}
  color: #111;
`;

S.CompleteDivider = styled.div`
  margin-top: 20px;
  height: 1px;
  background: rgba(0, 0, 0, 0.55);
`;

S.CompleteTable = styled.div`
  width: 100%;
`;

S.CompleteRow = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
  min-height: 64px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`;

S.CompleteTh = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  font-size: 16px;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.75);
  background: rgba(0, 0, 0, 0.04);
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

S.CompleteTd = styled.div`
  display: flex;
  align-items: center;
  padding: 0 28px;
  font-size: 18px;
  font-weight: 600;
  color: #111;
`;

S.CompleteButtonRow = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: center;
  gap: 48px;
`;

S.CompletePrimaryButton = styled.button`
  width: 360px;
  height: 56px;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 800;
  cursor: pointer;
  background: ${({ theme }) => theme.PALETTE.primary.green.main};
  color: #fff;
`;

S.CompleteSecondaryButton = styled.button`
  width: 360px;
  height: 56px;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  background: #effbea;
  color: rgba(0, 0, 0, 0.75);
`;

export default S;
