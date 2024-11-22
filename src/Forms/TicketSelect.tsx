import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, Select, MenuItem, SelectChangeEvent, FormLabel, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
interface TicketSelectProps {
    options?: number[]; // List of ticket options (like 1, 2, 3, etc.)
    name: string; // The name of the field to be used in the form
    label: string; // The label for the select field
}

const TicketSelect: React.FC<TicketSelectProps> = ({ options = [1, 2, 3, 4, 5], name, label }) => {
    const { setValue, watch } = useFormContext();
    const selectedValue = watch(name) || options[0];

    const handleChange = (event: SelectChangeEvent) => {
        setValue(name, Number(event.target.value));
    };

    return (
        <FormControl fullWidth>
            <span style={{ textAlign: "left", paddingLeft: '15px' }}>{label}</span>
            <Select
                labelId={`${name}-label`}
                id={`${name}-select`}
                value={String(selectedValue)}
                onChange={handleChange}
                renderValue={(selected) => (
                    <span>{selected}</span>
                )}
            >
                {options.map((value) => (
                    <MenuItem key={value} value={value}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
                            <span>{value}</span>
                            {selectedValue === value && <CheckCircleIcon sx={{ color: 'orange' }} />}
                        </Stack>
                    </MenuItem>

                ))}
            </Select>
        </FormControl>
    );
};
export default TicketSelect;
