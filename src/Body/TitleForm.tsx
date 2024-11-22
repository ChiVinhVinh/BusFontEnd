import React, { useState, useEffect } from "react";
import './TitleForm.css'
const ListImg = [
    {
        img: ["https://cdn.futabus.vn/futa-busline-web-cms-prod/343_x_184_px_x4_4fd05509ef/343_x_184_px_x4_4fd05509ef.jpg",
            'https://cdn.futabus.vn/futa-busline-web-cms-prod/2_343_x_184_px_f365e0f9c8/2_343_x_184_px_f365e0f9c8.png',
            'https://cdn.futabus.vn/futa-busline-web-cms-prod/343_x_184_px_0b1588190d/343_x_184_px_0b1588190d.png',],
        index: 1
    },
    {
        img: [
            'https://cdn.futabus.vn/futa-busline-web-cms-prod/VNPAYFUTA_67_Resize_343_x_184_bd2e13cd77/VNPAYFUTA_67_Resize_343_x_184_bd2e13cd77.png',
            'https://cdn.futabus.vn/futa-busline-web-cms-prod/343x184_ea6055b4a6/343x184_ea6055b4a6.png',
            'https://cdn.futabus.vn/futa-busline-cms-dev/343x184_4x_29d182ce55/343x184_4x_29d182ce55.png'],
        index: 2
    },
    {
        img: [
            'https://cdn.futabus.vn/futa-busline-cms-dev/343x184_4x_29d182ce55/343x184_4x_29d182ce55.png',
            'https://cdn.futabus.vn/futa-busline-web-cms-prod/Zalo_11b66ecb81/Zalo_11b66ecb81.png',
            'https://cdn.futabus.vn/futa-busline-cms-dev/Banner_FUTA_Pay_2_57b0471834/Banner_FUTA_Pay_2_57b0471834.png'],
        index: 3
    }
]

const pages = ListImg.length;
const TitleForm = () => {
    const [currentPage, setCurrenPage] = useState(1);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrenPage((prevPage) => (prevPage % pages) + 1);
        }, 10000)
        return () => clearInterval(interval)
    }, [])
    const handleClick = (pages: number) => {
        setCurrenPage(pages)

    }
    return (
        <div className="title">
            <h1 className="spans">Khuyến mãi nổi bật</h1>
            <div className="listimg">
                {ListImg[currentPage - 1].img.map((img, index) => (
                    <img className="imgTitle" key={index} src={img}></img>
                ))}
            </div>
            <ul className="listdot">
                {ListImg.map((item) => (
                    <li key={item.index}>
                        <div className={`dot ${currentPage === item.index ? 'active' : ''}`} onClick={() => handleClick(item.index)}>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default TitleForm;