import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import React, { useState, useEffect } from "react";
import { ReactComponent as PlusBtn } from "../assets/PlusBtn.svg";
import axios from "axios";

function MyPage() {
  const [isCreateVisible, setCreateVisible] = useState(false);

  const handlePlusBtnClick = () => {
    setCreateVisible(true);
  };

  const [userId, setUserId] = useState("");
  const [majorDetail, setMajorDetail] = useState("");

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
            setMajorDetail(data.result.majorDetail);
            console.log(
              "UserName from Axios GET request:",
              data.result.majorDetail
            );
          } else {
            console.error(
              "Invalid data structure in Axios GET response:",
              data
            );
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
        <PageText>사물함 관리</PageText>
        <DivStyled>
          {isCreateVisible ? (
            <CreateStyled>{majorDetail} 사물함</CreateStyled>
          ) : (
            <>
              <PlusBtnStyled onClick={handlePlusBtnClick} />
              첫번째 사물함을 만들어주세요!
            </>
          )}
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
  @font-face {
    font-family: "Pretendard-Regular";
    src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
      format("woff");
    font-weight: 400;
    font-style: normal;
  }
  height: 85vh;
  width: 74vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 3%;
  background: var(--white, #fff);
  border-radius: 20px;
  color: var(--grayscale-600, #2b3674);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.48px;
`;

const CreateStyled = styled.div`
  color: var(--grayscale-600, #2b3674);
  font-family: DM Sans;
  font-size: 34px;
  font-style: normal;
  font-weight: 700;
  line-height: 42px; /* 123.529% */
  letter-spacing: -0.68px;
`;

const PlusBtnStyled = styled(PlusBtn)`
  margin-bottom: 30px;
  cursor: pointer;
`;
