import { useState } from 'react'
import './ChonGhe.css'
import { Button } from '@mui/material';

const ChonGhe = ({ data: initialData, lichtrinh }: any) => {
    const [data, setData] = useState(initialData);
    const [selectedCount, setSelectedCount] = useState(0);
    const [listVe, SetListVe] = useState<string[]>([])
    const MAX_SEATS = 5;
    const handleClickPost = async () => {
        try {
            for (const ghe of listVe) {
                const Ve = {
                    maghe: ghe,
                    noidi: lichtrinh.noiDi,
                    noiden: lichtrinh.noiDen,
                    ngaydi: lichtrinh.ngayDi,
                    price: lichtrinh.price
                }
                const respone = await fetch('http://localhost:8080/api', {
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json',
                    },
                    body: JSON.stringify(Ve)
                });
                if (!respone.ok) {
                    throw new Error("Không thể đặt vé")
                }
            }
            alert("Đặt vé thành công")
            const updatedDsghe = data.map((ghe: any) => {
                if (listVe.includes(ghe.ghe)) {
                    return {
                        ...ghe,
                        trangThai: "Đặt"
                    };
                }
                return ghe;
            });
            console.log("updategheeeeeeee", updatedDsghe)
            const datalt = await fetch(`http://localhost:8080/lichtrinh/${lichtrinh.idLichTrinh}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(updatedDsghe),

            });
            if (!datalt.ok) {
                throw new Error("Khong the set lich trinh")
            }

            setData(updatedDsghe)
            SetListVe([])
            setSelectedCount(0)

        } catch (err) {
            console.error("Lỗi khi đặt vé:", err)
            alert('Có lỗi xảy ra khi đặt vé!');
        }
    }
    const handleClick = (index: number, seat: string) => {
        if (data[index].trangThai === "Chọn") {
            const newData = [...data];
            newData[index] = {
                ...newData[index],
                trangThai: "Chưa đặt"
            };
            setData(newData);
            setSelectedCount(prev => prev - 1);
            SetListVe(prev => prev.filter(seat => seat !== seat));
            return;
        }
        if (data[index].trangThai === "Chưa đặt") {
            if (selectedCount >= MAX_SEATS) {
                alert("Bạn chỉ được chọn tối đa 5 ghế!");
                return;
            }

            const newData = [...data];
            newData[index] = {
                ...newData[index],
                trangThai: "Chọn"
            };

            setData(newData);
            setSelectedCount(prev => prev + 1);
            SetListVe(prev => [...prev, seat]);
        }
    }

    const renderSeat = (index: number, seatNumber: string) => {
        const seat = data[index];
        if (seat.trangThai === "Đặt") {
            return (
                <td className="disabled-seat">
                    <img src="https://futabus.vn/images/icons/seat_disabled.svg" alt="seat" />
                    <span>{seatNumber}</span>
                </td>
            );
        }

        return (
            <td onClick={() => handleClick(index, seatNumber)}>
                {seat.trangThai === "Chưa đặt" && <img src="https://futabus.vn/images/icons/seat_active.svg" alt="seat" />}
                {seat.trangThai === "Chọn" && <img src="https://futabus.vn/images/icons/seat_selecting.svg" alt="seat" />}
                <span>{seatNumber}</span>
            </td>
        );
    }

    return (
        <div className='col2318127u'>
            <div className="row32171277">
                <div className='row21881'>
                    <div className='ds218'></div>
                    <span>Đã bán</span>
                </div>
                <div className='row21881'>
                    <div className='ds21834'></div>
                    <span>Còn trống</span>
                </div>
                <div className='row21881'>
                    <div className='ds218222'></div>
                    <span>Đang chọn</span>
                </div>
            </div>
            <div className="rowdasdasads">
                <div className=''>
                    <span>Tầng dưới</span>
                    <table>
                        <tbody>
                            <tr>
                                {renderSeat(0, "A01")}
                                <td></td>
                                <td></td>
                                <td></td>
                                {renderSeat(1, "A02")}
                            </tr>
                            <tr>
                                {renderSeat(2, "A03")}
                                <td></td>
                                {renderSeat(3, "A04")}
                                <td></td>
                                {renderSeat(4, "A05")}
                            </tr>
                            <tr>
                                {renderSeat(5, "A06")}
                                <td></td>
                                {renderSeat(6, "A07")}
                                <td></td>
                                {renderSeat(7, "A08")}
                            </tr>
                            <tr>
                                {renderSeat(8, "A09")}
                                <td></td>
                                {renderSeat(9, "A10")}
                                <td></td>
                                {renderSeat(10, "A11")}
                            </tr>
                            <tr>
                                {renderSeat(11, "A12")}
                                <td></td>
                                {renderSeat(12, "A13")}
                            </tr>
                            <tr>
                                {renderSeat(13, "A14")}
                                {renderSeat(14, "A15")}
                                <td></td>
                                {renderSeat(15, "A16")}
                                {renderSeat(16, "A17")}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <span>Tầng trên</span>
                    <table>
                        <tbody>
                            <tr>
                                {renderSeat(17, "B01")}
                                <td></td>
                                <td></td>
                                <td></td>
                                {renderSeat(18, "B02")}
                            </tr>
                            <tr>
                                {renderSeat(19, "B03")}
                                <td></td>
                                {renderSeat(20, "B04")}
                                <td></td>
                                {renderSeat(21, "B05")}
                            </tr>
                            <tr>
                                {renderSeat(22, "B06")}
                                <td></td>
                                {renderSeat(23, "B07")}
                                <td></td>
                                {renderSeat(24, "B08")}
                            </tr>
                            <tr>
                                {renderSeat(25, "B09")}
                                <td></td>
                                {renderSeat(26, "B10")}
                                <td></td>
                                {renderSeat(27, "B11")}
                            </tr>
                            <tr>
                                {renderSeat(28, "B12")}
                                <td></td>
                                {renderSeat(29, "B13")}
                            </tr>
                            <tr>
                                {renderSeat(30, "B14")}
                                {renderSeat(31, "B15")}
                                <td></td>
                                {renderSeat(32, "B16")}
                                {renderSeat(33, "B17")}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div style={{ height: '5rem', borderTop: '2px soild red', width: '100%' }}>
                {selectedCount > 0 ? <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <span>{selectedCount}Vé</span>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            {listVe.map((item, index) => <span key={index}> {item}{index < listVe.length - 1 ? ',' : ''}</span>)}
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span>Tổng tiền</span>
                            <span>{lichtrinh.price * selectedCount}</span>
                        </div>
                        <Button onClick={handleClickPost}>Chọn</Button>
                    </div>
                </div> : ''}
            </div>
        </div>
    )
}

export default ChonGhe;