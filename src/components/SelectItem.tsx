import { Box, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { FillterFormContext } from "./FillterFormContext";

const SelectItem = () => {
    const context = useContext(FillterFormContext);
    if (!context) {
        throw new Error('Fail');
    }
    const { selectedItem } = context;

    if (!selectedItem.item) {
        return null;
    }
    const data = selectedItem.item;
    console.log("ccccccc", data)
    console.log("selecItemselecItemselecItem", selectedItem)
    return (
        <Stack direction="column" alignItems="flex-start" sx={{ backgroundColor: "white", width: "360px", borderRadius: "10px", boxShadow: '0px 1px 8px rgba(0, 0, 1, 1)' }}>
            <div style={{ borderBottom: "2px solid black", width: "100%", textTransform: "uppercase", textAlign: "left", padding: "20px 30px" }}>Chuyến đi của bạn</div>
            <Stack direction="column" sx={{ borderLeft: "7px solid red", padding: "15px" }}>
                <Stack direction="row" spacing={2} >
                    <Box sx={{ width: "32px", height: "32px", backgroundColor: "red", display: "flex", justifyContent: "center" }}>
                        1
                    </Box>
                    <Stack direction="column">
                        <Typography></Typography>
                        <Typography>{data.dstuyen[0].Khoihanh.split(' ').slice(2).join(' ')} - {data.dstuyen[data.dstuyen.length - 1].Khoihanh.split(' ').slice(2).join(' ')}</Typography>
                    </Stack>
                </Stack>
                <Stack direction="column" alignItems="flex-start">
                    <Stack direction="row" alignItems="center" gap="1rem">
                        <Typography>{data.dstuyen[0].time}</Typography>
                        <Box component="img" src="https://futabus.vn/images/icons/pickup.svg" />
                        <Box sx={{ borderTop: '2px dotted darkgreen', width: '30px', height: '3px', padding: '0' }} />
                        <Stack direction="column">
                            <Typography sx={{ color: '#637280', lineHeight: '1rem' }}>{selectedItem.time}</Typography>
                            <Typography sx={{ color: '#637280', lineHeight: '1rem' }}>Asian/Ho Chi Minh</Typography>
                        </Stack>
                        <Box sx={{ borderTop: '2px dotted darkgreen', width: '30px', height: '3px', padding: '0' }} />
                        <Box component="img" src="https://futabus.vn/images/icons/station.svg" />
                        <Typography>{data.dstuyen[data.dstuyen.length - 1].time}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" width="100%">
                        <Typography variant="body2">{data.dstuyen[0].Khoihanh}</Typography>
                        <Typography variant="body2">{data.dstuyen[data.dstuyen.length - 1].Khoihanh}</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}
export default SelectItem;