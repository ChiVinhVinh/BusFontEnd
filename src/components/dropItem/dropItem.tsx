import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

const Dropdown = () => {
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const handleChange = (event: SelectChangeEvent<string>) => {
        setSelectedValue(event.target.value);
    };
    const handleEnter = () => {
        setOpen(true);
    }
    const handleLeave = () => {
        setOpen(false)
    }

    return (
        <FormControl fullWidth variant='outlined' sx={{ border: 'none' }}>
            <InputLabel id="dropdown-label"></InputLabel>
            <Select
                labelId="dropdown-label"
                id="dropdown"
                value={selectedValue}
                label="Select Option"
                onChange={handleChange}
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                sx={{
                    border: 'none',
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                    width: '26px',
                    height: '26px'

                }}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
            >
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
                <MenuItem value="option3">Option 3</MenuItem>
            </Select>
        </FormControl>
    );
};

export default Dropdown;
