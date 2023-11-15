import * as React from "react";

const navStyle = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "0.001px solid rgb(216, 216, 216)",
    background: "white",
    padding: "13px",
  },
  navmenu: {
    display: "flex",
    fontSize: "20px",
    listStyle: "none",
    paddingLeft: "0",
    marginRight: "10%",
    paddingInlineStart: "40px",
  },
  navlist: {
    display: "list-item",
    fontSize: "19px",
    padding: "8px 16px",
    cursor: "pointer",
    textAlign: "-webkit-match-parent",
  },
};

const linkStyle = {
  textDecoration: "none",
  color: "black",
};

function ResponsiveAppBar() {
  const imageUrl = "https://i.imgur.com/CtgSNru.png";

  return (
    <div>
      <nav style={navStyle.nav}>
        <div style={{ display: "block", marginLeft: "10%" }}>
          <a href="/">
            <img
              src={imageUrl}
              alt="로컬 이미지"
              style={{
                width: 110,
                height: 110,
              }}
            />
          </a>
        </div>

        <ul style={navStyle.navmenu}>
          <li style={navStyle.navlist}>
            <a
              //href="https://forms.gle/f2vUqVg9wQFneBLf7"
              target="_blank"
              style={linkStyle}
            >
              피드백하기
            </a>
          </li>

          <li style={navStyle.navlist}>
            <a href="/reserve/" style={linkStyle}>
              예약하기
            </a>
          </li>

          <li style={navStyle.navlist}>
            <a href="/main/" style={linkStyle}>
              마이페이지
            </a>
          </li>

          <li style={navStyle.navlist}>
            <a href="/login/" style={linkStyle}>
              로그인
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default ResponsiveAppBar;
