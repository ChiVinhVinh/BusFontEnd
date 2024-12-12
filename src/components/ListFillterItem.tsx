import { Button, Stack, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ChonGhe from "./TypeButon/ChonGhe";
import LichTrinh from "./TypeButon/LichTrinh";
import TrungChuyen from "./TypeButon/TrungChuyen";
import ChinhSach from "./TypeButon/ChinhSach";

const ListFillterItem = ({ data }: any) => {
    const [avalibleSeat, setAvalibleSeat] = useState(0);
    const [timeStap, setTimeStap] = useState("");
    const [selectButton, setSelectButton] = useState({
        selectghe: false,
        selectlichtrinh: false,
        selecttrungchuyen: false,
        selectchinhsach: false
    });

    const handleOnClick = (name: any) => {
        setSelectButton(prev => ({
            ...prev,
            selectghe: name === "ChonGhe" ? !prev.selectghe : false,
            selectlichtrinh: name === "LichTrinh" ? !prev.selectlichtrinh : false,
            selecttrungchuyen: name === "TrungChuyen" ? !prev.selecttrungchuyen : false,
            selectchinhsach: name === "ChinhSach" ? !prev.selectchinhsach : false
        }));
    };

    useEffect(() => {
        const countSeat = data.dsghe.filter((seat: any) => seat["trangthai"] === "Chưa đặt").length;
        setAvalibleSeat(countSeat);

        const timebd = data.dstuyen[0].time;
        const timekt = data.dstuyen[data.dstuyen.length - 1].time;

        const calculateTime = (start: string, end: string) => {
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
            return `${hour}:${min}`;
        };

        const timeDuration = calculateTime(timebd, timekt);
        setTimeStap(timeDuration);
    }, [data]);
    const handleButton = () => { }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', borderRadius: '0.75rem', boxShadow: '0 0 0 1px rgba(0, 0, 0, .05), inset 0 0 0 1px #d1d5db', width: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ borderBottom: '1px outset gray', padding: '1rem' }}>
                <Stack direction="column" alignItems="flex-start">
                    <Stack direction="row" alignItems="center" gap="1rem">
                        <Typography>{data.dstuyen[0].time}</Typography>
                        <Box component="img" src="https://futabus.vn/images/icons/pickup.svg" />
                        <Box sx={{ borderTop: '2px dotted darkgreen', width: '76px', height: '3px', padding: '0' }} />
                        <Stack direction="column">
                            <Typography sx={{ color: '#637280', lineHeight: '1rem' }}>{timeStap}</Typography>
                            <Typography sx={{ color: '#637280', lineHeight: '1rem' }}>Asian/Ho Chi Minh</Typography>
                        </Stack>
                        <Box sx={{ borderTop: '2px dotted darkgreen', width: '76px', height: '3px', padding: '0' }} />
                        <Box component="img" src="https://futabus.vn/images/icons/station.svg" />
                        <Typography>{data.dstuyen[data.dstuyen.length - 1].time}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" width="100%">
                        <Typography>{data.dstuyen[0].Khoihanh}</Typography>
                        <Typography>{data.dstuyen[data.dstuyen.length - 1].Khoihanh}</Typography>
                    </Stack>
                </Stack>
                <Stack direction="column">
                    <Stack direction="row" gap="2px">
                        <div></div>
                        <Typography>{data.Loaixe}</Typography>
                        <div>{avalibleSeat} chỗ trống</div>
                    </Stack>
                    <Typography sx={{ color: 'red', fontWeight: 'bold' }}>{data.price.toLocaleString('vi-VN')}đ</Typography>
                </Stack>
            </Stack>
            <Stack direction="column">
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ padding: '0.5rem 1rem' }}>
                    <Stack direction="row" gap="2rem">
                        <Box sx={{ cursor: 'pointer', ...(selectButton.selectghe && { color: 'red', borderBottom: '2px solid red' }) }} onClick={() => handleOnClick("ChonGhe")}><Typography>Chọn ghế</Typography></Box>
                        <Box sx={{ cursor: 'pointer', ...(selectButton.selectlichtrinh && { color: 'red', borderBottom: '2px solid red' }) }} onClick={() => handleOnClick("LichTrinh")}><Typography>Lịch trình</Typography></Box>
                        <Box sx={{ cursor: 'pointer', ...(selectButton.selecttrungchuyen && { color: 'red', borderBottom: '2px solid red' }) }} onClick={() => handleOnClick("TrungChuyen")}><Typography>Trung chuyển</Typography></Box>
                        <Box sx={{ cursor: 'pointer', ...(selectButton.selectchinhsach && { color: 'red', borderBottom: '2px solid red' }) }} onClick={() => handleOnClick("ChinhSach")}><Typography>Chính sách</Typography></Box>
                    </Stack>
                    <Button onClick={handleButton}>Chọn chuyến</Button>
                </Stack>
                {selectButton.selectghe && <ChonGhe data={data.dsghe} lichtrinh={data} />}
                {selectButton.selectlichtrinh && <LichTrinh data={data.dstuyen} />}
                {selectButton.selecttrungchuyen && <TrungChuyen />}
                {selectButton.selectchinhsach && <ChinhSach />}
            </Stack>
        </Box>
    );
};

export default ListFillterItem;
