import {LayoutProps} from "./types/layoutProps";
import styled from "styled-components";
import Logo from '../../assets/airplane-logo.png';

const LayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 60px 0;
  margin: 0 auto;
`

const LogoLayout = styled.img`
  width: 65px;
  height: 65px;
  display: block;
  margin: 0 auto 60px;
`

const ContentWrapperStyled = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  gap: 25px;
  justify-content: space-between;
`;


export function Layout({children}: LayoutProps) {
    return (
        <LayoutStyled>
            <LogoLayout src={Logo}/>
            <ContentWrapperStyled>
                {children}
            </ContentWrapperStyled>
        </LayoutStyled>
    );
}

export default Layout;
