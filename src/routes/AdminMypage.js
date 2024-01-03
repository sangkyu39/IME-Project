import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import "./AdminMypage.css";

import search from "../assets/search.svg";
import downloadCoud from "../assets/download-cloud.svg";
import download from "../assets/download.svg";
import uploadCloud from "../assets/upload-cloud.svg";

function AdminMypage() {
	const [major, setMajor] = useState("시각디자인학과");
	const [studentInfo, setStudentInfo] = useState([
		{ name: "조예린", id: "19011722", num: "12", state: "재학", pay: true, admin: false },
		{ name: "조예린", id: "19011722", num: "12", state: "재학", pay: false, admin: true },
		{ name: "조예린", id: "19011722", num: "12", state: "재학", pay: true, admin: false },
		{ name: "조예린", id: "19011722", num: "12", state: "재학", pay: true, admin: true },
		{ name: "조예린", id: "19011722", num: "12", state: "재학", pay: true, admin: false },
	]);
	return (
		<MyPageStyled>
			<Sidebar />
			<ContentContainer id="adminMypage">
				<div
					style={{
						margin: "auto",
					}}>
					<p className="title">마이페이지</p>
					<div className="infoDiv">
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
							{major} 학생 관리
						</p>
						<button className="saveBTN">저장하기</button>
						<div
							style={{
								marginTop: "3rem",
								marginBottom: "1rem",
							}}>
							<div class="search-input">
								<input type="text" placeholder="학생 검색" />
								<img class="search-icon" src={search} alt="돋보기 아이콘" />
							</div>
							<div className="dataload">
								<img src={uploadCloud} alt="uploadCloud" />
								<span>데이터 내보내기</span>
							</div>
							<div className="dataload">
								<img src={downloadCoud} alt="downloadCloud" />
								<span>데이터 가져오기</span>
							</div>
							<div className="dataload">
								<img src={download} alt="download" />
								<span>양식 다운받기</span>
							</div>
						</div>
						<table className="infoTable">
							{/* 목록 */}
							<th>이름</th>
							<th>학번</th>
							<th>사물함 번호</th>
							<th>상태</th>
							<th>학생회비 납부</th>
							<th>관리자 여부</th>
							{/* 내용 */}
							{studentInfo ? (
								studentInfo.map(function (info, i) {
									return (
										<tr>
											<td>{info.name}</td>
											<td>{info.id}</td>
											<td>{info.num}</td>
											<td>{info.state}</td>
											<td>{info.pay ? "O" : "X"}</td>
											<td>{info.admin ? "O" : "X"}</td>
										</tr>
									);
								})
							) : (
								<></>
							)}
						</table>
						{studentInfo ? (
							<></>
						) : (
							<div className="noneInfo">
								<p>학생 정보가 없습니다.</p> <br />
								<p>상단의 '양식 다운로드'에서 학생 정보를 입력 후, '양식 업로드'를 해주세요</p>
							</div>
						)}
					</div>
				</div>
			</ContentContainer>
		</MyPageStyled>
	);
}

export default AdminMypage;

const MyPageStyled = styled.div`
	background: var(--background, #f4f7fe);
	height: 100vh;
	width: 100vw;
	display: flex;
`;

const ContentContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;
