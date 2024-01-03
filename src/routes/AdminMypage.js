import Sidebar from "../components/Sidebar";
import styled from "styled-components";
function AdminMypage() {
	return (
		<MyPageStyled>
			<Sidebar />
			<ContentContainer>
				<p>gd</p>
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
	align-items: center;
`;
