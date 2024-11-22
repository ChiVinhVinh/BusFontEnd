import ListFillterItem from "./ListFillterItem";
import './ListFillter.css'
import { useContext, useEffect, useState } from "react";
import { FillterFormContext } from "./FillterFormContext";
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
    const { selectedFilters } = context;
    // useEffect(() => {

    //     let start: any[] = data;

    //     console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", searchData)
    //     if (selectedFilters.seat.length > 0) {
    //         let final: any[] = [];
    //     }
    //     if (selectedFilters.flow.length > 0) {
    //         let final: any[] = [];
    //     }
    //     if (selectedFilters.type.length > 0) {
    //         let final: any[] = [];
    //     }
    //     setSearchData(start)
    //     console.log("dsasadsaasasdasadadasd", searchData)
    // }, [selectedFilters])
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
                    <span style={{ fontSize: '1.25rem', lineHeight: '1.75rem' }}>{data[0].noiDi}-{data[0].noiDen}({data.length})</span>
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
                    {data.map((item: any, index: number) => (
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