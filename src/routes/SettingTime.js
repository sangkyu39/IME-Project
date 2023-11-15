import React, { useState } from 'react';
// import './YourCSSFile.css'; // CSS 파일을 임포트하세요.

function SettingTime() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [resultMessage, setResultMessage] = useState('');

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const setReservationTime = () => {
    // 이곳에서 AJAX 호출 및 서버와 통신하는 로직을 작성하세요.
    // 시작 시간과 종료 시간은 startTime 및 endTime 상태 변수에 저장됩니다.

    // 서버로 보낼 데이터
    const requestData = {
      startDateTime: startTime,
      endDateTime: endTime,
    };

    // 예약 시간 설정을 위한 AJAX 요청
    // Replace with the correct endpoint URL for setting reservation time on the server
    fetch('http://ime-locker.shop:8082/admin/api/locker/time', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accessToken': localStorage.getItem('accessToken'),
        'RefreshToken': localStorage.getItem('refreshToken'),
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        // 서버 응답에 대한 처리
        setResultMessage(data.message);
      })
      .catch((error) => {
        // 오류 처리
        console.error('Error:', error);
        setResultMessage('Error occurred. Please try again later.');
      });
  };

  const confirmReset = () => {
    if (window.confirm('사물함 정보를 초기화합니다. 초기화 하시겠습니까?')) {
      resetForm();
    }
  };

  const resetForm = () => {
    // 이곳에서 AJAX 호출 및 서버와 통신하여 사물함 정보를 초기화하는 로직을 작성하세요.

    // AJAX 요청
    // Replace with the correct endpoint URL for resetting locker information on the server
    fetch('http://ime-locker.shop:8082/admin/api/resevation/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accessToken': localStorage.getItem('accessToken'),
        'RefreshToken': localStorage.getItem('refreshToken'),
      },
    })
      .then((response) => response.json())
      .then(() => {
        alert('초기화 하였습니다.');
      })
      .catch(() => {
        alert('초기화에 실패하였습니다.');
      });
  };

  return (
    <div className="container">
      <h1 className="mt-5">Reservation Time Settings</h1>
      <form className="mt-3">
        <div className="mb-3">
          <label htmlFor="startTime" className="form-label">
            Start Time:
          </label>
          <input
            type="datetime-local"
            id="startTime"
            name="startTime"
            className="form-control"
            value={startTime}
            onChange={handleStartTimeChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endTime" className="form-label">
            End Time:
          </label>
          <input
            type="datetime-local"
            id="endTime"
            name="endTime"
            className="form-control"
            value={endTime}
            onChange={handleEndTimeChange}
          />
        </div>
        <button type="button" onClick={setReservationTime} className="btn btn-primary">
          Set Reservation Time
        </button>
        <button type="button" onClick={confirmReset} className="btn btn-secondary">
          Reset
        </button>
      </form>
      <div id="result" className="mt-4">
        {resultMessage && <p className="alert alert-success">{resultMessage}</p>}
      </div>
    </div>
  );
}

export default SettingTime;
