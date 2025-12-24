import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // 1. 리덕스 훅 임포트
import S from "./style";
import EditableRow from "./EditableRow";
import Password from "./Password";

const MyPage = () => {
  const [phone, setPhone] = useState("");
  const [editingField, setEditingField] = useState(null);

  // 비밀번호 전용 상태
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const [user, setUser] = useState(null);


  const id = useSelector((state) => state.user.currentUser?.id);

  useEffect(() => {
    const fetchUser = async () => {
      // userId가 아직 로드되지 않았으면 실행하지 않음 (로그인 전이거나 리덕스 로딩 중)
      if (!id) return;

      try {
        // 3. 리덕스에서 가져온 userId를 URL에 주입
        const res = await fetch(`http://localhost:10000/user/${id}`);
        
        if (!res.ok) throw new Error("유저 정보 로딩 실패");

        const data = await res.json();

        setUser(data);
        setPhone(data.userPhone || "");
      } catch (error) {
        console.error("유저 정보를 불러오는 중 에러 발생:", error);
      }
    };

    fetchUser();
  }, [id]); // userId가 변경되거나 로드되면 다시 실행

  // 비밀번호 변경
  const updatePassword = async () => {
    if (!id) return;

    const res = await fetch(`http://localhost:10000/user/${id}/password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentPassword: currentPw,
        newPassword: newPw,
      }),
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(errorMessage || "비밀번호 변경 실패");
    }
  };


  // 전화번호 변경
  const updatePhone = async () => {
    if (!id) return;

    const res = await fetch(`http://localhost:10000/user/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userPhone: phone,
      }),
    });

    if (!res.ok) {
      throw new Error("전화번호 수정 실패");
    }
  };


  // 핸들러
  const handleSubmit = async () => {
    // userId가 없으면(로그인 풀림 등) 진행 불가
    if (!id) {
      alert("로그인 정보가 없습니다.");
      return;
    }

    try {
      // 전화번호 수정 중일 때
      if (editingField === "phone") {
        await updatePhone();
        alert("전화번호가 수정되었습니다.");
        setEditingField(null);
      }

      // 비밀번호 수정일 때
      else if (editingField === "password") {
        if (newPw !== confirmPw) {
          alert("새 비밀번호가 일치하지 않습니다.");
          return;
        }

        await updatePassword(); 
        alert("비밀번호가 변경되었습니다.");

        setCurrentPw("");
        setNewPw("");
        setConfirmPw("");
        setEditingField(null);
      }
    } catch (e) {
      console.error(e);
      // 에러 메시지 분기 처리
      if (editingField === "password") {
        alert(e.message || "현재 비밀번호가 올바르지 않습니다.");
      } else {
        alert("정보 수정 중 오류가 발생했습니다.");
      }
    }
  };


  return (
    <S.All>
      <S.Head>계정관리</S.Head>

      <S.MyPage>
        <S.Title>정보 수정</S.Title>

        <S.Content>
          <S.Row>
            <S.Label>이름</S.Label>
            <S.ReadOnlyBox>{user?.userName}</S.ReadOnlyBox>
          </S.Row>

          <S.Row>
            <S.Label>생년월일</S.Label>
            <S.ReadOnlyBox>
              {user?.userBirthday?.replaceAll("-", ".") || ""}
            </S.ReadOnlyBox>
          </S.Row>

          <S.Row>
            <S.Label>본인 확인 이메일</S.Label>
            <S.ReadOnlyBox>{user?.userEmail}</S.ReadOnlyBox>
          </S.Row>


          {/* 전화번호 */}
          <EditableRow
            fieldKey="phone"
            label="전화번호"
            placeholder="휴대폰 번호 ‘-’ 제외하고 입력"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            editingField={editingField}
            setEditingField={setEditingField}
          />

          {/* 비밀번호 */}
          <Password
            editingField={editingField}
            setEditingField={setEditingField}
            currentPw={currentPw}
            newPw={newPw}
            confirmPw={confirmPw}
            setCurrentPw={setCurrentPw}
            setNewPw={setNewPw}
            setConfirmPw={setConfirmPw}
          />

          <S.SubmitBtn onClick={handleSubmit}>
            완료하기
          </S.SubmitBtn>

        </S.Content>
      </S.MyPage>
    </S.All>
  );
};

export default MyPage;