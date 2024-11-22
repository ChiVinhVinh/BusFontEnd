import React from 'react';
import './footer.css';
import { createPortal } from 'react-dom';

function Footer() {
    const footerRoot = document.getElementById('footer');
    return footerRoot ? createPortal(
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-contact">
                        <div className="footer-call-center">
                            <h3>TRUNG TÂM TỔNG ĐÀI & CSKH</h3>
                            <h2>19006067</h2>
                        </div>
                        <img
                            src="https://cdn.futabus.vn/futa-busline-cms-dev/logo_Sale_Noti_7dab1d54a1/logo_Sale_Noti_7dab1d54a1.png"
                            alt="FUTA Logo"
                        />
                    </div>
                    <span>CÔNG TY CỔ PHẦN XE KHÁCH PHƯƠNG TRANG - FUTA BUS LINES</span>
                    <span>
                        Địa chỉ: <strong>Số 01 Tô Hiến Thành, Phường 3, Thành Phố Đà Lạt, Tỉnh Lâm Đồng, Việt Nam.</strong>
                    </span>
                    <span>Email: hotro@futa.vn</span>
                    <div className="footer-contact-info">
                        <span>Điện Thoại: 02838386852</span>
                        <span>Fax: 02838386853</span>
                    </div>
                    <div className="footer-download-connect">
                        <div className="footer-download">
                            <span>TẢI APP FUTA</span>
                            <div className="footer-download-group">
                                <img src="https://cdn.futabus.vn/futa-busline-cms-dev/CH_Play_712783c88a/CH_Play_712783c88a.svg" alt="Google Play" />
                                <img src="https://cdn.futabus.vn/futa-busline-cms-dev/App_Store_60da92cb12/App_Store_60da92cb12.svg" alt="App Store" />
                            </div>
                        </div>
                        <div className="footer-connect">
                            <span>KẾT NỐI CHÚNG TÔI</span>
                            <div className="footer-icon-group">
                                <img src="https://cdn.futabus.vn/futa-busline-cms-dev/facebook_1830e1b97c/facebook_1830e1b97c.svg" alt="Facebook" />
                                <img src="https://cdn.futabus.vn/futa-busline-cms-dev/youtube_d5ef476c0e/youtube_d5ef476c0e.svg" alt="YouTube" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-section">
                    <div className="footer-info">
                        <h3>FUTA Bus Lines</h3>
                        <ul>
                            <li>Về chúng tôi</li>
                            <li>Lịch trình</li>
                            <li>Tuyển dụng</li>
                            <li>Tin tức & Sự kiện</li>
                            <li>Mạng lưới văn phòng</li>
                        </ul>
                    </div>
                    <div className="footer-support">
                        <h3>Hỗ trợ</h3>
                        <ul>
                            <li>Tra cứu thông tin đặt vé</li>
                            <li>Điều khoản sử dụng</li>
                            <li>Câu hỏi thường gặp</li>
                            <li>Hướng dẫn đặt vé trên Web</li>
                            <li>Hướng dẫn nạp tiền trên App</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-brands">
                <img src="https://cdn.futabus.vn/futa-busline-cms-dev/Bus_Lines_817c989817/Bus_Lines_817c989817.svg" alt="FUTA Bus Lines" />
                <img src="https://cdn.futabus.vn/futa-busline-cms-dev/logo_futa_express_0ad93b22d3/logo_futa_express_0ad93b22d3.svg" alt="FUTA Express" />
                <img src="https://cdn.futabus.vn/futa-busline-cms-dev/FUTA_Advertising_d0b60b3a45/FUTA_Advertising_d0b60b3a45.svg" alt="FUTA Advertising" />
                <img src="https://cdn.futabus.vn/futa-busline-web-cms-prod/Tdcpl_1_5d2e395adc/Tdcpl_1_5d2e395adc.png" alt="FUTA Partner" />
            </div>
            <div className="footer-bottom">
                <p>&copy; 2023 | Bản quyền thuộc về Công ty Cổ Phần Xe khách Phương Trang - FUTA Bus Lines 2023 | Chịu trách nhiệm quản lý nội dung: Ông Võ Duy Thành</p>
            </div>
        </footer>,
        footerRoot
    ) : null;
}

export default Footer;
