import BusLineTitle from "./BusLineTitle";
import './BusLine.css'
const BusLine = () => {
    return (
        <div className="containerrr">
            <h1>futa bus lines - Chất lượng là danh dự</h1>
            <h6>Được khách hàng tin tưởng và lựa chọn</h6>
            <div className="rowspi">
                <div className="cold">
                    <BusLineTitle img="https://cdn.futabus.vn/futa-busline-cms-dev/Group_662c4422ba/Group_662c4422ba.svg" title="Hơn 20 Triệu" titlee="Lượt khách" info="Phương Trang phục vụ hơn 20 triệu lượt khách bình quân 1 năm trên toàn quốc"></BusLineTitle>
                    <BusLineTitle img="https://cdn.futabus.vn/futa-busline-cms-dev/Store_55c0da8bd7/Store_55c0da8bd7.svg" title="Hơn 350" titlee="Phòng vé - Bưu cục" info="Phương Trang phục vụ hơn 20 triệu lượt khách bình quân 1 năm trên toàn quốc"></BusLineTitle>
                    <BusLineTitle img="https://cdn.futabus.vn/futa-busline-cms-dev/Group_2_75b5ed1dfd/Group_2_75b5ed1dfd.svg" title="Hơn 1,000" titlee="Chuyến xe" info="Phương Trang phục vụ hơn 1,000 chuyến xe đường dài và liên tỉnh mỗi ngày"></BusLineTitle>
                </div>
                <img className="imgBus" src="https://cdn.futabus.vn/futa-busline-cms-dev/image_f922bef1bb/image_f922bef1bb.svg"></img>
            </div>
        </div>
    )
}
export default BusLine;