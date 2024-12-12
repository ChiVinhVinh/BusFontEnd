import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import FillterCheckBox from './FillterCheckBox';
import { FillterFormProvider } from './FillterFormContext';
import ListFillter from './ListFillter';




const FillterForm = ({ data, count }: any) => {
    console.log('dataaaaaaaaaa', data)
    console.log("csssssssssssssssssssssssssssssss", count)
    return (
        <FillterFormProvider>
            <Stack
                direction="row"
                spacing={6}
                sx={{
                    margin: '100px 0',
                    width: '1128px',
                }}
            >
                <FillterCheckBox count={count} />
                <ListFillter data={data} />
            </Stack>
        </FillterFormProvider>

    )
}
export default FillterForm;