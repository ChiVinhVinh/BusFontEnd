import { useState, useEffect } from 'react';
import ThoiSuTitle from './ThoiSuTitle';
import './ThoiSu.css'
const ListImg = [
    {
        img: [
            { anh: 'https://cdn.futabus.vn/futa-busline-web-cms-prod/599_x_337_px_x2_70c927a0c2/599_x_337_px_x2_70c927a0c2.jpg', title: 'ƯU ĐÃI ĐỒNG GIÁ HẤP DẪN: XE MỚI HIỆN ĐẠI, NÂNG TẦM TRẢI NGHIỆM', date: '09/12/2023' },
            { anh: 'https://cdn.futabus.vn/futa-busline-web-cms-prod/DONG_GIA_TUYEN_HCM_KHU_VUC_TAY_NGUYEN_02_a744df78ba/DONG_GIA_TUYEN_HCM_KHU_VUC_TAY_NGUYEN_02_a744df78ba.png', date: '11/11/2023', title: 'PHƯƠNG TRANG – FUTA BUS LINES KHAI TRƯƠNG TUYẾN BX. MIỀN ĐÔNG MỚI – BX. KIÊN GIANG' },
            { anh: 'https://cdn.futabus.vn/futa-busline-web-cms-prod/599x337_5_6fabed66ec/599x337_5_6fabed66ec.png', date: '09/03/2024', title: 'PHƯƠNG TRANG - FUTA BUS LINES GIẢM GIÁ VÉ CHO NGƯỜI CAO TUỔI TRÊN TUYẾN XE BUÝT TP. BẾN TRE - PHÀ ĐÌNH KHAO' }
        ], index: 1
    },
    {
        img: [
            { anh: 'https://cdn.futabus.vn/futa-busline-web-cms-prod/599x337_3_501c777c98/599x337_3_501c777c98.png', date: '08/05/2023', title: 'ƯU ĐÃI ĐỒNG GIÁ HẤP DẪN: XE MỚI HIỆN ĐẠI, NÂNG TẦM TRẢI NGHIỆM' },
            { anh: 'https://cdn.futabus.vn/futa-busline-web-cms-prod/DA_DANG_MON_NGON_DU_DAY_DINH_DUONG_COMBO_CHI_39_K_02_63861d032f/DA_DANG_MON_NGON_DU_DAY_DINH_DUONG_COMBO_CHI_39_K_02_63861d032f.png', date: '06-03-2022', title: 'ƯU ĐÃI ĐỒNG GIÁ HẤP DẪN: XE MỚI HIỆN ĐẠI, NÂNG TẦM TRẢI NGHIỆM' },
            { anh: 'https://cdn.futabus.vn/futa-busline-web-cms-prod/WEB_AN_NO_UONG_NGON_CHI_CO_39_K_02_e9f07be18d/WEB_AN_NO_UONG_NGON_CHI_CO_39_K_02_e9f07be18d.png', date: '09/02/2022', title: 'ƯU ĐÃI ĐỒNG GIÁ HẤP DẪN: XE MỚI HIỆN ĐẠI, NÂNG TẦM TRẢI NGHIỆM' },
        ], index: 2
    },
    {
        img: [
            { anh: 'https://cdn.futabus.vn/futa-busline-web-cms-prod/WEB_v2_DAT_MON_NGON_39_K_CHI_CO_FUTA_02_772a194ed3/WEB_v2_DAT_MON_NGON_39_K_CHI_CO_FUTA_02_772a194ed3.png', date: '19/02/2023', title: 'ƯU ĐÃI ĐỒNG GIÁ HẤP DẪN: XE MỚI HIỆN ĐẠI, NÂNG TẦM TRẢI NGHIỆM' },
            { anh: 'https://cdn.futabus.vn/futa-busline-web-cms-prod/599x_337_px_38f0c8fabc/599x_337_px_38f0c8fabc.png', date: '20/02/2023', title: 'ƯU ĐÃI ĐỒNG GIÁ HẤP DẪN: XE MỚI HIỆN ĐẠI, NÂNG TẦM TRẢI NGHIỆM' },
            { anh: 'https://cdn.futabus.vn/futa-busline-web-cms-prod/599x337_11zon_a8a24fa76b/599x337_11zon_a8a24fa76b.png', date: '01/02/2003', title: 'ƯU ĐÃI ĐỒNG GIÁ HẤP DẪN: XE MỚI HIỆN ĐẠI, NÂNG TẦM TRẢI NGHIỆM' }
        ], index: 3
    },
    {
        img: [
            { anh: 'https://cdn.futabus.vn/futa-busline-web-cms-prod/599_x_337_px_1_11zon_870237b57c/599_x_337_px_1_11zon_870237b57c.png', date: '30/10/2023', title: 'ƯU ĐÃI ĐỒNG GIÁ HẤP DẪN: XE MỚI HIỆN ĐẠI, NÂNG TẦM TRẢI NGHIỆM' },
            { anh: 'https://cdn.futabus.vn/futa-busline-web-cms-prod/599x337_e67d5cf4d9/599x337_e67d5cf4d9.png', date: '10/02/2021', title: 'ƯU ĐÃI ĐỒNG GIÁ HẤP DẪN: XE MỚI HIỆN ĐẠI, NÂNG TẦM TRẢI NGHIỆM' },
            { anh: 'https://cdn.futabus.vn/futa-busline-web-cms-prod/599x337_2_be0089af22/599x337_2_be0089af22.png', date: '30-12-2024', title: 'ƯU ĐÃI ĐỒNG GIÁ HẤP DẪN: XE MỚI HIỆN ĐẠI, NÂNG TẦM TRẢI NGHIỆM' }
        ], index: 4
    },
    {
        img: [
            { anh: 'https://cdn.futabus.vn/futa-busline-web-cms-prod/599_X337_3_688d636b74/599_X337_3_688d636b74.png', date: '05/09/2024', title: 'ƯU ĐÃI ĐỒNG GIÁ HẤP DẪN: XE MỚI HIỆN ĐẠI, NÂNG TẦM TRẢI NGHIỆM' },
            { anh: 'https://cdn.futabus.vn/futa-busline-web-cms-prod/nang_cap_dong_xe_Chi_nhanh_Da_Nang_599x337_d63b71cee3/nang_cap_dong_xe_Chi_nhanh_Da_Nang_599x337_d63b71cee3.png', date: '07/07/2023', title: 'ƯU ĐÃI ĐỒNG GIÁ HẤP DẪN: XE MỚI HIỆN ĐẠI, NÂNG TẦM TRẢI NGHIỆM' },
            { anh: 'https://cdn.futabus.vn/futa-busline-web-cms-prod/nang_cap_dong_xe_Quy_Nhon_599x337_cb1982732c/nang_cap_dong_xe_Quy_Nhon_599x337_cb1982732c.png', date: '02/03/2024', title: 'ƯU ĐÃI ĐỒNG GIÁ HẤP DẪN: XE MỚI HIỆN ĐẠI, NÂNG TẦM TRẢI NGHIỆM' }
        ], index: 5
    }
]

const ThoiSu = () => {
    const [page, setPage] = useState(1);
    useEffect(() => {
        const interval = setInterval(() => {
            setPage(prev => (prev % 5) + 1)
        }, 10000)
        return () => clearInterval(interval);
    }, [])
    const handleClick = (page: number) => {
        setPage(page);
    }
    return (
        <div className='col1111'>
            <h1>tin tức mới</h1>
            <div className='row100'>
                <h6 className='ct'>Được khánh hàng tin tưởng và lựa chọn</h6>
                <h6 className='rt'>Xem tất cả</h6>
            </div>
            <div className='row99'>
                {ListImg[page - 1].img.map((item, index) =>
                    <ThoiSuTitle key={index} img={item.anh} title={item.title} date={item.date} ></ThoiSuTitle>
                )}
            </div>
            <ul className='listdot'>
                {ListImg.map((item) => <li key={item.index}><div className={`dot ${page === item.index ? 'active' : ''}`} onClick={() => handleClick(item.index)}></div></li>)}
            </ul>
        </div>
    )
}
export default ThoiSu;
