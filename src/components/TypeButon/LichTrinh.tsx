import LichTrinhItem from "./LichTrinhItem";
const LichTrinh = ({ data }: any) => {
    console.log("ccccc", data)
    return (
        data.map((item: any, index: number) => (<LichTrinhItem key={index} index={index} length={data.length - 1} time={item.time} kh={item.Khoihanh}></LichTrinhItem>))
    )
}
export default LichTrinh;