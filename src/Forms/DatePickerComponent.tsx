import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, FormControl, FormLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
dayjs.locale('vi');
interface DatePickerComponentProps {
    name: string;
    label: string;
    date: React.Dispatch<React.SetStateAction<string>>;
}
const DatePickerComponent: React.FC<DatePickerComponentProps> = ({ name, label, date }) => {
    const { control } = useFormContext();
    const today = dayjs();

    return (
        <FormControl >
            <span style={{ textAlign: "left", paddingLeft: '15px' }}>{label}</span>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller name={name} control={control} defaultValue={dayjs()} render={({ field }) => (
                    <DatePicker
                        {...field}
                        value={field.value}
                        onChange={(dateValue) => {
                            field.onChange(dateValue);
                            date(dateValue?.format("DD-MM-YYYY") || "");
                        }}
                        format="DD/MM/YYYY"
                        minDate={today}
                        slotProps={{
                            textField: { fullWidth: true, },
                        }}
                    />
                )}></Controller>
            </LocalizationProvider>
        </FormControl >
    )
}
export default DatePickerComponent;