import * as React from "react";

const footerStyle = {
  footer: {
    position: "fixed", // 하단에 고정
    bottom: 0,
    left: 0,
    right: 0, // 너비 100%
    fontSize: "0.7rem",
    background: "#313131",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "gray",
    padding: "2rem",
  },
  list: {
    listStyle: "none",
    color: "lightgrey",
    letterSpacing: "2px",
    borderRight: "0.1px solid lightgray",
    display: "block",
    listStyleType: "none",
    marginBlockStart: "1em",
    marginBlockEnd: "1em",
    marginInlineStart: "0px",
    marginInlineEnd: "0px",
    paddingInlineStart: "40px",
  },
  listItem: {
    display: "list-item",
    margin: "10px 150px 5px",
    textAlign: "center",
    marginLeft: "130px",
  },
  copyright: {
    display: "block",
    textAlign: "center",
    fontSize: "0.7rem",
    color: "grey",
    marginLeft: "150px",
    marginRight: "150px",
    marginBlockStart: "0.83em",
    marginBlockEnd: "0.83em",
    marginInlineStart: "100px",
    marginInlineEnd: "100px",
    fontWeight: "bold",
  },
};

export default function BoxSx() {
  return (
    <div
      style={{
        width: "100vw",
      }}
    >
      <footer style={footerStyle.footer}>
        <ul style={footerStyle.list}>
          <li style={footerStyle.listItem}>- Contact -</li>
          <li style={footerStyle.listItem}>Email: peterjkw@naver.com</li>
          <li style={footerStyle.listItem}>
            GitHub:{" "}
            <a
              href="https://github.com/jaepyo-Lee"
              style={{ color: "lightgrey" }}
              target="_blank"
            >
              https://github.com/jaepyo-Lee
            </a>
          </li>
        </ul>
        <h2 style={footerStyle.copyright}>
          Copyright © 2023 IME Project
          <br />
          이재표, 전경원
        </h2>
      </footer>
    </div>
  );
}
