import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import "./AdminMypage.css";

import search from "../assets/search.svg";
import downloadCoud from "../assets/download-cloud.svg";
import download from "../assets/download.svg";
import uploadCloud from "../assets/upload-cloud.svg";
import downloadCloudGray from "../assets/download-cloud-gray.svg";
import upArrow from "../assets/up_arrow.svg";
import downArrow from "../assets/down_arrow.svg";
import axios from "axios";
import { getSuggestedQuery } from "@testing-library/react";

function AdminMypage() {
	const userObj = JSON.parse(localStorage.getItem("userObj"));
	const studentInfoURL = `http://54.180.70.111:8083/admin/api/v2/majors/${userObj.majorId}/users`;
	const fileUploadURL = `http://54.180.70.111:8083/admin/api/v2/users/${userObj.userId}/file`;
	const [pageNum, setPageNum] = useState(0);
	async function getStudentInfo() {
		await axios
			.get(studentInfoURL, {
				params: {
					majorId: userObj.majorId,
					page: pageNum,
				},
				headers: {
					AccessToken: userObj.accessToken,
				},
			})
			.then((res) => {
				console.log(res);
				setStudentInfo(res.data.result.adminResponse);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	const uploadFile = async (e) => {
		const file = e.target.files[0];

		const formData = {
			membershipFile: file,
		};
		await axios
			.post(fileUploadURL, {
				headers: {
					AccessToken: userObj.accessToken,
				},
				formData,
			})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getStudentInfo();
	}, []);
	const [major, setMajor] = useState(localStorage.getItem("major"));
	const [studentInfo, setStudentInfo] = useState();
	const [asc, setasc] = useState(true);
	const [searchId, setSearchId] = useState("");

	const handleAsc = (e) => {
		if (e === "id") {
			const copyInfo = [...studentInfo].sort((a, b) => {
				if (asc) {
					return a.studentNum.localeCompare(b.studentNum);
				} else {
					return b.studentNum.localeCompare(a.studentNum);
				}
			});
			setStudentInfo(copyInfo);
		} else if (e === "lockerNum") {
			const copyInfo = [...studentInfo].sort((a, b) => {
				if (asc && a.lockerNum) {
					return a.lockerNum.localeCompare(b.lockerNum);
				} else if (a.lockerNum) {
					return b.lockerNum.localeCompare(a.lockerNum);
				}
			});
			setStudentInfo(copyInfo);
		}
	};

	const fileDownload = () => {
		const fileURL = "sample.xlsx";
		const link = document.createElement("a");
		link.href = fileURL;
		link.download = "sample.xlsx";
		link.click();
	};
	return (
		<MyPageStyled>
			<Sidebar />
			<ContentContainer id="adminMypage">
				<div
					style={{
						marginLeft: "2.5rem",
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
							<div className="search-input">
								<input
									type="text"
									placeholder="학생 검색"
									value={searchId}
									onChange={(e) => {
										setSearchId(e.value);
									}}
								/>
								<img className="search-icon" src={search} alt="돋보기 아이콘" />
							</div>
							<div className="dataload">
								{studentInfo ? (
									<>
										<img src={downloadCoud} alt="downloadCloud" />
										<label for="download">데이터 내보내기</label>
										<input id="download" type="file" name="file " accept=".xlsx .csv"></input>
									</>
								) : (
									<>
										<img src={downloadCloudGray} alt="uploadCloudGray" />
										<label
											for="uploadG"
											style={{
												color: "var(--grayscale-300, #A3AED0)",
											}}>
											데이터 내보내기
										</label>
									</>
								)}
							</div>
							<div className="dataload">
								<img src={uploadCloud} alt="uploadCloud" />
								<label for="upload">데이터 가져오기</label>
								<input
									onChange={(e) => {
										uploadFile(e);
									}}
									id="upload"
									type="file"
									name="file"></input>
							</div>
							<div className="dataload">
								<img src={download} alt="download" />
								<label for="dataload" onClick={fileDownload}>
									양식 다운받기
								</label>
							</div>
						</div>
						<table className="infoTable">
							{/* 목록 */}
							<thead>
								<th>이름</th>
								<th
									onClick={() => {
										setasc(!asc);
										handleAsc("id");
									}}>
									<span>학번</span>
									<img src={asc ? downArrow : upArrow} alt="arrow" />
								</th>
								<th
									onClick={() => {
										setasc(!asc);
										handleAsc("lockerNum");
									}}>
									<span>사물함 번호</span>
									<img src={asc ? downArrow : upArrow} alt="arrow" />
								</th>
								<th>
									<span>상태</span>
								</th>
								<th>
									<span>학생회비 납부</span>
								</th>
								<th>
									<span>관리자 여부</span>
								</th>
							</thead>
							{/* 내용 */}
							<tbody>
								{studentInfo ? (
									studentInfo.map(function (info, i) {
										return (
											<tr
												style={{
													borderBottom: "1px solid var(--background, #F4F7FE)",
												}}
												key={i}>
												<td>{info.studentName}</td>
												<td>{info.studentNum}</td>
												<td>{info.lockerNum}</td>
												<td>{info.status}</td>
												<td>
													<input
														type="checkbox"
														id={`pay${i}`}
														checked={info.userTier === "NON_MEMBER"}
														onClick={() => {
															let copyInfo = [...studentInfo];
															copyInfo[i].userTier = !copyInfo[i].userTier;
															setStudentInfo(copyInfo);
														}}
													/>
													<label htmlFor={`pay${i}`}></label>
												</td>
												<td>
													<input
														type="checkbox"
														id={`admin${i}`}
														checked={info.role === "ROLE_ADMIN" ? true : false}
														onClick={() => {
															let copyInfo = [...studentInfo];
															copyInfo[i].role = !copyInfo[i].role;
															setStudentInfo(copyInfo);
														}}
													/>
													<label htmlFor={`admin${i}`}></label>
												</td>
											</tr>
										);
									})
								) : (
									<></>
								)}
							</tbody>
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
	display: flex;
	width: 100%;
`;

const ContentContainer = styled.div`
	padding-right: 2.5rem;
	display: flex;
	flex-direction: column;
	background: var(--background, #f4f7fe);
`;
