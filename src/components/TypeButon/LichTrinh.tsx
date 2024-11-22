import LichTrinhItem from "./LichTrinhItem";
const LichTrinh = ({ data }: any) => {
    return (
        data.map((item: any, index: number) => (<LichTrinhItem key={index} index={index} length={data.length - 1} timebd={item.timebd} timekt={item.timekt} kh={item.kh} kt={item.kt}></LichTrinhItem>))
    )
}
export default LichTrinh;