import styled from "styled-components";
import Sidebar from "../components/Sidebar";

function MyPage() {
  return (
    <MyPageStyled>
      <Sidebar />
      <ContentContainer>
        <PageText>마이페이지</PageText>
        <TopDivStyled>
          <InfoBox>내 정보</InfoBox>
          <InfoBox>내 정보</InfoBox>
        </TopDivStyled>
      </ContentContainer>
    </MyPageStyled>
  );
}

export default MyPage;

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
  align-items: center;
`;

const PageText = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,700&display=swap");
  color: var(--grayscale-600, #2b3674);
  font-family: DM Sans;
  font-size: 34px;
  font-style: normal;
  font-weight: 700;
  line-height: 42px;
  letter-spacing: -0.68px;
  padding: 40px;
  height: 130px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const TopDivStyled = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const InfoBox = styled.div`
  width: 480px;
  height: 280px;
  flex-shrink: 0;
  border-radius: 20px;
  background: var(--white, #fff);
`;
