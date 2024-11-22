import { heIL } from '@mui/x-date-pickers/locales'
import './LichTrinhItem.css'
const LichTrinhItem = ({ timebd, timekt, kh, kt, index, length }: any) => {
    return (
        <div className='col821717'>
            <div className='row291818'>
                <span>{timebd}</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center", gap: "7px" }}>
                    {index == 0 ? <img src="https://futabus.vn/images/icons/pickup.svg"></img> : <img src="https://futabus.vn/images/icons/pickup_gray.svg"></img>}

                    <div style={{ height: '55px', width: 'auto', padding: 0, borderLeft: "2px dotted green" }}></div>
                </div>
                <span>{kh}</span>
            </div>
            <div className='row291818'>
                <span>{timekt}</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center", gap: "7px" }}>
                    <img src="https://futabus.vn/images/icons/pickup_gray.svg"></img>
                    {index == length ? '' : <div style={{ height: '50px', width: 'auto', padding: 0, borderLeft: "2px dotted green" }}></div>}
                </div>
                <span>{kt}</span>
            </div>
        </div>
    )
}
export default LichTrinhItem