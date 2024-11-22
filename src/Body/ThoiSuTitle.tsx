import './ThoiSuTitle.css'
const ThoiSuTitle = ({ img, title, date }: any) => {
    return (
        <div className="col19">
            <img src={img}></img>
            <span className='ik'>{title}</span>
            <div className="row78">
                <span>{date}</span>
                <div className='row88'>
                    <span>Chi tiết</span>
                    <img src="https://futabus.vn/images/icons/arrow.svg"></img>
                </div>
            </div>
        </div>
    )
}
export default ThoiSuTitle;
