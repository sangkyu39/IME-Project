import React, { useState, useEffect } from "react";
import "./Login.css";
import logoTitle from "../assets/LogoTitle.svg";
import axios from "axios";
import { AlternateEmail } from "@mui/icons-material";

function Login() {
	const [studentId, setStudentId] = useState("");
	const [password, setPassword] = useState("");
	const [isCorrect, setIsCorrect] = useState(true);
	const loginURL = "http://54.180.70.111:8081/api/v2/auth/login";
	const onChange = (e) => {
		const {
			target: { name, value },
		} = e;
		if (name === "studentId") setStudentId(value);
		else if (name === "password") setPassword(value);
	};

	const forgetPW = () => {
		alert("비밀번호를 잊어버렸군요! 아쉽게된거죠");
	};

	const login = (e) => {
		e.preventDefault();
		if (!studentId || !password) {
			setIsCorrect(false);
			return;
		} else {
			let body = {
				id: studentId,
				pw: password,
			};
			console.log(body);
			fetch(loginURL, {
				method: "POST",
				body: body,
			}).then((res) => {
				console.log(res);
			});
			axios.post(loginURL, body).then((res) => {
				console.log(res.status);
			});
		}
	};
	return (
		<div
			style={{
				display: "flex",
				minHeight: "100vh",
				backgroundColor: "#f4f7fe",
				textAlign: "center",
				alignItems: "center",
				justifyContent: "center",
			}}>
			<div className="loginBox">
				{/* 로고 */}
				<img style={{ margin: "5rem 0 3rem 0" }} src={logoTitle} alt="logo" />
				{/*학번*/}
				<input
					name="studentId"
					type="text"
					placeholder="학번 (ID No.)"
					required
					value={studentId}
					onChange={onChange}
				/>{" "}
				<br />
				{/*비밀번호*/}
				<input
					name="password"
					type="password"
					placeholder="비밀번호 (Password)"
					required
					value={password}
					onChange={onChange}
				/>{" "}
				<br />
				<p className="forgetPW" onClick={forgetPW}>
					비밀번호를 잊으셨나요?
				</p>
				<button onClick={login}>Sign In</button>
				{isCorrect ? (
					<></>
				) : (
					<p className="noneCorrect">학번 또는 비밀번호가 맞지 않습니다. 다시 확인해주세요</p>
				)}
			</div>
		</div>
	);
}

export default Login;
