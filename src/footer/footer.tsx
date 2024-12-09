import React from 'react';
import { createPortal } from 'react-dom';
import { Box, Typography, styled } from '@mui/material';

// Styled Components
const FooterContainer = styled('footer')({
    backgroundColor: '#f4f4f4',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
    flexShrink: 0,
    padding: '20px 0',
});

const FooterContent = styled(Box)({
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
    gap: '50px',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
});

const FooterSection = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    gap: '15px',
    width: '580px',
});

const FooterContact = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    alignItems: 'center',
});

const FooterContactInfo = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
});

const FooterDownloadConnect = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    gap: '30px',
    flexWrap: 'wrap',
    alignItems: 'center',
});

const FooterDownload = styled(Box)({
    textAlign: 'left',
});

const FooterConnect = styled(Box)({
    textAlign: 'left',
});

const FooterIconGroup = styled(Box)({
    display: 'flex',
    gap: '15px',
});

const FooterSectionInfo = styled(Box)({
    textAlign: 'left',
    width: '200px',
});

const FooterBrands = styled(Box)({
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    marginTop: '20px',
});

const FooterBottom = styled(Box)({
    textAlign: 'center',
    fontSize: '0.9em',
    color: '#666',
    borderTop: '1px solid #ddd',
    paddingTop: '20px',
    width: '100%',
});

function Footer() {
    const footerRoot = document.getElementById('footer');
    return footerRoot ? createPortal(
        <FooterContainer >
            <FooterContent>
                <FooterSection>
                    <FooterContact>
                        <Box>
                            <Typography variant="h6" color="#e84c3d">TRUNG TÂM TỔNG ĐÀI & CSKH</Typography>
                            <Typography variant="h4" color="#e84c3d">19006067</Typography>
                        </Box>
                        <img
                            src="https://cdn.futabus.vn/futa-busline-cms-dev/logo_Sale_Noti_7dab1d54a1/logo_Sale_Noti_7dab1d54a1.png"
                            alt="FUTA Logo"
                            style={{ maxWidth: '120px', height: 'auto', margin: '10px 0' }}
                        />
                    </FooterContact>
                    <Typography variant="body2" color="#666">
                        CÔNG TY CỔ PHẦN XE KHÁCH PHƯƠNG TRANG - FUTA BUS LINES
                    </Typography>
                    <Typography variant="body2" color="#666">
                        Địa chỉ: <strong>Số 01 Tô Hiến Thành, Phường 3, Thành Phố Đà Lạt, Tỉnh Lâm Đồng, Việt Nam.</strong>
                    </Typography>
                    <Typography variant="body2" color="#666">Email: hotro@futa.vn</Typography>
                    <FooterContactInfo>
                        <Typography variant="body2" color="#666">Điện Thoại: 02838386852</Typography>
                        <Typography variant="body2" color="#666">Fax: 02838386853</Typography>
                    </FooterContactInfo>
                    <FooterDownloadConnect>
                        <FooterDownload>
                            <Typography variant="subtitle1" fontWeight="bold">TẢI APP FUTA</Typography>
                            <Box>
                                <img src="https://cdn.futabus.vn/futa-busline-cms-dev/CH_Play_712783c88a/CH_Play_712783c88a.svg" alt="Google Play" style={{ width: '130px', height: 'auto', margin: '5px' }} />
                                <img src="https://cdn.futabus.vn/futa-busline-cms-dev/App_Store_60da92cb12/App_Store_60da92cb12.svg" alt="App Store" style={{ width: '130px', height: 'auto', margin: '5px' }} />
                            </Box>
                        </FooterDownload>
                        <FooterConnect>
                            <Typography variant="subtitle1" fontWeight="bold">KẾT NỐI CHÚNG TÔI</Typography>
                            <FooterIconGroup>
                                <img src="https://cdn.futabus.vn/futa-busline-cms-dev/facebook_1830e1b97c/facebook_1830e1b97c.svg" alt="Facebook" style={{ width: '24px', height: '24px', cursor: 'pointer', transition: 'transform 0.2s' }} />
                                <img src="https://cdn.futabus.vn/futa-busline-cms-dev/youtube_d5ef476c0e/youtube_d5ef476c0e.svg" alt="YouTube" style={{ width: '24px', height: '24px', cursor: 'pointer', transition: 'transform 0.2s' }} />
                            </FooterIconGroup>
                        </FooterConnect>
                    </FooterDownloadConnect>
                </FooterSection>
                <Box display="flex" justifyContent="center" gap="50px" flexWrap="wrap">
                    <FooterSectionInfo>
                        <Typography variant="subtitle1" fontWeight="bold">FUTA Bus Lines</Typography>
                        <ul style={{ padding: 0, margin: 0 }}>
                            <li style={{ fontSize: '0.9em', color: '#666', cursor: 'pointer', transition: 'color 0.2s', marginBottom: '5px' }}>Về chúng tôi</li>
                            <li style={{ fontSize: '0.9em', color: '#666', cursor: 'pointer', transition: 'color 0.2s', marginBottom: '5px' }}>Lịch trình</li>
                            <li style={{ fontSize: '0.9em', color: '#666', cursor: 'pointer', transition: 'color 0.2s', marginBottom: '5px' }}>Tuyển dụng</li>
                            <li style={{ fontSize: '0.9em', color: '#666', cursor: 'pointer', transition: 'color 0.2s', marginBottom: '5px' }}>Tin tức & Sự kiện</li>
                            <li style={{ fontSize: '0.9em', color: '#666', cursor: 'pointer', transition: 'color 0.2s', marginBottom: '5px' }}>Mạng lưới văn phòng</li>
                        </ul>
                    </FooterSectionInfo>
                    <FooterSectionInfo>
                        <Typography variant="subtitle1" fontWeight="bold">Hỗ trợ</Typography>
                        <ul style={{ padding: 0, margin: 0 }}>
                            <li style={{ fontSize: '0.9em', color: '#666', cursor: 'pointer', transition: 'color 0.2s', marginBottom: '5px' }}>Tra cứu thông tin đặt vé</li>
                            <li style={{ fontSize: '0.9em', color: '#666', cursor: 'pointer', transition: 'color 0.2s', marginBottom: '5px' }}>Điều khoản sử dụng</li>
                            <li style={{ fontSize: '0.9em', color: '#666', cursor: 'pointer', transition: 'color 0.2s', marginBottom: '5px' }}>Câu hỏi thường gặp</li>
                            <li style={{ fontSize: '0.9em', color: '#666', cursor: 'pointer', transition: 'color 0.2s', marginBottom: '5px' }}>Hướng dẫn đặt vé trên Web</li>
                            <li style={{ fontSize: '0.9em', color: '#666', cursor: 'pointer', transition: 'color 0.2s', marginBottom: '5px' }}>Hướng dẫn nạp tiền trên App</li>
                        </ul>
                    </FooterSectionInfo>
                </Box>
            </FooterContent>
            <FooterBrands>
                <img src="https://cdn.futabus.vn/futa-busline-cms-dev/Bus_Lines_817c989817/Bus_Lines_817c989817.svg" alt="FUTA Bus Lines" style={{ maxWidth: '100px', height: 'auto' }} />
                <img src="https://cdn.futabus.vn/futa-busline-cms-dev/logo_futa_express_0ad93b22d3/logo_futa_express_0ad93b22d3.svg" alt="FUTA Express" style={{ maxWidth: '100px', height: 'auto' }} />
                <img src="https://cdn.futabus.vn/futa-busline-cms-dev/FUTA_Advertising_d0b60b3a45/FUTA_Advertising_d0b60b3a45.svg" alt="FUTA Advertising" style={{ maxWidth: '100px', height: 'auto' }} />
                <img src="https://cdn.futabus.vn/futa-busline-web-cms-prod/Tdcpl_1_5d2e395adc/Tdcpl_1_5d2e395adc.png" alt="FUTA Partner" style={{ maxWidth: '100px', height: 'auto' }} />
            </FooterBrands>
            <FooterBottom>
                <Typography variant="body2">
                    &copy; 2023 | Bản quyền thuộc về Công ty Cổ Phần Xe khách Phương Trang - FUTA Bus Lines 2023 | Chịu trách nhiệm quản lý nội dung: Ông Võ Duy Thành
                </Typography>
            </FooterBottom>
        </FooterContainer>,
        footerRoot
    ) : null;
}

export default Footer;