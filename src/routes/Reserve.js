import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import "./Reserve.css";

function Reserve() {
	const [major, setMajor] = useState("시각디자인학과");
	const [lockerinfo, setLockerInfo] = useState([
		{
			endReservationTime: "2024-01-05T08:25:22.853Z",
			lockerDetailInfoList: [
				{
					column_num: "1",
					lockerDetailStatus: "NON_RESERVED",
					locker_num: "1",
					row_num: "1",
				},
			],
			lockerName: "센터 b107사물함",
			startReservationTime: "2024-01-05T08:25:22.853Z",
		},
	]);

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
						<div>
							<p
								style={{
									color: "var(--primary-400, #ED335D)",
									fontFamily: "Pretendard",
									fontSize: "1.5rem",
									fontStyle: "normal",
									fontWeight: "700",
									letterSpacing: "-0.03rem",
									display: "inline",
								}}>
								{major}
							</p>
						</div>
						<div></div>
					</div>
				</div>
			</ContentContainer>
		</MyPageStyled>
	);
}

export default Reserve;

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
