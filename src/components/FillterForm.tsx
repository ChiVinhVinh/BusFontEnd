import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import FillterCheckBox from './FillterCheckBox';
import { FillterFormProvider } from './FillterFormContext';
import ListFillter from './ListFillter';
import SelectItem from './SelectItem';
const FillterForm = ({ data }: any) => {
    console.log("''''''''''''''''", data);
    return (
        <FillterFormProvider dataTrip={data.dataTrip} dataTripBack={data.dataTripBack}>
            <Stack
                direction="row"
                spacing={6}
                sx={{
                    margin: '100px 0',
                    width: '1128px',

                }}
            >
                <Stack
                    direction="column"
                    spacing={2}
                >
                    <SelectItem />
                    <FillterCheckBox count1={data.timecount} count2={data.timecountBack} />
                </Stack>
                <ListFillter />
            </Stack>
        </FillterFormProvider>
    );
};
export default FillterForm;