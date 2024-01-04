import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import InfoImg from "../assets/MyInfo.png";

function MyPage() {
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
                  marginTop: "35px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <InfoImage src={InfoImg} alt="내 정보 이미지" />
                <div style={{ width: "60%" }}>
                  <Info>이름</Info>
                  <Info>학과</Info>
                  <Info>학생회비</Info>
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
                }}
              >
                <Info>위치</Info>
                <Info>번호</Info>
                <Info>사용기간</Info>
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
              }}
            >
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
          <InfoBox
            style={{ background: "var(--background, #f4f7fe)" }}
          ></InfoBox>
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
  color: var(--grayscale-600, #2b3674);
  font-family: "DM Sans", sans-serif;
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
  margin-top: 10px;
  display: flex;
  align-items: center;
  color: var(--grayscale-400, #7883a6);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.32px;
  padding: 5px;
`;

const InfoImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px solid var(--primary-200, #f699ae);
  background: var(--primary-50, #fde6eb);
  mix-blend-mode: multiply;
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
