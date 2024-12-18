import ListFillterItem from "./ListFillterItem";
import { useContext, useEffect, useState } from "react";
import { FillterFormContext } from "./FillterFormContext";
import _, { result } from 'lodash';
import { Button, Stack } from "@mui/material";
import { Filter } from "@mui/icons-material";
const ListFillter = () => {
    const [clickButton, setClickButton] = useState({
        selectGhe: false,
        selecTime: true,
        selectCost: true
    })

    const context = useContext(FillterFormContext);
    if (!context) {
        throw new Error('useFilterForm must be used within a FillterFormProvider');
    }
    const { dataTrip, dataTripBack, selectedFilters, isReturn, setIsReturn } = context;
    const currentData = isReturn ? dataTripBack : dataTrip;
    const [filteredData, setFilteredData] = useState(currentData);
    console.log("currentDatacurrentData", currentData)
    useEffect(() => {
        setFilteredData(currentData)
    }, [currentData])
    const formatDate = (dateString: string, format: string) => {
        const [day, month, year] = dateString.split('/');
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        const patterns: { [key: string]: () => string } = {
            'DD': () => day.padStart(2, '0'),
            'MM': () => month.padStart(2, '0'),
            'YYYY': () => year,
            'Day': () => {
                const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
                return days[date.getDay()];
            },
        };
        return format.replace(/DD|MM|YYYY|Day/g, match => patterns[match]());
    };

    const [tripDayInfo, setTripDayInfo] = useState('');
    const [tripBackDayInfo, setTripBackDayInfo] = useState('');

    useEffect(() => {
        if (dataTrip?.length > 0) {
            setTripDayInfo(formatDate(dataTrip[0].ngaydi, 'Day, DD/MM'));
        }
        if (dataTripBack?.length > 0) {
            setTripBackDayInfo(formatDate(dataTripBack[0].ngaydi, 'Day, DD/MM'));
        }
    }, [dataTripBack, dataTrip]);
    useEffect(() => {
        let sortdata = [...currentData]
        let sortConditions: any[] = [];
        const sortOrders: any[] = [];
        if (clickButton.selectGhe) {
            sortConditions.push((item: any) => {
                return item.dsghe.filter((ghe: any) => ghe.trangthai === "Chưa đặt").length;
            });
            sortOrders.push('desc');
        }
        if (clickButton.selecTime) {
            sortConditions.push((item: any) => {
                const [hours, minuates] = item.dstuyen[0].time.split(':');
                return parseInt(hours) * 60 + parseInt(minuates);
            });
            sortOrders.push('asc');
        }
        if (clickButton.selectCost) {
            sortConditions.push('price');
            sortOrders.push('asc')
        }
        if (sortConditions.length > 0) {
            sortdata = _.orderBy(sortdata, sortConditions, sortOrders);
        }
        setFilteredData(sortdata)
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    }, [clickButton])
    console.log("selectedFiltersselectedFilters", selectedFilters)

    useEffect(() => {
        let filteredData = [...currentData];
        if (selectedFilters.time.length > 0) {
            filteredData = filteredData.filter(item => {
                const [itemHour, itemMin] = item.dstuyen[0].time.split(':');
                const itemTime = parseInt(itemHour) * 60 + parseInt(itemMin);
                return selectedFilters.time.some(timeRange => {
                    const [start, end] = timeRange.split('-');
                    const [startHour, starMin] = start.split(':');
                    const [endHour, endMin] = end.split(':');
                    const starTime = parseInt(startHour) * 60 + parseInt(starMin);
                    const endTime = parseInt(endHour) * 60 + parseInt(endMin);
                    return itemTime >= starTime && itemTime < endTime;
                })
            })
        }
        if (selectedFilters.seat.length > 0) {
            filteredData = filteredData.filter(item => {
                const avalabSeat = item.dsghe.filter((ghe: any) => ghe.trangthai === "Chưa đặt").map((ghe: any) => ghe.ghe)
                const HangDau = ['A01', 'A02', 'A03', 'A04', 'A05', 'B01', 'B02', 'B03', 'B04', 'B05'];
                const HangGiua = ['A06', 'A07', 'A08', 'A09', 'A10', 'A11', 'B06', 'B07', 'B08', 'B09', 'B10', 'B11'];
                const Hangcuoi = ['A12', 'A13', 'A14', 'A15', 'A16', 'A17', 'B12', 'B13', 'B14', 'B15', 'B16', 'B17'];
                const Hangdauseat = selectedFilters.seat.includes("Hàng đầu") && avalabSeat.some((seat: any) => HangDau.includes(seat));
                const Hanggiuaseat = selectedFilters.seat.includes("Hàng giữa") && avalabSeat.some((seat: any) => HangGiua.includes(seat));
                const Hangcuoiseat = selectedFilters.seat.includes("Hàng cuối") && avalabSeat.some((seat: any) => Hangcuoi.includes(seat));
                return Hangdauseat || Hanggiuaseat || Hangcuoiseat
            })
        }
        if (selectedFilters.flow.length > 0) {
            filteredData = filteredData.filter(item => {
                const avalabSeat = item.dsghe.filter((ghe: any) => ghe.trangthai === "Chưa đặt").map((ghe: any) => ghe.ghe)
                console.log("avalabSeatavalabSeatavalabSeat", avalabSeat)
                const hasTangTren = selectedFilters.flow.includes("Tầng trên") &&
                    avalabSeat.some((seat: any) => seat.startsWith('A'));
                console.log("hasTangTrenhasTangTren", hasTangTren)
                const hasTangDuoi = selectedFilters.flow.includes("Tầng dưới") &&
                    avalabSeat.some((seat: any) => seat.startsWith('B'));
                return hasTangTren || hasTangDuoi
            })
        }
        if (selectedFilters.type.length > 0) {
            filteredData = filteredData.filter(item => {
                return selectedFilters.type.some(type => {
                    return item.Loaixe.toLowerCase() === type.toLowerCase();
                });
            });
        }
        console.log("filteredDatafilteredData", filteredData)
        setFilteredData(filteredData)
    }, [selectedFilters]);
    const handOnClick = (name: any) => {
        setClickButton(prev => ({
            ...prev,
            selectCost: name === "Giá rẻ bất ngờ" ? !prev.selectCost : prev.selectCost,
            selecTime: name === "Giờ khởi hành" ? !prev.selecTime : prev.selecTime,
            selectGhe: name === "Ghế trống" ? !prev.selectGhe : prev.selectGhe
        }));
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: "10px"
            }}
        >

            {filteredData && filteredData.length > 0 ? (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        gap: '20px',
                    }}
                >
                    <span style={{ fontSize: '1.25rem', lineHeight: '1.75rem' }}>
                        {filteredData[0].noidi}-{filteredData[0].noiden}({filteredData.length})
                    </span>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '20px',
                        }}
                    >
                        <div
                            onClick={() => handOnClick('Giá rẻ bất ngờ')}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '5px',
                                padding: '3px 20px',
                                cursor: 'pointer',
                                border: clickButton.selectCost ? '1px solid red' : '1px solid black',
                                borderRadius: '5px',
                                backgroundColor: clickButton.selectCost ? '#FFFFE0' : 'white',
                                color: clickButton.selectCost ? '#EF5222' : 'inherit',
                            }}
                        >
                            <img
                                style={{ width: '20px', height: '20px' }}
                                src={'https://futabus.vn/images/icons/save_money.svg'}
                                alt="icon"
                            />
                            <span style={{ fontSize: '16px' }}>Giá rẻ bất ngờ</span>
                        </div>
                        <div
                            onClick={() => handOnClick('Giờ khởi hành')}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '5px',
                                padding: '3px 20px',
                                cursor: 'pointer',
                                border: clickButton.selecTime ? '1px solid red' : '1px solid black',
                                borderRadius: '5px',
                                backgroundColor: clickButton.selecTime ? '#FFFFE0' : 'white',
                                color: clickButton.selecTime ? '#EF5222' : 'inherit',
                            }}
                        >
                            <img
                                style={{ width: '20px', height: '20px' }}
                                src={'https://futabus.vn/images/icons/clock.svg'}
                                alt="icon"
                            />
                            <span style={{ fontSize: '16px' }}>Giờ khởi hành</span>
                        </div>
                        <div
                            onClick={() => handOnClick('Ghế trống')}
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '5px',
                                padding: '3px 20px',
                                cursor: 'pointer',
                                border: clickButton.selectGhe ? '1px solid red' : '1px solid black',
                                borderRadius: '5px',
                                backgroundColor: clickButton.selectGhe ? '#FFFFE0' : 'white',
                                color: clickButton.selectGhe ? '#EF5222' : 'inherit',
                            }}
                        >
                            <img
                                style={{ width: '20px', height: '20px' }}
                                src={'https://futabus.vn/images/icons/seat.svg'}
                                alt="icon"
                            />
                            <span style={{ fontSize: '16px' }}>Ghế trống</span>
                        </div>
                    </div>
                    {dataTripBack && dataTripBack.length > 0 && (
                        <Stack direction="row" spacing={5} width="100%" justifyContent="center" sx={{ backgroundColor: "white" }}>
                            <Button
                                onClick={() => setIsReturn(false)}
                                sx={{ fontSize: '18px', color: isReturn ? 'black' : 'red', borderBottom: isReturn ? '' : '4px solid red', width: "50%" }}
                            >
                                CHUYẾN ĐI-{tripDayInfo}
                            </Button>
                            <Button
                                onClick={() => setIsReturn(true)}
                                sx={{ fontSize: '18px', color: isReturn ? 'red' : 'black', borderBottom: isReturn ? '4px solid red' : '', width: "50%" }}
                            >
                                CHUYẾN VỀ-{tripBackDayInfo}
                            </Button>
                        </Stack>
                    )}
                    {filteredData.map((item: any, index: number) => (
                        <ListFillterItem key={index} data={item} />
                    ))}
                </div>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <span>Không có chuyến đi nào</span>
                    <img
                        style={{ width: '20rem', height: '20rem' }}
                        src="https://futabus.vn/images/empty_list.svg"
                        alt="empty"
                    />
                </div>
            )}
        </div>

    )
}
export default ListFillter;