import { heIL } from '@mui/x-date-pickers/locales'

import { Stack } from '@mui/material'
const LichTrinhItem = ({ time, kh, index, length }: any) => {
    return (
        <Stack direction="column">
            <Stack direction="row" alignItems="flex-start" spacing={2}>
                <span>{time}</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center", gap: "7px" }}>
                    {index == 0 ? <img src="https://futabus.vn/images/icons/pickup.svg"></img> : <img src="https://futabus.vn/images/icons/pickup_gray.svg"></img>}

                    {index === length ? '' : <div style={{ height: '55px', width: 'auto', padding: 0, borderLeft: "2px dotted green" }}></div>}
                </div>
                <span>{kh}</span>
            </Stack>
        </Stack>
    )
}
export default LichTrinhItem