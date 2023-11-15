import * as React from "react";
const imageUrl = "https://i.imgur.com/CtgSNru.png";

const landingstyle = {
  back: {
    display: "block",
  },
};

export default function BoxSx() {
  return (
    <div>
      <div style={landingstyle.back}>
        <header>
          {/* <img src={imageUrl} alt="로컬 이미지" /> */}
          <div
            style={{
              paddingTop: "2.5rem",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <button
              style={{
                fontWeight: "bold",
                color: "white",
                fontSize: "1.2rem",
                borderRadius: "3px",
                border: "0",
                backgroundColor: "#313131",
                width: "9rem",
                height: "3.5rem",
                cursor: "pointer",
              }}
              onClick={() => (window.location.href = "/login/")}
            >
              예약하기
            </button>
          </div>
        </header>
      </div>
    </div>
  );
}
