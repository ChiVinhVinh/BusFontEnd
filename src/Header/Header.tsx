import Dropdown from '../components/dropItem/dropItem';
import './Header.css'
import { createPortal } from 'react-dom';
const Headers = () => {
    const headerRoot = document.getElementById('header')
    return headerRoot ? createPortal(
        <div className="header">
            <div className="header-top">
                <div className='contailogo'>
                    <div className='dropdownlogo'>
                        <img className="iconnn" src='https://futabus.vn/images/icons/vietnam.svg' alt='iconvn'></img>
                        <Dropdown></Dropdown>
                    </div>
                    <span>|</span>
                    <div className='dropdownlogo'>
                        <img className="iconnn" src="https://futabus.vn/images/icons/download_app.svg"></img>
                        <Dropdown></Dropdown>
                    </div>
                </div>
                <img className="logo" src="https://futabus.vn/_next/static/media/logo_new.8a0251b8.svg" alt="FutaBus Logo" />
                <div className='login'>
                    <img className="imgLogin" src="https://futabus.vn/images/icons/person.svg"></img>
                    <span>Đăng Nhập/Đăng Kí</span>
                </div>
            </div>
            <div className='nav-links'>
                <a href='#'>Trang Trủ</a>
                <a href='#'>Lịch trình</a>
                <a href='#'>Tra cứu vé</a>
                <a href='#'>Tin tức</a>
                <a href='#'>Hóa đơn</a>
                <a href='#'>liên hệ</a>
                <a href='#'>Về chúng tôi</a>
            </div>
        </div>,
        headerRoot
    ) : null;
}
export default Headers;