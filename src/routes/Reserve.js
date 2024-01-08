import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "./Reserve.css";

function Reserve() {
	const userObj = JSON.parse(localStorage.getItem("userObj"));
	const userId = userObj.userId;

	const [major, setMajor] = useState("시각디자인학과");

	const [lockerinfo, setLockerInfo] = useState([
		{
			locker: {
				endReservationTime: "2024-01-06T12:35:27.809Z",
				lockerName: "",
				permitStates: ["ATTEND"],
				permitTiers: ["APPLICANT"],
				startReservationTime: "2024-01-06T12:35:27.809Z",
				totalColumn: "10",
				totalRow: "6",
			},
			lockerDetail: [
				{
					column_num: "string",
					lockerDetailStatus: "BROKEN",
					locker_num: "string",
					row_num: "string",
				},
			],
		},
	]);
	const [lockerNameInfo, setLockserNameInfo] = useState(["센터 b107사물함", "충 204사물함"]);
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
								}}>
								{major}
							</p>
							{lockerNameInfo.map(function (info, i) {
								return (
									<p
										className="lockerName"
										style={{
											color: showLocker === i ? "#2B3674" : "#C9D2EB",
											userSelect: "none",
										}}
										onClick={() => {
											setShowLocker(i);
										}}>
										{info}
									</p>
								);
							})}
						</div>
						{/* 사물함 배치 및 예약  */}
						<div className="lockerBoxDiv">
							{[...Array(showCol)].map(function (info, col) {
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
							})}
						</div>
					</div>
				</div>
			</ContentContainer>
		</MyPageStyled>
	);
}

export default Reserve;

function ModalAlert(props) {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
			<Modal.Header closeButton>
				<Modal.Title>Modal title</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				I will not close if you click outside me. Do not even try to press escape key.
			</Modal.Body>
			<Modal.Footer>
				<button variant="secondary" onClick={handleClose}>
					Close
				</button>
				<button variant="primary">Understood</button>
			</Modal.Footer>
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
`;
