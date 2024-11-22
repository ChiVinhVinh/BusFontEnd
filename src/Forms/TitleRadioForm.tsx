import React from "react";
import { useFormContext, Controller, Form } from "react-hook-form";
import { FormControl, FormGroup, FormControlLabel, Radio, FormLabel } from "@mui/material";
interface TitleRadioFormProps {
    name: string;
    onRadioChange: (value: string) => void
}
const TitleRadioForm: React.FC<TitleRadioFormProps> = ({ name, onRadioChange }) => {
    const { control } = useFormContext();
    return (
        <FormControl>
            <FormGroup row>
                <Controller name={name} control={control} rules={{ required: "Please select a title" }}
                    render={({ field }) => (
                        <>
                            <FormControlLabel control={<Radio sx={{
                                '&.Mui-checked': {
                                    color: 'red',
                                }
                            }} {...field} checked={field.value === "Một chiều"} onChange={() => { field.onChange("Một chiều"); onRadioChange('Một chiều') }}></Radio>} label="Một chiều" sx={{
                                color: field.value === "Một chiều" ? 'red' : 'inherit'
                            }}></FormControlLabel>
                            <FormControlLabel control={<Radio sx={{
                                '&.Mui-checked': {
                                    color: 'red',
                                }
                            }}  {...field} checked={field.value === "Khứ hồi"} onChange={() => { field.onChange("Khứ hồi"); onRadioChange("Khứ hồi") }}></Radio>} label="Khứ hồi" sx={{
                                color: field.value === "Khứ hồi" ? 'red' : 'inherit'
                            }}></FormControlLabel>
                        </>
                    )}></Controller>
            </FormGroup>
        </FormControl>
    )
}
export default TitleRadioForm;