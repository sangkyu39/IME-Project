import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import InfoImg from "../assets/MyInfo.png";
import React, { useState, useEffect } from "react";
import axios from "axios";

function MyPage() {
	const [userId, setUserId] = useState("");
	const [userName, setUserName] = useState("");
	const [majorDetail, setMajorDetail] = useState("");
	const [studentNum, setStudentNum] = useState("");
	const [reservedLockerName, setReservedLockerName] = useState("");
	const [reservedLockerNum, setReservedLockerNum] = useState("");
	const [time, setTime] = useState("");

	useEffect(() => {
		const storedUserObj = localStorage.getItem("userObj");

		if (storedUserObj) {
			const parsedUserObj = JSON.parse(storedUserObj);
			setUserId(parsedUserObj.userId);

			axios
				.get(`http://54.180.70.111:8083/api/v2/users/${parsedUserObj.userId}`, {
					headers: {
						accessToken: parsedUserObj.accessToken,
					},
				})
				.then((response) => {
					console.log("Axios response:", response);

					const data = response.data;
					if (data.result.userName) {
						setUserName(data.result.userName);
						setMajorDetail(data.result.majorDetail);
						localStorage.setItem("major", data.result.majorDetail);
						setStudentNum(data.result.studentNum);
						setReservedLockerName(data.result.reservedLockerName);
						setReservedLockerNum(data.result.reservedLockerNum);
						setTime(data.time);
						console.log("UserName from Axios GET request:", data.result.userName, data.time);
					} else {
						console.error("Invalid data structure in Axios GET response:", data);
					}
				})
				.catch((error) => {
					console.error("Error during Axios GET request:", error);
				});
		}
	}, []);

	return (
		<MyPageStyled>
			<Sidebar />
			<ContentContainer>
				<PageText>마이페이지</PageText>
				<DivStyled>
					<InfoBox>
						<InfoText>
							내 정보
							<div
								style={{
									marginTop: "5px",
									display: "flex",
									justifyContent: "space-between",
								}}>
								<InfoImage src={InfoImg} alt="내 정보 이미지" />
								<div style={{ width: "60%" }}>
									<Info>
										이름<h2>{userName}</h2>
									</Info>
									<Info>
										학과<h2>{majorDetail}</h2>
									</Info>
									<Info>
										학번<h2>{studentNum}</h2>
									</Info>
									<Info>
										학생회비
										<h2 style={{ color: "var(--primary-300, #F16686)" }}>납부</h2>
									</Info>
								</div>
							</div>
						</InfoText>
					</InfoBox>
					<InfoBox>
						<InfoText>
							사물함 정보
							<div
								style={{
									marginTop: "35px",
									display: "flex",
									justifyContent: "space-between",
									flexDirection: "column",
								}}>
								<Info>
									위치<h2>센터 b107 사물함{reservedLockerName}</h2>
								</Info>
								<Info>
									번호<h2>55{reservedLockerNum}</h2>
								</Info>
								<Info>
									사용기간<h2>{time}</h2>
								</Info>
							</div>
						</InfoText>
					</InfoBox>
				</DivStyled>
				<DivStyled>
					<InfoBoxWithButton>
						<InfoText>학생회비 납부</InfoText>
						<InfoButton
							style={{
								height: "60px",
								width: "169px",
								display: "inline-flex",
								justifyContent: "center",
								alignItems: "center",
								borderRadius: "20px",
								background: "var(--primary-50, #FDE6EB)",
								color: "var(--primary-500, #E80035)",
								fontFamily: "Pretendard",
								fontWeight: "700",
							}}>
							납부 확인 요청
						</InfoButton>
						<div style={{ marginBottom: "20%", marginLeft: "8%" }}>
							<h1>카카오뱅크 3333-11-1788841 (조예린)</h1>
							<p>
								학생회비를 납부하셨다면 ‘납부 확인 요청'을 눌러주세요. <br />
								요청 건에 대하여 확인 후 승인됩니다.
							</p>
						</div>
					</InfoBoxWithButton>
					<InfoBox style={{ background: "var(--background, #f4f7fe)" }}></InfoBox>
				</DivStyled>
			</ContentContainer>
		</MyPageStyled>
	);
}

export default MyPage;

const MyPageStyled = styled.div`
	background: var(--background, #f4f7fe);
	display: flex;
	width: 100%;
`;

const ContentContainer = styled.div`
	padding-right: 2.5rem;
	display: flex;
	flex-direction: column;
	background: var(--background, #f4f7fe);
`;

const PageText = styled.div`
	@font-face {
		font-family: "Pretendard-Regular";
		src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
			format("woff");
		font-weight: 400;
		font-style: normal;
	}
	color: var(--grayscale-600, #2b3674);
	font-family: Pretendard-Regular;
	font-size: 34px;
	font-style: normal;
	font-weight: 700;
	line-height: 42px;
	letter-spacing: -0.68px;
	padding: 40px;
	height: 130px;
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;

const DivStyled = styled.div`
	height: 35vh;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 5%;
	margin-left: 15%;
	margin-bottom: 7%;
`;

const InfoBox = styled.div`
	width: 480px;
	height: 280px;
	flex-shrink: 0;
	border-radius: 20px;
	background: var(--white, #fff);
`;

const InfoText = styled.div`
	color: var(--primary-400, #ed335d);
	font-family: Pretendard;
	font-size: 24px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	letter-spacing: -0.48px;
	padding: 40px;
`;

const Info = styled.div`
	display: flex;
	align-items: center;
	color: var(--grayscale-400, #7883a6);
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	letter-spacing: -0.32px;

	h2 {
		color: var(--grayscale-600, #2b3674);
		font-family: Pretendard;
		font-size: 16px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
		letter-spacing: -0.32px;
		text-align: center;
		margin-top: 7px;
		margin-left: 50px;
	}
`;

const InfoImage = styled.img`
	width: 120px;
	height: 120px;
	border-radius: 50%;
	border: 2px solid var(--primary-200, #f699ae);
	background: var(--primary-50, #fde6eb);
	mix-blend-mode: multiply;
	margin-top: 18px;
`;

const InfoBoxWithButton = styled(InfoBox)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
	h1 {
		color: var(--grayscale-600, #2b3674);
		font-family: Pretendard;
		font-size: 18px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
	}
	p {
		color: var(--grayscale-300, #a3aed0);
		font-family: Pretendard;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		line-height: 20px; /* 142.857% */
		letter-spacing: -0.28px;
	}
`;

const InfoButton = styled.button`
	padding: 10px;
	background-color: var(--primary-400, #ed335d);
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	position: absolute;
	top: 10%;
	right: 10%;
`;

InfoButton.displayName = "InfoButton";
