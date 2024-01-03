import React, { useState, useEffect } from "react";
import "./Login.css";
import logoTitle from "../assets/LogoTitle.svg";
import axios from "axios";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";

function Login() {
	let navigate = useNavigate();
	const [studentId, setStudentId] = useState("");
	const [password, setPassword] = useState("");
	const [isCorrect, setIsCorrect] = useState(true);
	const loginURL = "";
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
			const formData = {
				id: studentId,
				pw: password,
			};

			// axios.post(loginURL, formData).then((res) => {
			// 	console.log(res.status);
			// });
			navigate("/mypage");
		}
	};
	return (
		<div
			className="loginPage"
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
