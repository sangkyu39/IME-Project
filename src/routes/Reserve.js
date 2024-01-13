/* eslint-disable react-hooks/exhaustive-deps */
import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "./Reserve.css";
import alert from "../assets/alert-circle.svg";
import axios from "axios";

function Reserve() {
	const userObj = JSON.parse(localStorage.getItem("userObj"));
	const lockerURL = `http://54.180.70.111:8081/api/v2/users/${userObj.userId}/majors/lockers`;

	const [major, setMajor] = useState(localStorage.getItem("major"));
	const [lockerInfo, setLockerInfo] = useState();
	const [lockerName, setLockerName] = useState();
	const [changeLockerModal, setChangeLockerModal] = useState(false);
	const [alertReserveModal, setAlertReserveModal] = useState(false);
	const [prevReserveModal, setPrevReserveModal] = useState(false);

	async function getLockerInfo() {
		await axios
			.get(lockerURL, {
				headers: {
					AccessToken: userObj.accessToken,
				},
			})
			.then((res) => {
				console.log(res);
				setLockerInfo(res.data.result.lokerInfo);
				console.log(lockerInfo);
				// locker 정보가 있는 경우에만 위치 목록 생성
				if (lockerInfo) {
					let copyLockerName = lockerInfo.map((i) => i.name);
					setLockerName(copyLockerName);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	useEffect(() => {
		getLockerInfo();
	}, []);

	// 보여지는 locker index 변경
	function changeShowLocker(e) {
		setShowLocker(e);
		setShowCol(e);
		setShowRow(e);
	}
	const [showLocker, setShowLocker] = useState(0);
	const [showCol, setShowCol] = useState(10);
	const [showRow, setShowRow] = useState(5);

	return (
		<MyPageStyled>
			<Sidebar />
			<ContentContainer id="reservePage">
				<div
					style={{
						marginLeft: "2.5rem",
					}}>
					<p className="title">사물함 예약</p>
					<div className="reserveDiv">
						{/* 학과 및 사물함 이름  */}
						<div
							style={{
								marginBottom: "3rem",
							}}>
							<p
								style={{
									color: "var(--primary-400, #ED335D)",
									fontFamily: "Pretendard",
									fontSize: "1.5rem",
									fontStyle: "normal",
									fontWeight: "700",
									letterSpacing: "-0.03rem",
									display: "inline",
									marginLeft: "1.5rem",
								}}
								onClick={() => {
									console.log("!!");
									setChangeLockerModal(true);
									setAlertReserveModal(true); //
									setPrevReserveModal(true);
								}}>
								{major}
							</p>
							{/* 사물함 이름 리스트 출력 */}
							{lockerInfo ? (
								lockerName.map(function (info, i) {
									return (
										<div>
											<p
												className="lockerName"
												style={{
													color: showLocker === i ? "#2B3674" : "#C9D2EB",
													userSelect: "none",
												}}
												onClick={() => {
													changeShowLocker(i);
												}}>
												{info}
											</p>
											<img src={alert} alt="alert" />
										</div>
									);
								})
							) : (
								<></>
							)}
						</div>
						{/* 사물함 배치 및 예약  */}
						<div className="lockerBoxDiv">
							{lockerInfo ? (
								[...Array(showCol)].map(function (info, col) {
									return (
										<div>
											{[...Array(showRow)].map(function (info, row) {
												return (
													<div className="lockerBox">
														<span className="lockerBoxNum">
															{col}
															{row}
														</span>
													</div>
												);
											})}
										</div>
									);
								})
							) : (
								<div
									style={{
										display: "flex",
										height: "40rem",
										/* title4 */
										fontFamily: "Pretendard",
										fontSize: "1.125rem",
										fontWeight: "800",
										lineHeight: "normal",
										textAlign: "center",
										alignItems: "center",
										justifyContent: "center",
									}}>
									<p style={{ color: "var(--grayscale-600, #2b3674)" }}>사물함 정보가 없습니다.</p>
								</div>
							)}
						</div>
						<ChangeLockerModal
							setChangeLockerModal={setChangeLockerModal}
							changeLockerModal={changeLockerModal}></ChangeLockerModal>
						<AlertReserveModal
							setAlertReserveModal={setAlertReserveModal}
							alertReserveModal={alertReserveModal}></AlertReserveModal>
						<PrevReserveModal
							setPrevReserveModal={setPrevReserveModal}
							prevReserveModal={prevReserveModal}></PrevReserveModal>
					</div>
				</div>
			</ContentContainer>
		</MyPageStyled>
	);
}

export default Reserve;

function ChangeLockerModal(props) {
	const handleClose = () => props.setChangeLockerModal(false);

	return (
		<Modal
			show={props.changeLockerModal}
			onHide={handleClose}
			backdrop="static"
			keyboard={false}
			centered>
			<Modal.Body>
				<p className="modalTitle">
					{} 사물함 {}번으로 변경하시겠어요?
				</p>
				<p className="modalDetail">기존의 사물함 예약 내역은 사라져요</p>
				<div className="">
					<button className="modalWhiteBTN" onClick={handleClose}>
						취소
					</button>
					<button className="modalRedBTN" style={{ width: "11.875rem" }}>
						변경할게요
					</button>
				</div>
			</Modal.Body>
		</Modal>
	);
}

function AlertReserveModal(props) {
	const handleClose = () => props.setAlertReserveModal(false);

	return (
		<Modal
			show={props.alertReserveModal}
			onHide={handleClose}
			backdrop="static"
			keyboard={false}
			centered>
			<Modal.Body>
				<p className="modalTitle">
					{} 사물함 {}번 예약이 완료되었어요.
				</p>
				<p className="modalDetail">언제든 남아있는 사물함으로 변경이 가능해요.</p>
				<button
					variant="secondary"
					onClick={handleClose}
					className="modalRedBTN"
					style={{ width: "25rem" }}>
					확인
				</button>
			</Modal.Body>
		</Modal>
	);
}

function PrevReserveModal(props) {
	const handleClose = () => props.setPrevReserveModal(false);

	return (
		<Modal
			show={props.prevReserveModal}
			onHide={handleClose}
			backdrop="static"
			keyboard={false}
			centered>
			<Modal.Body>
				<p className="modalTitle">이미 예약된 사물함이에요.</p>
				<p className="modalDetail">다른 사물함을 선택해주세요</p>
				<button
					variant="secondary"
					onClick={handleClose}
					className="modalRedBTN"
					style={{ width: "25rem" }}>
					확인
				</button>
			</Modal.Body>
		</Modal>
	);
}

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
	padding-bottom: 5rem;
`;
