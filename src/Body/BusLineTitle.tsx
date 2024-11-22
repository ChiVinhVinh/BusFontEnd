import './BusLineTitle.css'
const BusLineTitle = ({ img, title, titlee, info }: any) => {
    return (
        <div className="rowtttt">
            <img src={img}></img>
            <div className="colttt">
                <div className="rowInfo">
                    <span>{title}</span>
                    <span>{titlee}</span>
                </div>
                <span className='infobusss'>{info}</span>
            </div>
        </div>
    )
}
export default BusLineTitle;