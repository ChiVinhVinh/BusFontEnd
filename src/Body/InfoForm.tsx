import InfoTitle from "./InfoTitle";
import './InfoForm.css'
const InfoForm = () => {
    return (
        <div className="containerr">
            <h1>Tuyến phổ biến</h1>
            <h5>Được khách hàng tin tưởng và lựa chọn</h5>
            <div className="inforow">
                <div className="infocol">
                    <img src="https://cdn.futabus.vn/futa-busline-cms-dev/Rectangle_23_2_8bf6ed1d78/Rectangle_23_2_8bf6ed1d78.png"></img>
                    <div className="go">
                        <span>Tuyến xe từ</span>
                        <span><strong>Tp Hồ Chí Minh</strong></span>
                    </div>
                    <InfoTitle title='Đà Lạt' price='290.000đ' info='305km - 8 giờ - 12/11/2024'></InfoTitle>
                    <InfoTitle title='Cần Thơ' price='165.000đ' info='166km - 3 giờ 12 phút -12/11/2024'></InfoTitle>
                    <InfoTitle title='Đà Lạt' price='290.000đ' info='305km - 8 giờ - 12/11/2024'></InfoTitle>
                </div>
                <div className="infocol">
                    <div className="go">
                        <span>Tuyến xe từ</span>
                        <span><strong>Đà Lạt</strong></span>
                    </div>
                    <img src="https://cdn.futabus.vn/futa-busline-cms-dev/Rectangle_23_3_2d8ce855bc/Rectangle_23_3_2d8ce855bc.png"></img>
                    <InfoTitle title='Đà Lạt' price='290.000đ' info='305km - 8 giờ - 12/11/2024'></InfoTitle>
                    <InfoTitle title='Cần Thơ' price='290.000đ' info='305km - 8 giờ - 12/11/2024'></InfoTitle>
                    <InfoTitle title='Đà Lạt' price='290.000đ' info='305km - 8 giờ - 12/11/2024'></InfoTitle>
                </div>
                <div className="infocol">
                    <div className="go">
                        <span>Tuyến xe từ</span>
                        <span><strong>Đà Nẵng</strong></span>
                    </div>
                    <img src="https://cdn.futabus.vn/futa-busline-cms-dev/Rectangle_23_4_061f4249f6/Rectangle_23_4_061f4249f6.png"></img>
                    <InfoTitle title='Đà Lạt' price='290.000đ' info='305km - 8 giờ - 12/11/2024'></InfoTitle>
                    <InfoTitle title='Cần Thơ' price='290.000đ' info='305km - 8 giờ - 12/11/2024'></InfoTitle>
                    <InfoTitle title='Đà Lạt' price='290.000đ' info='305km - 8 giờ - 12/11/2024'></InfoTitle>
                </div>
            </div>
        </div>
    )
}
export default InfoForm;