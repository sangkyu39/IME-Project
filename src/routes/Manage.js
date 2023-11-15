import Nav from "../components/Nav";
import Footer from "../components/Footer";

function Manage() {
  const containerStyle = {
    marginLeft: "5%",
    marginRight: "5%",
    paddingRight: "15px",
    paddingLeft: "15px",
    border: "1px solid #ccc",
    width: "20vw",
    height: "50vh",
    backgroundColor: "#f5f5f5", // 2. 배경색 변경
  };

  const row = {
    marginLeft: "-25px",
    marginRight: "-15px",
  };

  const headerStyle = {
    fontSize: "16px",
    fontWeight: "bold",
  };

  const navHeaderStyle = {
    fontSize: "19px",
    marginTop: "5%",
    marginBottom: "10%",
    listStyleType: "none",
  };

  const navLinkStyle = {
    textDecoration: "none",
    color: "black",
  };

  const listStyle = {
    listStyleType: "none",
    marginBottom: "20%",
  };

  const hrStyle = {
    borderTop: "1px solid #ccc",
    margin: "30px 0",
    width: "90%",
  };

  return (
    <div>
      <Nav />
      <div style={containerStyle}>
        <div style={row}>
          <div className="col-md-3">
            <div className="well sidebar-nav">
              <ul className="nav nav-list">
                <li className="nav-header" style={navHeaderStyle}>
                  관리자 메뉴
                </li>
                <hr style={hrStyle} />
                <li style={listStyle}>
                  <a
                    href="/index.php/judge/contestproblemlist/1874/20470"
                    style={navLinkStyle}
                  >
                    사물함 만들기
                  </a>
                </li>
                <li style={listStyle}>
                  <a
                    href="/index.php/judge/contestproblemlist/1874/20470"
                    style={navLinkStyle}
                  >
                    학생 관리
                  </a>
                </li>
                <li style={listStyle}>
                  <a
                    href="/index.php/judge/contestproblemlist/1874/20470"
                    style={navLinkStyle}
                  >
                    사물함 관리
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Manage;
