import { Link } from 'react-router-dom';
import Dropdown from '../components/dropItem/dropItem';
import { Box, styled, Typography, Stack, Button } from '@mui/material';
import { createPortal } from 'react-dom';

// Global style
const GlobalStyle = styled('div')({
    fontFamily: 'Arial, sans-serif',
});

const HeaderContainer = styled(Box)({
    display: 'flex',
    backgroundImage: 'url("https://futabus.vn/images/banners/home_banner.png")',
    color: '#fff',
    height: '220px',
    flexDirection: 'column',
    alignItems: 'center',
});

const HeaderTop = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '1128px',
});

const LogoContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
});

const DropdownContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
});

const Logo = styled('img')({
    height: '60px',
    width: '295px',
    marginLeft: '100px',
});

const Icon = styled('img')({
    width: '26px',
    height: '26px',
});

const LoginButton = styled(Button)({
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: '20px',
    height: '32px',
    width: '200px',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#f5f5f5',
    }
});

const NavLinks = styled(Stack)({
    display: 'flex',
    listStyle: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
    width: '100%',
    flexDirection: 'row',
    '& a': {
        margin: '0 40px',
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        '&:hover': {
            color: '#ffcc99',
        }
    }
});

const ManageLink = styled(Link)({
    color: '#fff',
    textDecoration: 'none',
    '&:hover': {
        color: '#ffcc99',
    }
});

const Headers = () => {
    const headerRoot = document.getElementById('header')
    return headerRoot ? createPortal(
        <GlobalStyle>
            <HeaderContainer>
                <HeaderTop>
                    <LogoContainer>
                        <DropdownContainer>
                            <Icon src='https://futabus.vn/images/icons/vietnam.svg' alt='iconvn' />
                            <Dropdown />
                        </DropdownContainer>
                        <Typography sx={{ margin: '0 10px' }}>|</Typography>
                        <DropdownContainer>
                            <Icon src="https://futabus.vn/images/icons/download_app.svg" />
                            <Dropdown />
                        </DropdownContainer>
                    </LogoContainer>

                    <Logo
                        src="https://futabus.vn/_next/static/media/logo_new.8a0251b8.svg"
                        alt="FutaBus Logo"
                    />

                    <LoginButton>
                        <Box
                            component="img"
                            src="https://futabus.vn/images/icons/person.svg"
                            width="20px"
                            height="20px"
                        />
                        <Typography>Đăng Nhập/Đăng Kí</Typography>
                    </LoginButton>
                </HeaderTop>

                <NavLinks>
                    <ManageLink to="/crud">Quản lý</ManageLink>
                    <Link to="#">Tra cứu vé</Link>
                    <Link to="#">Tin tức</Link>
                    <Link to="#">Hóa đơn</Link>
                    <Link to="#">liên hệ</Link>
                    <Link to="#">Về chúng tôi</Link>
                </NavLinks>
            </HeaderContainer>
        </GlobalStyle>,
        headerRoot
    ) : null;
}

export default Headers;