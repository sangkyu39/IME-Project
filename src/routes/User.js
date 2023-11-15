import React, { useEffect, useState } from 'react';

function User() {
  const [users, setUsers] = useState([]);
  const [modifiedUsers, setModifiedUsers] = useState({});
  const [selectedLockerNumbers, setSelectedLockerNumbers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    // 여기에 사용자 정보를 가져오는 AJAX 요청을 수행하세요.
    // 예를 들어, fetchUsers 함수 내에서 fetch()를 사용하여 서버에서 데이터를 가져올 수 있습니다.
    // 가져온 데이터는 setUsers를 사용하여 users 상태에 설정해야 합니다.
  };

  const handleValueChange = (userId, type, value) => {
    // 사용자 정보가 수정될 때 호출될 함수입니다.
    // 수정된 정보를 modifiedUsers 상태에 업데이트합니다.
    const updatedModifiedUsers = { ...modifiedUsers };
    const updatedUser = { ...updatedModifiedUsers[userId] };

    if (type === 'locker') {
      if (value === '') {
        // 선택된 사물함이 없는 경우
        if (updatedUser && updatedUser.lockerNumber) {
          // 이전에 선택한 사물함이 있었다면 제거
          const indexToRemove = selectedLockerNumbers.indexOf(updatedUser.lockerNumber);
          if (indexToRemove !== -1) {
            selectedLockerNumbers.splice(indexToRemove, 1);
          }
        }
        updatedUser.lockerNumber = '';
      } else if (!selectedLockerNumbers.includes(value)) {
        // 선택한 사물함이 중복되지 않는 경우
        if (updatedUser && updatedUser.lockerNumber) {
          // 이전에 선택한 사물함이 있었다면 제거
          const indexToRemove = selectedLockerNumbers.indexOf(updatedUser.lockerNumber);
          if (indexToRemove !== -1) {
            selectedLockerNumbers.splice(indexToRemove, 1);
          }
        }
        selectedLockerNumbers.push(value);
        updatedUser.lockerNumber = value;
      } else {
        // 선택한 사물함이 중복된 경우
        alert('사물함 중복선택입니다. 다시 확인해주세요.');
        updatedUser.lockerNumber = '';
      }
    } else {
      // 다른 유형의 값 변경 (예: role, membership 등)
      updatedUser[type] = value;
    }

    updatedModifiedUsers[userId] = updatedUser;
    setModifiedUsers(updatedModifiedUsers);
  };

  const handleSaveChanges = () => {
    if (Object.keys(modifiedUsers).length === 0) {
      alert('수정된 정보가 없습니다.');
      return;
    }

    const modifiedUsersInfo = Object.keys(modifiedUsers).map((userId) => ({
      studentNum: userId,
      ...modifiedUsers[userId],
    }));

    // 여기에 수정된 사용자 정보를 서버로 보내는 AJAX 요청을 수행하세요.
    // 서버에서는 받은 정보를 처리하고 응답을 반환해야 합니다.

    alert(JSON.stringify(modifiedUsersInfo)); // 임시 확인용
  };

  return (
    <div>
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Student ID</th>
            <th>Role</th>
            <th>Membership</th>
            <th>Reserved Locker</th>
            <th>Left Locker</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.studentNum}>
              <td>{user.userName}</td>
              <td>{user.studentNum}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleValueChange(user.studentNum, 'role', e.target.value)}
                >
                  {/* 여기에 role 옵션들을 매핑하십시오. */}
                </select>
              </td>
              <td>
                <select
                  value={user.membership}
                  onChange={(e) => handleValueChange(user.studentNum, 'membership', e.target.value)}
                >
                  {/* 여기에 membership 옵션들을 매핑하십시오. */}
                </select>
              </td>
              <td>
                {user.lockerNum}
                <select
                  value={user.lockerNum}
                  onChange={(e) => handleValueChange(user.studentNum, 'locker', e.target.value)}
                >
                  <option value="">-- Select --</option>
                  {/* 여기에 lockerNum 옵션들을 매핑하십시오. */}
                </select>
              </td>
              <td>{/* 여기에 Left Locker 정보를 표시하십시오. */}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary my-4" onClick={handleSaveChanges}>
        Save Changes
        </button>
    </div>
  );
}

export default User;
