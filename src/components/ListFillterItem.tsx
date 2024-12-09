import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import ChonGhe from "./TypeButon/ChonGhe";
import LichTrinh from "./TypeButon/LichTrinh";
import TrungChuyen from "./TypeButon/TrungChuyen";
import ChinhSach from "./TypeButon/ChinhSach";
import './ListFillterItem.css'
const ListFillterItem = ({ data }: any) => {
    console.log('data2', data)
    const [avalibleSeat, setAvalibleSeat] = useState(0);
    const [timeStap, setTimeStap] = useState("");
    const [selectButton, setSelectButton] = useState({
        selectghe: false,
        selectlichtrinh: false,
        selecttrungchuyen: false,
        selectchinhsach: false
    })
    const handleOnClick = (name: any) => {
        if (name == "ChonGhe") {
            setSelectButton(prev => ({
                ...prev,
                selectghe: !prev.selectghe,
                selectlichtrinh: false,
                selecttrungchuyen: false,
                selectchinhsach: false
            }));
        }
        if (name == "LichTrinh") {
            setSelectButton(prev => ({
                ...prev,
                selectghe: false,
                selectlichtrinh: !prev.selectlichtrinh,
                selecttrungchuyen: false,
                selectchinhsach: false
            }));
        }
        if (name == "TrungChuyen") {
            setSelectButton(prev => ({
                ...prev,
                selectghe: false,
                selectlichtrinh: false,
                selecttrungchuyen: !prev.selecttrungchuyen,
                selectchinhsach: false
            }));
        }
        if (name == "ChinhSach") {
            setSelectButton(prev => ({
                ...prev,
                selectghe: false,
                selectlichtrinh: false,
                selecttrungchuyen: false,
                selectchinhsach: !prev.selectchinhsach
            }));
        }
    }
    const handleButton = () => {

    }
    useEffect(() => {
        const countSeat = data.dsghe.filter((seat: any) => seat["trangthai"] == "Chưa đặt").length
        console.log('seatttttttttttttttttttttt', countSeat)
        setAvalibleSeat(countSeat);
        const timebd = data.dstuyen[0].time;
        const timekt = data.dstuyen[data.dstuyen.length - 1].time;
        const calulateTime = (start: string, end: string) => {
            const [starHour, starMin] = start.split(':').map(Number);
            const [endHour, endMin] = end.split(':').map(Number);
            let hour = endHour - starHour;
            let min = endMin - starMin;
            if (hour < 0) {
                hour += 24;
            }
            if (min < 0) {
                hour--;
                min += 60;
            }
            return `${hour}:${min}`
        };
        const timeDuration = calulateTime(timebd, timekt);
        setTimeStap(timeDuration)
    }, [data])

    return (
        <div className="col271661">
            <div className="row31223215827">
                <div className="col312322121">
                    <div className="row321111122">
                        <span>{data.dstuyen[0].time}</span>
                        <img src="https://futabus.vn/images/icons/pickup.svg"></img>
                        <div style={{ borderTop: '2px dotted darkgreen', width: '76px', height: '3px', padding: '0px ' }}></div>
                        <div className="col3211217">

                            <span style={{ color: '#637280', lineHeight: '1rem' }}>{timeStap}</span>
                            <span style={{ color: '#637280', lineHeight: '1rem' }}>Asian/Ho Chi Minh</span>
                        </div>
                        <div style={{ borderTop: '2px dotted darkgreen', width: '76px', height: '3px', padding: '0px ' }}></div>
                        <img src="https://futabus.vn/images/icons/station.svg"></img>
                        <span>{data.dstuyen[data.dstuyen.length - 1].time}</span>
                    </div>
                    <div className="row271217171">
                        <span>{data.dstuyen[0].Khoihanh}</span>
                        <span>{data.dstuyen[data.dstuyen.length - 1].Khoihanh}</span>
                    </div>
                </div>
                <div className="col1292137172">
                    <div className="row21812881320">
                        <div></div><span>{data.Loaixe}</span> <div>{avalibleSeat} chỗ trống</div>
                    </div>
                    <div style={{ color: 'red', fontWeight: 'bold' }}>{data.price.toLocaleString('vi-VN')}đ</div>
                </div>
            </div>
            <div className="col2918277">
                <div className="row212881" >
                    <div className="row211812717">
                        <div className={`lciksk ${selectButton.selectghe ? 'active2' : ''}`} onClick={() => handleOnClick("ChonGhe")}><span>Chọn ghế</span></div>
                        <div className={`lciksk ${selectButton.selectlichtrinh ? 'active2' : ''}`} onClick={() => handleOnClick("LichTrinh")}><span>Lịch trình</span></div>
                        <div className={`lciksk ${selectButton.selecttrungchuyen ? 'active2' : ''}`} onClick={() => handleOnClick("TrungChuyen")}><span>Trung chuyển</span></div>
                        <div className={`lciksk ${selectButton.selectchinhsach ? 'active2' : ''}`} onClick={() => handleOnClick("ChinhSach")}><span>Chính sách</span></div>
                    </div>
                    <Button onClick={handleButton}>Chọn chuyến</Button>
                </div>
                {selectButton.selectghe && <ChonGhe data={data.dsghe} lichtrinh={data}></ChonGhe>}
                {selectButton.selectlichtrinh && <LichTrinh data={data.tuyen}></LichTrinh>}
                {selectButton.selecttrungchuyen && <TrungChuyen></TrungChuyen>}
                {selectButton.selectchinhsach && <ChinhSach></ChinhSach>}
            </div>
        </div>)
}
export default ListFillterItem;