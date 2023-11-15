import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const linkStyle = {
  textDecoration: "none", // Remove underline
};

export default function BoxSx() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "78vh",
        width: '100vh',
      }}
    >
      <Link to="/main" style={linkStyle}>
        <Box
          sx={{
            width: 350,
            height: 451,
            backgroundColor: "#F8F8F8",
            border: "1px solid #B9B9B9",
            "&:hover": {
              backgroundColor: "#F8F8F8",
              opacity: [0.9, 0.8, 0.7],
              border: "6px solid #BC0E26",
              cursor: "pointer",
            },
            marginRight: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "#BC0E26",
              fontSize: "40px",
              fontFamily: "Abhaya Libre SemiBold",
              fontWeight: 600,
              marginBottom: 6,
            }}
          >
            사물함 서비스
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#333333",
              fontSize: "15px",
              fontFamily: "Almarai",
              fontWeight: 400,
            }}
          >
            사물함 예약
          </Typography>
        </Box>
      </Link>

      <Link to="/snack" style={linkStyle}>
        <Box
          sx={{
            width: 350,
            height: 451,
            backgroundColor: "#F8F8F8",
            border: "1px solid #B9B9B9",
            "&:hover": {
              backgroundColor: "#F8F8F8",
              opacity: [0.9, 0.8, 0.7],
              border: "6px solid #BC0E26",
              cursor: "pointer",
            },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "#BC0E26",
              fontSize: "40px",
              fontFamily: "Abhaya Libre SemiBold",
              fontWeight: 600,
              marginBottom: 6,
            }}
          >
            간식행사
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#333333",
              fontSize: "15px",
              fontFamily: "Almarai",
              fontWeight: 400,
            }}
          >
            간식행사 선착순 예약
          </Typography>
        </Box>
      </Link>
    </div>
  );
}