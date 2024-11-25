import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import FillterCheckBox from './FillterCheckBox';
import { FillterFormProvider } from './FillterFormContext';
import ListFillter from './ListFillter';

import './FillterForm.css'


const FillterForm = ({ data, count }: any) => {
    console.log('dataaaaaaaaaa', data)
    console.log("csssssssssssssssssssssssssssssss", count)
    return (
        <FillterFormProvider>
            <div className='row3211112'>
                <FillterCheckBox count={count}></FillterCheckBox>
                <ListFillter data={data}></ListFillter>
            </div>
        </FillterFormProvider>

    )
}
export default FillterForm;