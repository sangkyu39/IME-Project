/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
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
import { faL } from "@fortawesome/free-solid-svg-icons";

function AdminMypage() {
	const userObj = JSON.parse(localStorage.getItem("userObj"));
	const studentInfoURL = `http://54.180.70.111:8083/admin/api/v2/majors/${userObj.majorId}/users`;
	const fileUploadURL = `http://54.180.70.111:8083/admin/api/v2/users/${userObj.userId}/file`;
	const [page, setPage] = useState(0);

	async function getStudentInfo() {
		await axios
			.get(studentInfoURL, {
				params: {
					majorId: userObj.majorId,
					page: page,
				},
				headers: {
					AccessToken: userObj.accessToken,
				},
			})
			.then((res) => {
				console.log(res);
				setStudentInfo((prevInfo) => [...prevInfo, ...res.data.result.adminResponse]);
				setPage((prevPage) => prevPage + 1);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	async function searchInfo(e) {
		setLoading(true);
		if (e) {
			await axios
				.get(studentInfoURL, {
					params: {
						majorId: userObj.majorId,
						page: page,
						search: e,
					},
					headers: {
						AccessToken: userObj.accessToken,
					},
				})
				.then((res) => {
					console.log(res);
					setStudentInfo(res.data.result.adminResponse);
					setPage((prevPage) => prevPage + 1);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			getStudentInfo();
		}
	}

	useEffect(() => {
		getStudentInfo();
	}, []);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// 스크롤 이벤트 리스너 등록
		const tbodyElement = document.getElementById("user-info-div");
		tbodyElement.addEventListener("scroll", handleScroll);
		return () => {
			// 컴포넌트 언마운트 시 스크롤 이벤트 리스너 제거
			tbodyElement.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleScroll = (event) => {
		const tbodyElement = event.target;
		// 스크롤 위치와 tbody 요소의 높이, 스크롤 가능한 높이 계산
		const scrollTop = tbodyElement.scrollTop;
		const tbodyHeight = tbodyElement.offsetHeight;
		const scrollHeight = tbodyElement.scrollHeight;

		// 스크롤이 tbody 하단에 위치하고 로딩 중이 아닐 때 추가 데이터 로드
		if (scrollTop + tbodyHeight >= scrollHeight && !loading) {
			if (searchId) {
				console.log("검색 스크롤");
				searchInfo();
			} else {
				console.log("전체 스크롤");
				getStudentInfo();
			}
		}
	};

	const uploadFile = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("membershipFile", file);

		fetch(fileUploadURL, {
			method: "POST",
			headers: {
				AccessToken: userObj.accessToken,
			},
			body: formData,
		})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const [major, setMajor] = useState(localStorage.getItem("major"));
	const [studentInfo, setStudentInfo] = useState([]);
	const [asc, setasc] = useState(true);
	const [searchId, setSearchId] = useState("");

	const onChange = (e) => {
		setPage(0);
		const {
			target: { name, value },
		} = e;
		setSearchId(value);
	};

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
									onChange={onChange}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											searchInfo(searchId);
										}
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
								<a href="https://sejong-bucket-s3.s3.ap-northeast-2.amazonaws.com/SEJONG_BUCKET/%ED%95%99%EC%83%9D%ED%9A%8C%EB[…]B%82%A9%EB%B6%80%EC%97%AC%EB%B6%80+TEST.xlsx">
									양식 다운받기
								</a>
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
							<tbody id="user-info-div">
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
														checked={info.userTier === "MEMBER"}
														onClick={() => {
															let copyInfo = [...studentInfo];
															copyInfo[i].userTier =
																copyInfo[i].userTier === "MEMBER" ? "NON_MEMBER" : "MEMBER";
															setStudentInfo(copyInfo);
															console.log(copyInfo);
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
