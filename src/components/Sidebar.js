import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as SejongBucket } from "../assets/SejongBucket.svg";
import { ReactComponent as MyPage } from "../assets/MyHome.svg";
import { ReactComponent as Reserve } from "../assets/BucketReserve.svg";
import { ReactComponent as FeedBack } from "../assets/FeedBack.svg";
import { ReactComponent as Logout } from "../assets/Logout.svg";
import { ReactComponent as Admin } from "../assets/Admin.svg";

const getColorForSection = (sectionPath, currentPath) => {
  return currentPath.includes(sectionPath)
    ? "var(--primary-500, #E80035)"
    : "var(--grayscale-400, #7883a6)";
};

const SiderBar = () => {
  const { pathname } = useLocation();
  const onClickLentMyHomeBtn = () => {
    window.location.href = "/mypage";
  };

  const onClickReserveBtn = () => {
    window.location.href = "/reserve";
  };

  const onClickFeedBtn = () => {
    window.location.href = "/feedback";
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  const onClickAdminBtn = () => {
    window.location.href = "/admin";
  };

  return (
    <SiderBarStyled>
      <LinkStyled to="/mypage">
        <TitleStyled>
          <TitleSVG>
            <SejongBucket />
          </TitleSVG>
        </TitleStyled>
      </LinkStyled>
      <SectionWrap>
        <SectionStyled
          active={pathname.includes("/mypage")}
          fill={true}
          onClick={onClickLentMyHomeBtn}
          style={{
            color: getColorForSection("/mypage", pathname),
          }}
        >
          <div>
            <MyPage />
          </div>
          마이페이지
        </SectionStyled>

        <SectionStyled
          active={pathname.includes("/reserve")}
          onClick={onClickReserveBtn}
          style={{
            color: getColorForSection("/reserve", pathname),
          }}
        >
          <div>
            <Reserve />
          </div>
          사물함 예약
        </SectionStyled>

        <SectionStyled
          onClick={onClickFeedBtn}
          style={{ color: "var(--grayscale-400, #7883A6)" }}
        >
          <div>
            <FeedBack />
          </div>
          피드백 보내기
        </SectionStyled>

        <SectionStyled
          onClick={handleLogout}
          style={{ color: "var(--grayscale-400, #7883A6)" }}
        >
          <div>
            <Logout />
          </div>
          로그아웃
        </SectionStyled>
        <SectionStyled
          active={pathname.includes("/admin")}
          onClick={onClickAdminBtn}
          style={{
            color: getColorForSection("/admin", pathname),
          }}
        >
          <div>
            <Admin />
          </div>
          어드민
        </SectionStyled>
      </SectionWrap>
    </SiderBarStyled>
  );
};

const SiderBarStyled = styled.div`
  width: 300px;
  min-width: 300px;
  background: var(--white, #fff);
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
`;

const TitleStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 138px;
  cursor: pointer;
  text-decoration: none;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const TitleSVG = styled.svg`
  width: 110px;
  height: 33px;
  fill: var(--secondary-secondary-600, #233d4e);
`;

const SectionWrap = styled.div`
  height: calc(100% - 138px);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const SectionStyled = styled.div`
  width: 252px;
  height: 62px;
  background: ${(props) =>
    props.active ? "var(--primary-50, #FDE6EB)" : "var(--white, #fff)"};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 40px;
  font-size: 18px;
  font-weight: 700;
  font-family: Pretendard-Regular;
  border-radius: 20px;
  cursor: pointer;

  & div {
    width: 24px;
    height: 24px;
    margin-right: 30px;
    margin-left: 20px;
  }
`;

export default SiderBar;
