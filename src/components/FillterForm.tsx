import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import FillterCheckBox from './FillterCheckBox';
import { FillterFormProvider } from './FillterFormContext';
import ListFillter from './ListFillter';

import './FillterForm.css'


const FillterForm = ({ data }: any) => {
    console.log('dataaaaaaaaaa', data)
    return (
        <FillterFormProvider>
            <div className='row3211112'>
                <FillterCheckBox></FillterCheckBox>
                <ListFillter data={data}></ListFillter>
            </div>
        </FillterFormProvider>

    )
}
export default FillterForm;