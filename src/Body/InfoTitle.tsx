import './InfoTitle.css'
const InfoTitle = ({ title, price, info }: any) => {
    return (
        <div className="col">
            <div className="row">
                <span>{title}</span>
                <span>{price}</span>
            </div>
            <span>{info}</span>
        </div>
    )
}
export default InfoTitle;