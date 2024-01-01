import styled from "styled-components";
import Sidebar from "../components/Sidebar";

function MyPage() {
  return (
    <MyPageStyled>
      <Sidebar />
    </MyPageStyled>
  );
}

export default MyPage;

const MyPageStyled = styled.div`
  background: var(--background, #f4f7fe);
  height: 100vh;
`;
