import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import "./MyPage.css";

function MyPage() {
  const [userInfo, setUserInfo] = useState({
    userName: "Loading...",
    userNum: "Loading...",
    membership: "Loading...",
    lockerNum: "Loading...",
  });

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = () => {
    const ack = localStorage.getItem("accessToken");
    const rck = localStorage.getItem("refreshToken");

    // 사용자 정보를 서버에서 가져오는 부분
    fetch("http://ime-locker.shop:8082/api/user/info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        AccessToken: ack,
        RefreshToken: rck,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setUserInfo({
            userName: data.result.userName,
            userNum: data.result.userNum,
            membership: data.result.membership ? "납부함" : "미납",
            lockerNum: data.result.lockerNum,
          });
        } else {
          alert("사용자 정보를 가져오는데 실패하였습니다.");
        }
      })
      .catch((error) => {
        alert("관리자에게 문의해주세요.");
      });
  };

  const logout = () => {
    const ack = localStorage.getItem("accessToken");
    const rck = localStorage.getItem("refreshToken");

    // 로그아웃 API를 호출하는 부분
    fetch("http://ime-locker.shop:8082/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accessToken: ack,
        RefreshToken: rck,
      },
    })
      .then((response) => response.json())
      .then(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/"; // 로그아웃 성공 시 login 페이지로 이동
      })
      .catch(() => {
        alert("로그아웃에 실패하였습니다. 관리자에게 문의해주세요.");
      });
  };

  const cancelLocker = () => {
    const ack = localStorage.getItem("accessToken");
    const rck = localStorage.getItem("refreshToken");

    fetch("http://ime-locker.shop:8082/api/reservation", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        accessToken: ack,
        RefreshToken: rck,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          alert("사물함을 취소하였습니다.");
          window.location.reload();
        } else {
          alert("사용자 정보를 가져오는데 실패하였습니다.");
        }
      })
      .catch(() => {
        alert("관리자에게 문의해주세요.");
      });
  };

  const homeIconClick = () => {
    alert("사용자 아이콘을 클릭했습니다!");
  };

  return (
    <div className="body">
      <Nav />

      <div className="page-container">
        <h2>
          마이페이지
          <a id="homeIconLink" href="index.html">
            <i className="fa-solid fa-house"></i>
          </a>
        </h2>
        <p>
          <strong>이름:</strong> {userInfo.userName}
        </p>
        <p>
          <strong>학번:</strong> {userInfo.userNum}
        </p>
        <p>
          <strong>학생회비 납부 여부:</strong> {userInfo.membership}
        </p>
        <p>
          <strong>사물함 번호:</strong>{" "}
          {userInfo.lockerNum !== "X" ? `${userInfo.lockerNum} ` : "X"}
          {userInfo.lockerNum !== "X" && (
            <button
              type="button"
              className="btn btn-secondary"
              id="cancleButton"
              onClick={cancelLocker}
            >
              취소
            </button>
          )}
        </p>
        <button type="button" className="btn btn-danger" onClick={logout}>
          로그아웃
        </button>
      </div>
      <div className="page-container">
        <h2>
          예약정보
          <a id="homeIconLink" href="index.html">
            <i className="fa-solid fa-house"></i>
          </a>
        </h2>
        <p>
          <strong>구역:</strong> {userInfo.userName}
        </p>
        <p>
          <strong>사물함 번호:</strong>{" "}
          {userInfo.lockerNum !== "X" ? `${userInfo.lockerNum} ` : "X"}
          {userInfo.lockerNum !== "X" && (
            <button
              type="button"
              className="btn btn-secondary"
              id="cancleButton"
              onClick={cancelLocker}
            >
              취소
            </button>
          )}
        </p>
        <p>.</p>
        <p>.</p>
        <button type="button" className="btn btn-danger" onClick={logout}>
          로그아웃
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default MyPage;
