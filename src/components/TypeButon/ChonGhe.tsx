import { useState } from 'react'
import './ChonGhe.css'
import { Button } from '@mui/material';

const ChonGhe = ({ data: initialData, lichtrinh }: any) => {
    const [data, setData] = useState(initialData);
    const [selectedCount, setSelectedCount] = useState(0);
    const [listVe, SetListVe] = useState<string[]>([])
    const MAX_SEATS = 5;

    console.log("dataaaaaaaaaaaa", data)
    const handleClickPost = async () => {
        try {
            for (const ghe of listVe) {
                const Ve = {
                    maghe: ghe,
                    idLichTrinh: lichtrinh.idLichTrinh,
                    noidi: lichtrinh.noidi,
                    noiden: lichtrinh.noiden,
                    ngaydi: lichtrinh.ngaydi,
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
            const updatedDsghe = lichtrinh.dsghe.map((ghe: any) => {
                console.log()
                if (listVe.includes(ghe.ghe)) {
                    return {
                        ...ghe,
                        trangthai: "Đặt"
                    };
                }
                return ghe;
            });

            console.log("updategheeeeeeee", updatedDsghe)
            console.log("updateltttttttttttttttt", lichtrinh)
            const datalt = await fetch(`http://localhost:8080/lichtrinh/${lichtrinh.idLichTrinh}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(
                    lichtrinh
                ),
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
    const handleClick = (seat: any) => {
        const index = data.findIndex((item: any) => item.ghe === seat.ghe);
        if (index === -1) return;

        if (data[index].trangthai === "Chọn") {
            const newData = [...data];
            newData[index] = {
                ...newData[index],
                trangthai: "Chưa đặt"
            };
            setData(newData);
            setSelectedCount(prev => prev - 1);
            SetListVe(prev => prev.filter(v => v !== seat.ghe));
            return;
        }
        if (data[index].trangthai === "Chưa đặt") {
            if (selectedCount >= MAX_SEATS) {
                alert("Bạn chỉ được chọn tối đa 5 ghế!");
                return;
            }

            const newData = [...data];
            newData[index] = {
                ...newData[index],
                trangthai: "Chọn"
            };
            setData(newData);
            setSelectedCount(prev => prev + 1);
            SetListVe(prev => [...prev, seat.ghe]);
        }
    }
    const Rowtd = (rowSeats: any, start: any) => {
        const seatsInRow = Array(5).fill(null);

        rowSeats.forEach((seat: any) => {
            const position = (seat.vitri - start) % 5;
            if (position >= 0 && position < seatsInRow.length) {
                seatsInRow[position] = seat;
            }
        });
        return (
            <tr>
                {seatsInRow.map((seat, index) =>
                    seat ? (
                        <td key={index} onClick={() => handleClick(seat)}>
                            <img
                                src={
                                    seat.trangthai === "Đặt"
                                        ? "https://futabus.vn/images/icons/seat_disabled.svg"
                                        : seat.trangthai === "Chọn"
                                            ? "https://futabus.vn/images/icons/seat_selecting.svg"
                                            : "https://futabus.vn/images/icons/seat_active.svg"
                                }
                                alt="seat"
                            />
                            <span>{seat.ghe}</span>
                        </td>
                    ) : (
                        <td key={index}></td>
                    )
                )}
            </tr>
        );
    };
    const renderSeat = () => {
        const upperFloorSeats = data.filter((seat: any) => seat.vitri % 2 === 0);
        const lowerFloorSeats = data.filter((seat: any) => seat.vitri % 2 !== 0);
        return (

            <div className="rowdasdasads">
                <div className="floor lower-floor">
                    <h3>Tầng dưới</h3>
                    <table>
                        <tbody>
                            {Array.from({ length: Math.ceil(30 / 5) }, (_, i) =>
                                Rowtd(
                                    lowerFloorSeats.filter(
                                        (seat: any) =>
                                            seat.vitri > i * 10 && seat.vitri <= (i + 1) * 10
                                    ),
                                    i * 10 + 1,
                                )
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="floor upper-floor">
                    <h3>Tầng trên</h3>
                    <table>
                        <tbody>
                            {Array.from({ length: Math.ceil(30 / 5) }, (_, i) =>
                                Rowtd(
                                    upperFloorSeats.filter(
                                        (seat: any) =>
                                            seat.vitri > i * 10 && seat.vitri <= (i + 1) * 10
                                    ),
                                    i * 10 + 1,

                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };
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
            {renderSeat()}
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