import ListFillterItem from "./ListFillterItem";
import './ListFillter.css'
import { useContext, useEffect, useState } from "react";
import { FillterFormContext } from "./FillterFormContext";
import _, { result } from 'lodash';
const ListFillter = ({ data }: any) => {
    const [clickButton, setClickButton] = useState({
        selectGhe: false,
        selecTime: true,
        selectCost: true
    })

    const [searchData, setSearchData] = useState(data)
    console.log("sadsaddsadadasdsadasasdsadsadadsadsdsa", searchData)
    const context = useContext(FillterFormContext);
    if (!context) {
        throw new Error('useFilterForm must be used within a FillterFormProvider');
    }

    useEffect(() => {
        let sortdata = [...data]
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
                const [hours, minuates] = item.dstuyen[0].timebd.split(':');
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
        setSearchData(sortdata)
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    }, [clickButton])
    const { selectedFilters } = context;
    console.log("selectedFiltersselectedFilters", selectedFilters)
    useEffect(() => {
        let filteredData = [...data];
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
        setSearchData(filteredData)
    }, [selectedFilters, data]);
    const handOnClick = (name: any) => {
        setClickButton(prev => ({
            ...prev,
            selectCost: name === "Giá rẻ bất ngờ" ? !prev.selectCost : prev.selectCost,
            selecTime: name === "Giờ khởi hành" ? !prev.selecTime : prev.selecTime,
            selectGhe: name === "Ghế trống" ? !prev.selectGhe : prev.selectGhe
        }));
    }
    console.log('data1', data)
    return (
        <div className="col21312312">
            {data && data.length > 0 ? (
                <div className="col312211">
                    <span style={{ fontSize: '1.25rem', lineHeight: '1.75rem' }}>{data[0].noidi}-{data[0].noiden}({data.length})</span>
                    <div className="row5712d">
                        <div className={`row821717 ${clickButton.selectCost ? 'active1' : ''}`} onClick={() => handOnClick("Giá rẻ bất ngờ")}>
                            <img style={{ width: "20px", height: "20px" }} src={'https://futabus.vn/images/icons/save_money.svg'}></img>
                            <span style={{ fontSize: '16px' }}>Giá rẻ bất ngờ</span>

                        </div>
                        <div className={`row821717 ${clickButton.selecTime ? 'active1' : ''}`} onClick={() => handOnClick("Giờ khởi hành")}>
                            <img style={{ width: "20px", height: "20px" }} src={'https://futabus.vn/images/icons/clock.svg'}></img>
                            <span style={{ fontSize: '16px' }}>Giờ khởi hành</span>
                        </div>
                        <div className={`row821717 ${clickButton.selectGhe ? 'active1' : ''}`} onClick={() => handOnClick("Ghế trống")}>
                            <img style={{ width: "20px", height: "20px" }} src={'https://futabus.vn/images/icons/seat.svg'}></img>
                            <span style={{ fontSize: '16px' }}>Ghế trống</span>
                        </div>
                    </div>
                    {searchData.map((item: any, index: number) => (
                        <ListFillterItem key={index} data={item} />
                    ))}
                </div>) : <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span>Không có chuyến đi nào</span>
                <img style={{ width: "20rem", height: '20rem' }} src="https://futabus.vn/images/empty_list.svg"></img>
            </div>}
        </div>
    )
}

export default ListFillter;