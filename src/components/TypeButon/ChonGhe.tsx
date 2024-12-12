import { useState } from 'react'

import { Box, Button, Stack } from '@mui/material';

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

            <Stack direction="row" spacing={5}>
                <div>
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
                <div>
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
            </Stack>
        );
    };
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '5rem'
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <Box sx={{
                        width: '1rem',
                        height: '1rem',
                        backgroundColor: 'rgb(213 217 221/ 1) !important',
                        borderRadius: '0.25rem'
                    }}></Box>
                    <span>Đã bán</span>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <Box sx={{
                        width: '1rem',
                        height: '1rem',
                        backgroundColor: 'rgb(222 243 255/ 1) !important',
                        borderRadius: '0.25rem'
                    }}></Box>
                    <span>Còn trống</span>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <Box sx={{
                        width: '1rem',
                        height: '1rem',
                        backgroundColor: 'rgba(248, 221, 221, 0.966) !important',
                        borderRadius: '0.25rem'
                    }}></Box>
                    <span>Đang chọn</span>
                </Box>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '2rem',
                '& table': {
                    borderCollapse: 'separate',
                    borderSpacing: '10px'
                },
                '& td': {
                    cursor: 'pointer',
                    textAlign: 'center',
                    position: 'relative',
                    width: '32px',
                    height: '32px',
                    '& img': {
                        width: '32px',
                        height: '32px',
                        position: 'absolute',
                        top: 0,
                        left: 0
                    },
                    '& span': {
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: '10px',
                        color: '#333',
                        zIndex: 2,
                        pointerEvents: 'none'
                    }
                },
                '& .disabled-seat': {
                    opacity: 0.6,
                    cursor: 'not-allowed',
                    '& span': {
                        color: '#999'
                    }
                },
                '& .seat-count-info': {
                    padding: '10px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '4px',
                    margin: '10px 0'
                }
            }}>
                {renderSeat()}
            </Box>

            <Box sx={{
                height: '5rem',
                borderTop: '2px solid red',
                width: '100%'
            }}>
                {selectedCount > 0 ? (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start'
                        }}>
                            <span>{selectedCount}Vé</span>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row'
                            }}>
                                {listVe.map((item, index) => (
                                    <span key={index}> {item}{index < listVe.length - 1 ? ',' : ''}</span>
                                ))}
                            </Box>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <span>Tổng tiền</span>
                                <span>{lichtrinh.price * selectedCount}</span>
                            </Box>
                            <Button onClick={handleClickPost}>Chọn</Button>
                        </Box>
                    </Box>
                ) : ''}
            </Box>
        </Box>
    )
}
export default ChonGhe;